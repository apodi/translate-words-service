
# README

## Translation API Service

This project is a simple translation API service built using Node.js, Express, and the Bottleneck library to control the concurrency of requests. The service translates a list of words from English to a specified target language using an external translation API (e.g., LibreTranslate). The server limits the number of concurrent translation requests to 15 to prevent overload.

### Getting Started Guide

To get started with the translation API service, follow these steps:

1. **Clone the Repository**: 
  ```
  git clone https://github.com/yourusername/translation-api-service.git
  cd translation-api-service
  ```

2. **Install Dependencies**: 
  ```
  npm install
  ```

3. **Configure the Server**: 
  Update the `src/index.ts` file to modify the server configuration if needed. You can change the port and the URL of the translation service (LibreTranslate).

4. **Run the Server**: 
  Start the server using the following command:
  ```
  npm run server
  ```

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

### Libraries Used and Why

The translation API service utilizes the following libraries:

- **Express**: Express is chosen for its simplicity and flexibility in creating API endpoints.
- **Bottleneck**: Bottleneck is used to manage and limit the number of concurrent requests, preventing server overload and ensuring smooth operation.
- **Axios**: Axios is selected for making HTTP requests to the external translation API. It provides built-in support for timeouts and retries.
- **spellchecker** and **isWord**: These libraries are used for input validation to ensure that the words are correctly spelled and valid in English.

### Translation API Used and Why

The translation API service uses LibreTranslate as the translation service. LibreTranslate is chosen because it is an open-source translation API that can be run locally. It provides a free and accessible option for translation tasks.

### Assumptions and Shortcuts

- **Assumption**: The input words are primarily in English and need to be translated into a target language.
- **Shortcut**: The project currently handles only basic input validation and assumes that the external API will be available and responsive.

### Challenges and Solutions

- **Challenge**: Managing the concurrency of requests to prevent overloading the external API.
- **Solution**: Bottleneck is implemented to control the number of simultaneous requests and queue additional requests.

### Extra Features

- **Dynamic Queue Management**: The queue size dynamically adjusts based on the number of words, ensuring that the server can handle requests more efficiently.

### Future Improvements

- **Advanced Error Handling**: Implement more granular error handling to deal with different types of API failures.
- **Support for Multiple Translation APIs**: Add support for fallback translation services in case the primary API is unavailable.
- **Scalability**: Consider adding load balancing and caching mechanisms to further improve performance under high load.

