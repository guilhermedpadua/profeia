const { chamarIA } = require("../services/openai");
const { SYSTEM_PROMPT, PROMPTS } = require("../prompts");

async function gerar(req, res) {
  try {
    const { tipo, turma, dados } = req.body;

    // Valida se o tipo de material é suportado
    if (!PROMPTS[tipo]) {
      return res.status(400).json({ erro: "Tipo de material não suportado." });
    }

    // Valida se os dados mínimos estão presentes
    if (!turma || !dados) {
      return res.status(400).json({ erro: "Dados da turma e do pedido são obrigatórios." });
    }

    // Monta o prompt dinâmico com as infos da turma + pedido do professor
    const userPrompt = PROMPTS[tipo]({ turma, ...dados });

    // Chama a IA
    const resultado = await chamarIA(SYSTEM_PROMPT, userPrompt);

    res.json({ resultado });

  } catch (erro) {
    console.error("Erro ao gerar material:", erro.message);

    // Erro de autenticação (key inválida)
    if (erro.status === 401) {
      return res.status(401).json({ erro: "Chave da OpenAI inválida. Verifique o arquivo .env." });
    }

    // Sem créditos
    if (erro.status === 429) {
      return res.status(429).json({ erro: "Sem créditos na conta OpenAI." });
    }

    res.status(500).json({ erro: "Erro interno ao gerar o material." });
  }
}

module.exports = { gerar };
