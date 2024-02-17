const {
  codeToLanguage,
} = require('./constants.js');

const createPrompt = (text, source, target) => {
  const sourceLanguage = codeToLanguage[source];
  const targetLanguage = codeToLanguage[target];
  if (!sourceLanguage) {
    throw new Error(`Invalid source language code: ${source}`);
  }
  if (!targetLanguage) {
    throw new Error(`Invalid target language code: ${target}`);
  }

  return `Translate from ${sourceLanguage} to ${targetLanguage}:\n${text}\n\nTranslation:`;
}

/**
 * A class for translating text using the OpenAI API. https://platform.openai.com/docs/api-reference/chat/create
 */
class OpenAITranslator {
  /**
   * Creates an instance of the class.
   * @constructor
   * @param {Object} options - The configuration options for the instance.
   * @param {string} options.apiKey - The API key to be used for requests.
   */
  constructor(options) {
    this.apiKey = options.apiKey;
  }

  /**
   * Translates the given text from the source language to the target language.
   * @param {string} text - The text to be translated.
   * @param {string} source - The language code of the source language.
   * @param {string} target - The language code of the target language.
   * @param {Object.<string, *>} options - Configuration options to be passed to OpenAI (e.g. model, temperature, etc.): https://platform.openai.com/docs/api-reference/chat/create
   * @returns {Promise<string>} - The translated text.
   */
  async translate(text, source, target, options) {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }
    const model = options?.model || 'gpt-3.5-turbo';

    const prompt = createPrompt(text, source, target);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const body = {
      model,
      messages: [{ role: 'system', content: prompt }],
      ...(options || {}),
    };
    
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!result) {
      throw new Error('Failed to parse response');
    }
    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.choices[0].message.content;
  }
}

module.exports = {
  OpenAITranslator,
};
