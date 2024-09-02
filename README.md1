# translate-take-home-task

## Introduction

Your task is to create a simple language translation web service, accessed via an API (running locally is fine for this task). Your service should consist of a single endpoint which accepts a list of English words and a target language for translation. The expected format of the request and response bodies are defined in the [`translate-wrapper`](src/translate-wrapper.ts) in this repository. In addition to translation, the application should perform data validation and cleansing. Detailed requirements are provided in the [Requirements](#requirements) section below.

This repository contains a [`translate-wrapper`](src/translate-wrapper.ts) script that should be used to test your service. It reads an example set of English words from [`src/data/wordsToTranslate.xlsx`](src/data/wordsToTranslate.xlsx), makes a request to your API endpoint, and then saves the response to `results/translatedWords.xlsx`. See instructions in the section below on how to set up and run this script.

The task can be completed in the programming language of your choice and make use of whatever frameworks and libraries you see fit. You should create a new repository for your solution, see [Submission](#submission) section below for more detail.

The time limit for the coding part of this task is 3 hours (with additional time as needed to write up the documentation detailed in the section below). The list of requirements have been set to be deliberately ambitious, and it is not essential for you to finish all of them within the time limit; you will have a chance to discuss your approach in the documentation, and then with us at the interview. Focus on getting something running early, and iterate. In addition to your coding skills, we also want to get a feel for how you approach work, prioritise tasks, and make decisions.

## Requirements

Please enable as much of the following functionality as possible in 3 hours:

- Provide an API endpoint to receive the translation requests and return responses in the data format outlined in the wrapper script.
- Correct or discard any words which contain invalid characters.
- Correct or discard any words with spelling mistakes (this could be done with a package such as [Spellchecker](https://www.npmjs.com/package/spellchecker) or a free third party API such as [SerpAPI](https://serpapi.com/spell-check)).
- Correct or discard any words which are not written in English (this could be done with a package such as [Is Word](https://www.npmjs.com/package/is-word) or via one of the translation API’s listed below).
- Remove any duplicate words.
- Translate each word into the target language (see [Translation method](#translation-method) section for advice).
- Handle errors and log and display them as appropriate.

Please include the following documentation (this can be included as part of a `README.md` or separate document):

- A brief "Getting Started guide" on how to set up and run the project locally
- If you used any particular libraries why did you choose them?
- Which translation API did you use and why?
- Did you make any assumptions, or take any shortcuts?
- Did you have any challenges and if so, how did you overcome them?
- Did you add any extra features?
- If you had more time, what else would you implement?

### Translation method

For performing the language translation, there are two main options that we know of:

- (Recommended) Run a local instance of [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) (see link for instructions).
  - If you have Python (3.8+), it is easy to install and run. The first time it is run, it will take a few minutes to install language models, so we recommend starting this first to avoid frustration later in the task.
  - LibreTranslate will run as a stand-alone Python service, accessed via an API running on your local machine. This shouldn’t affect your choice of programming language and other tools for completion of this task.
  - If a LibreTranslate service is flooded with too many simulateous request, it may crash. You can reduce the likelihood of this happening by increasing the number of threads it can use by setting the `LT_THREADS` environment variable to a reasonably high number, e.g. 8. It is also worth designing your solution to limit the number of simultaneous requests to LibreTranslate. If you encounter problems, such as LibreTranslate crashing, you could try running it in [Docker](https://www.docker.com/). Instructions are provided in the LibreTranslate README in the GitHub repository linked above.
- If you would prefer, you can use an online translation API such as Google Cloud Translation API, Yandex Translate API, or DeepL Translate API.
  - These all allow some amount of translation to be done for free, but obtaining API keys to access the services requires account creation with credit card details. If you already have an account for a viable service, this could be a good option.
  - If your solution requires the user to gain access to API keys or other credentials for use, please provide clear instructions in your repo’s README.

### Using the translate-wrapper script

This repository uses [NodeJS](https://nodejs.org/en), so please ensure that you have it installed in order to run the script. Once you have NodeJS, you can install the project dependencies with `npm install`.

Before compiling and running the script, please set the `TRANSLATION_SERVICE_URL` to the URL of your translation service.

The [package.json](package.json) file contains a script for running the [`translate-wrapper`](src/translate-wrapper.ts) script. Use this as follows:

- `npm run start` to run the script

## Things that will be considered in the review meeting

- Is the solution well structured with readable code.
  - You may use an API framework (e.g., express.js, nest.js, Flask) of your choice if you wish.
  - You may use any additional third party libraries, frameworks and services.
- Does the solution have clear and concise documentation.
- Whether consideration has been given to how this would work with large sets of words to translate, guard against timeout errors, etc.
- In the review interview we may ask you questions about how your solution could be productionised and deployed.

## Submission

Please push your project up to a private respository on GitHub and add the users listed below as collaborators. These will include the engineers from Cirevo that will be reviewing your solution.

- @jgudka
- @greatpotato
- @jaycoe
- @pgr1c11

We will review your solution ahead of the interview and prepare feedback and suggestions. Please also be prepared to give us a quick overview of your solution in the interview.

If you'd like to use an alternative Git hosting service then please email us at careers@cirevo.com with the details so that we can provide the relevant usernames of our engineers to be added for review.
