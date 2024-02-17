import fetch from 'node-fetch';
import { codeToLanguage } from './constants';

interface ITranslateOptions {
  context?: string;
}

interface IOpenAIOptions {
  [key: string]: any;
}

const createPrompt = (text: string, source: string, target: string, options: ITranslateOptions): string => {
  const { context } = options;

  const sourceLanguage = codeToLanguage[source];
  const targetLanguage = codeToLanguage[target];
  if (!sourceLanguage) {
    throw new Error(`Invalid source language code: ${source}`);
  }
  if (!targetLanguage) {
    throw new Error(`Invalid target language code: ${target}`);
  }

  return [
    `Translate the following from ${sourceLanguage} to ${targetLanguage}.`,
    `Text:: ${text}`,
    context ? `Context:: ${context}` : null,
    'Translation::',
  ]
    .filter((x): x is string => !!x)
    .join('\n');
}

class OpenAITranslator {
  apiKey: string;

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
  }

  async translate(text: string, source: string, target: string, options: ITranslateOptions, openaiOptions: IOpenAIOptions): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }
    const model = openaiOptions?.model || 'gpt-3.5-turbo';

    const prompt = createPrompt(
      text,
      source,
      target,
      { context: options.context },
    );
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const body = {
      model,
      messages: [{ role: 'system', content: prompt }],
      ...openaiOptions,
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

export { OpenAITranslator };
