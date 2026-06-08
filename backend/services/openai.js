const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chamarIA(systemPrompt, userPrompt) {
  const resposta = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt   },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return resposta.choices[0].message.content;
}

module.exports = { chamarIA };
