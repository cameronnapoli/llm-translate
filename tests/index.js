import { OpenAITranslator } from '../src/openai';

const main = async () => {
  const translator = new OpenAITranslator({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const text1 = 'Send';
  const translation1 = await translator.translate(
    'Send',
    'en',
    'es',
    {
      context: 'This is a button in an app.',
    },
    {
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
    },
  );
  
  console.log(text1, '->', translation1);

  const text2 = 'Bonjour le monde';
  const translation2 = await translator.translate(
    text2,
    'fr',
    'en',
  );

  console.log(text2, '->', translation2);
};

main();
