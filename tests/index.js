const { OpenAITranslator } = require('../src/openai.js');

const main = async () => {
  const translator = new OpenAITranslator({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const text = 'Hello, how are you?';
  const source = 'en';
  const target = 'es';
  
  const translation = await translator.translate(text, source, target);
  
  console.log(translation);
};

main();
