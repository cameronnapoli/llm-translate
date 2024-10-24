const { OpenAITranslator } = require('../src/openai.js');

require('dotenv').config();

const tests = [
  {
    text: 'Send',
    from: 'en',
    to: 'es',
    context: 'This is a button in an app.',
    expected: 'Enviar',
  },
  {
    text: 'English',
    from: 'en',
    to: 'es',
    context: 'This is a language.',
    expected: 'Inglés',
  },
  {
    text: 'Bonjour le monde',
    from: 'fr',
    to: 'en',
    expected: 'Hello world',
  },
  {
    text: 'American',
    from: 'en',
    to: 'es',
    context: 'Describing an american woman (from the USA)',
    expected: 'Estadounidense',
  },
  {
    text: 'Run',
    from: 'en',
    to: 'ja',
    context: 'This is a button in an app.',
    expected: '実行',
  },
  {
    text: '¿Donde estabas ayer?',
    from: null,
    to: 'en',
    context: null,
    expected: 'Where were you yesterday?',
  },
  {
    text: '¿Donde estabas ayer?',
    from: null,
    to: 'en',
    context: 'An exchange between two people.',
    expected: 'Where were you yesterday?',
  },
]

const main = async () => {
  const translator = new OpenAITranslator({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let failed = 0;
  let i = 0;
  for (const test of tests) {
    const translation = await translator.translate(
      test.text,
      test.from,
      test.to,
      { context: test.context },
    );
    console.log(`(${i + 1}/${tests.length})`, test.text, '->', translation);
    if (translation !== test.expected) {
      console.error(' * Failed');
      failed++;
    }
    i++;
  }

  if (failed) {
    console.error(`\n* Failed ${failed}/${tests.length} tests`);
    process.exit(1);
  } else {
    console.log('\n* All tests passed');
  }
};

main();
