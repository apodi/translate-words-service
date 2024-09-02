import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import spellchecker from 'spellchecker';
import isWord from 'is-word';
import Bottleneck from 'bottleneck';

const axiosInstance = axios.create({
  timeout: 5000,  
});

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5002;
const MAX_CONCURRENT_REQUESTS = 15;  // Limit the number of simultaneous requests
const LIBRETRANSLATE_URL = 'http://localhost:5001/translate';

function validateAndCleanseWords(words: string[]): string[] {
  const englishWords = isWord('british-english');
  return words
    .map(word => {
      const lowerCaseWord = word.toLowerCase();
      const cleanedWord = lowerCaseWord.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');

      if (spellchecker.isMisspelled(cleanedWord)) {
        const suggestions = spellchecker.getCorrectionsForMisspelling(cleanedWord);
        return suggestions.length > 0 ? suggestions[0] : cleanedWord; 
      }
      return cleanedWord;
    })
    .filter(word => englishWords.check(word))
    .filter((word, index, self) => self.indexOf(word) === index); 
}

// Function to create a new Bottleneck instance based on the number of words
function createLimiter(wordsLength: number) {
  const highWater = wordsLength > MAX_CONCURRENT_REQUESTS ? Math.max(0, wordsLength - MAX_CONCURRENT_REQUESTS) : MAX_CONCURRENT_REQUESTS; 
  return new Bottleneck({
    maxConcurrent: MAX_CONCURRENT_REQUESTS,
    minTime: 6,
    highWater: highWater,
    rejectOnDrop: true
  });
}

// Function to translate a single word using LibreTranslate
async function translateWord(word: string, targetLanguage: string): Promise<{ originalWord: string, translatedWord: string }> {
  try {
    const response = await axiosInstance.post(LIBRETRANSLATE_URL, {
      q: word,
      source: "en",
      target: targetLanguage,
      format: "text"
    });
    return { originalWord: word, translatedWord: response.data.translatedText };
  } catch (error) {
    if ((error as any).code === 'ECONNABORTED') {
      console.error(`Request timed out for word "${word}"`);
      return { originalWord: word, translatedWord: "Timeout error" };
    }
    console.error(`Error translating word "${word}":`, error);
    return { originalWord: word, translatedWord: "Translation error" };
  }
}

// Endpoint to handle translation requests
app.post('/translate', async (req: Request, res: Response) => {
  const { words, targetLanguage } = req.body;

  if (!words || !Array.isArray(words) || !targetLanguage) {
    return res.status(400).json({ error: "Invalid request format." });
  }

 
  const cleanWords = validateAndCleanseWords(words);
  console.log(cleanWords);
  console.log(`Received ${words.length} words, ${cleanWords.length} words are valid`);

  const limiter = createLimiter(cleanWords.length);
  const limitedTranslateWord = limiter.wrap(translateWord);

  try {
    // Translate words with concurrency limit
    const translatedWords = await Promise.all(
      cleanWords.map(word => limitedTranslateWord(word, targetLanguage))
    );
    console.log(`Translated ${cleanWords.length} words to ${targetLanguage}`);
    return res.json({ words: translatedWords, targetLanguage });
  } catch (error) {
    if ((error as Error).message === 'This job has been dropped by Bottleneck') {
      console.error('Too many requests, please try again later.');
      return res.status(429).json({ error: "Too many requests, please try again later." });
    }
    console.error(`Unexpected error: ${(error as Error).message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Translation service is running on port ${PORT}`);
});
