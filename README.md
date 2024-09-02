# README

## Translation API Service

This project is a simple translation API service built using Node.js, Express, and the Bottleneck library to control the concurrency of requests. The service translates a list of words from English to a specified target language using an external translation API (e.g., LibreTranslate). The server limits the number of concurrent translation requests to 15 to prevent overload.

### Features

- **Concurrency Control**: Limits the number of simultaneous translation requests to 15 using the Bottleneck library.
- **Queue Management**: Handles up to number of words- 15 queued requests when the server is busy, rejecting any additional requests.
- **Translation**: Integrates with LibreTranslate to translate words from English to a specified target language.
- **Error Handling**: Properly handles errors, including rejecting requests when the server is too busy.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16.x or higher).
- **LibreTranslate**: The translation service should be running on `http://localhost:5001/translate`.

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/translation-api-service.git
    cd translation-api-service
    ```

2. **Install Dependencies**

    Install the required npm packages:

    ```bash
    npm install
    ```

3. **Configuration**

    The server is configured to run on port 5002 by default.
    The translation service (LibreTranslate) should be running on http://localhost:5001/translate.
    You can modify the configuration by editing the following lines in src/index.ts:

    ```typescript
    const PORT = process.env.PORT || 5002;
    const LIBRETRANSLATE_URL = 'http://localhost:5001/translate';
    ```

4. **Running the Server**

    To start the server, run:

    ```bash
    npm run server
    ```

    The server will start and listen on the specified port (default: 5002).

### Endpoints

**Status Endpoint**

Check if the server is running:

```bash
GET http://localhost:5002/status
```

Response:

```json
{
  "status": "Server is running"
}
```

**Translate Endpoint**

Translate a list of words to a specified target language:

```bash
POST http://localhost:5002/translate
```

Request Body:

```json
{
  "words": ["hello", "world"],
  "targetLanguage": "es"
}
```

Response:

```json
{
  "words": [
     {"originalWord": "hello", "translatedWord": "hola"},
     {"originalWord": "world", "translatedWord": "mundo"}
  ],
  "targetLanguage": "es"
}
```

**Error Handling**

If more than 15 concurrent requests are made, or the queue exceeds the limit, the server will respond with:

```json
{
  "error": "Too many requests, please try again later."
}
```

**Testing Concurrency with Autocannon**

To test the server's ability to handle concurrent requests, you can use autocannon, a benchmarking tool.

Install Autocannon (if not already installed):

```bash
npm install -g autocannon
```

Run a Concurrency Test:

This command simulates 10 concurrent requests for 10 seconds:

```bash
npx autocannon -c 15 -d 10 -m POST -H "Content-Type: application/json" -b '{"words":["hello","world"],"targetLanguage":"es"}' http://localhost:5002/translate
```

Expected Behavior:

- The server will process up to 15 requests simultaneously.
- Any additional requests will be queued up to number of words array length - 15.
- If the queue is full, the server will reject requests with a 429 Too Many Requests error.
