// ─────────────────────────────────────────────────────────────────────────────
// ENGENHARIA DE PROMPT — ProfeIA
// Este arquivo é o coração acadêmico do TCC.
// Aqui ficam todos os prompts que instruem a IA a gerar materiais didáticos.
// ─────────────────────────────────────────────────────────────────────────────

// SYSTEM PROMPT — fixo, define o comportamento geral do agente
const SYSTEM_PROMPT = `
Você é o ProfeIA, um assistente pedagógico especializado em criar materiais 
didáticos para professores brasileiros da educação básica e superior.

Suas diretrizes:
- Gere conteúdo estruturado, didático e adequado ao nível informado
- Use linguagem clara e acessível para os alunos do nível indicado
- Quando a turma tiver alunos com necessidades especiais, inclua adaptações 
  específicas automaticamente, sem que o professor precise pedir
- Organize o material com títulos e seções bem definidas
- Sempre apresente o material como sugestão editável, não como produto final
- Baseie-se em boas práticas pedagógicas brasileiras
- Respeite a realidade das escolas públicas brasileiras quando relevante
`.trim();

// ─── FUNÇÕES QUE MONTAM O PROMPT DINÂMICO ────────────────────────────────────
// Cada função recebe as informações da turma + do pedido e monta o prompt certo

function montarContextoTurma(turma) {
  const necessidades = turma.necessidades?.length > 0
    ? `\nNecessidades especiais na turma: ${turma.necessidades.join(", ")}.`
    : "\nNenhuma necessidade especial informada.";

  return `
Informações da turma:
- Nome: ${turma.nome}
- Disciplina: ${turma.disciplina}
- Nível: ${turma.nivel}
- Quantidade de alunos: ${turma.qtdAlunos || "não informada"}
${necessidades}
`.trim();
}

function promptPlanodeAula({ turma, tema, duracao, recursos }) {
  return `
${montarContextoTurma(turma)}

Pedido: Crie um plano de aula completo sobre "${tema}".
Duração da aula: ${duracao || "50 minutos"}.
Recursos disponíveis: ${recursos || "quadro e giz"}.

Estruture o plano com:
1. Identificação (tema, turma, duração, disciplina)
2. Objetivos de aprendizagem (3 objetivos claros)
3. Conteúdos abordados
4. Metodologia (passo a passo da aula: introdução, desenvolvimento, encerramento)
5. Recursos e materiais
6. Avaliação (como verificar se os alunos aprenderam)
${turma.necessidades?.length > 0 ? "7. Adaptações para necessidades especiais (detalhe como incluir cada aluno)" : ""}

Seja prático e detalhado. O professor deve conseguir usar este plano diretamente em sala.
`.trim();
}

function promptSlides({ turma, tema, qtdSlides, estilo }) {
  return `
${montarContextoTurma(turma)}

Pedido: Crie a estrutura completa de uma apresentação de slides sobre "${tema}".
Quantidade de slides: ${qtdSlides || "10 a 15 slides"}.
Estilo: ${estilo || "explicativo com exemplos"}.

Para cada slide, forneça:
- Número e título do slide
- Tópicos/bullet points do conteúdo
- Sugestão de imagem ou recurso visual (descreva, não insira)
- Nota do apresentador (o que o professor deve falar)

${turma.necessidades?.length > 0 ? "Inclua ao menos 2 slides com elementos de acessibilidade adaptados para as necessidades especiais da turma." : ""}

Comece com um slide de capa e termine com um slide de conclusão e referências.
`.trim();
}

function promptExercicios({ turma, tema, tipo, qtd }) {
  return `
${montarContextoTurma(turma)}

Pedido: Crie ${qtd || "10"} questões sobre "${tema}".
Tipo: ${tipo || "mista (objetiva e dissertativa)"}.

Organize as questões do mais simples para o mais complexo.
Para cada questão forneça:
- Enunciado claro e contextualizado
- Gabarito ou resposta esperada
${tipo?.includes("objetiva") ? "- 4 alternativas (A, B, C, D)" : ""}

${turma.necessidades?.length > 0 ? `Ao final, adicione uma versão adaptada de 3 questões para alunos com: ${turma.necessidades.join(", ")}.` : ""}

Use exemplos do cotidiano dos alunos quando possível.
`.trim();
}

