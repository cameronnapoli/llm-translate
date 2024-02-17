declare module 'llm-translate' {
  export interface ITranslateOptions {
    context?: string;
  }

  export interface IOpenAIOptions {
    [key: string]: any;
  }

  export class OpenAITranslator {
    constructor(options: { apiKey: string });
    translate(text: string, source: string, target: string, options: ITranslateOptions, openaiOptions: IOpenAIOptions): Promise<string>;
  }
}
