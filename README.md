# LLM Translate

[![NPM version](https://img.shields.io/npm/v/llm-translate.svg)](https://npmjs.org/package/llm-translate)

Translate text using an LLM API.

## Supported LLM APIs

- [OpenAI's GPT-3.5 (gpt-3.5-turbo)](https://openai.com/blog/openai-api)
- [OpenAI's GPT-4 (gpt-4)](https://openai.com/blog/openai-api)

## Installation

```sh
npm install llm-translate
# or
yarn add llm-translate
```

## Usage

```js
import { OpenAITranslator } from 'llm-translate';

const translator = new OpenAITranslator({
  apiKey: '',
})

const text = 'Hello, world!';
const sourceLanguage = 'en';
const targetLanguage = 'es';
const options = {
  model: 'gpt-4',
}

translator.translate(text, sourceLanguage, targetLanguage, options)
  .then((translation) => {
    console.log(translation);
  })
  .catch((error) => {
    console.error(error);
  });

```

## Supported Languages

A subset of [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language codes are supported.