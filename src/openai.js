const {
  codeToLanguage,
} = require('./constants.js');

class OpenAITranslator {
  constructor(options) {
    this.apiKey = options.apiKey;
  }

  createPrompt(text, source, target) {
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

  async translate(text, source, target, options) {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }
    const model = options?.model || 'gpt-3.5-turbo';
    const temperature = options?.temperature;
    const max_tokens = options?.max_tokens || undefined;
    const top_p = options?.top_p || undefined;

    const prompt = this.createPrompt(text, source, target);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const body = {
      model,
      messages: [{ role: 'system', content: prompt }],
      ...(temperature && { temperature }),
      ...(max_tokens && { max_tokens }),
      ...(top_p && { top_p }),
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