function promptAvaliacao({ turma, temas, formato, tempo }) {
  return `
${montarContextoTurma(turma)}

Pedido: Crie uma avaliação sobre: "${temas}".
Formato: ${formato || "mista"}.
Tempo para responder: ${tempo || "50 minutos"}.

Estruture a avaliação com:
- Cabeçalho (nome, turma, data, pontuação total)
- Instruções gerais
- Questões organizadas por seção e dificuldade crescente
- Gabarito ao final

${turma.necessidades?.length > 0 ? `Inclua orientações de adaptação para alunos com: ${turma.necessidades.join(", ")}.` : ""}

A pontuação total deve ser 10 pontos. Distribua os pontos entre as questões.
`.trim();
}

function promptAdaptarNivel({ turma, conteudo, nivel }) {
  return `
${montarContextoTurma(turma)}

Pedido: Adapte o conteúdo abaixo para o nível "${nivel}":

"${conteudo}"

Para o nível ${nivel}, reescreva o conteúdo considerando:
${nivel === "Fácil" ? "- Linguagem simples e direta\n- Exemplos do cotidiano\n- Menos termos técnicos\n- Passo a passo bem detalhado" : ""}
${nivel === "Médio" ? "- Linguagem adequada para o nível da turma\n- Exemplos contextualizados\n- Terminologia introduzida gradualmente" : ""}
${nivel === "Avançado" ? "- Linguagem técnica e precisa\n- Aprofundamento dos conceitos\n- Conexões com outros temas\n- Exercícios de maior complexidade" : ""}
${nivel === "Os três níveis" ? "- Apresente três versões: Fácil, Médio e Avançado\n- Cada versão deve ser completa e autocontida" : ""}
`.trim();
}

function promptNecessidadesEspeciais({ turma, conteudo, necessidade }) {
  const adaptacoes = {
    "TEA": "Use linguagem literal e direta. Evite metáforas. Estruture as atividades em passos pequenos e claros. Inclua rotinas visuais e antecipação das etapas.",
    "TDAH": "Divida o conteúdo em blocos curtos. Use marcadores visuais. Inclua pausas entre atividades. Varie os formatos para manter o engajamento.",
    "PCD motora": "Adapte atividades que exigem escrita manual. Sugira alternativas orais ou digitais. Considere posicionamento e acessibilidade do material.",
    "Deficiência visual": "Descreva elementos visuais em texto. Use alto contraste. Evite informações transmitidas apenas por imagem. Sugira versão em áudio.",
    "Deficiência auditiva": "Use apoio visual para tudo. Evite dependência de áudio. Inclua legendas e recursos visuais. Simplifique estruturas linguísticas complexas.",
    "Dislexia": "Use fonte maior e espaçamento maior. Divida textos longos. Destaque palavras-chave. Ofereça alternativa oral.",
    "Altas habilidades": "Inclua desafios extras e aprofundamentos. Proponha pesquisas independentes. Ofereça projetos abertos e de maior complexidade.",
  };

  const instrucao = adaptacoes[necessidade] || "Adapte considerando as necessidades específicas informadas.";

  return `
${montarContextoTurma(turma)}

Pedido: Adapte o conteúdo abaixo para alunos com ${necessidade}:

"${conteudo}"

Diretrizes de adaptação para ${necessidade}:
${instrucao}

Entregue:
1. Versão adaptada do conteúdo
2. Lista de estratégias pedagógicas recomendadas para essa necessidade
3. Sugestão de como avaliar esse aluno de forma inclusiva
`.trim();
}

// Mapa que associa o tipo de material à função de prompt correta
const PROMPTS = {
  plano:    promptPlanodeAula,
  slides:   promptSlides,
  ativ:     promptExercicios,
  aval:     promptAvaliacao,
  adapta:   promptAdaptarNivel,
  especial: promptNecessidadesEspeciais,
};

module.exports = { SYSTEM_PROMPT, PROMPTS };
