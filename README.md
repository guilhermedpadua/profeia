# ProfeIA — Agente de Criação de Conteúdo Didático

TCC — Bacharelado Interdisciplinar em Ciência e Tecnologia (BICT) — UFMA

---

## Como rodar o projeto

### 1. Clonar e instalar dependências

```bash
# Backend
cd backend
npm install

# Frontend (em outro terminal)
cd frontend
npm install
```

### 2. Configurar a chave da OpenAI ⚠️

Abra o arquivo `backend/.env` e substitua o texto:

```
OPENAI_API_KEY=sua-chave-aqui
```

pela sua chave real:

```
OPENAI_API_KEY=sk-proj-...sua-chave...
```

> ⚠️ NUNCA suba o arquivo .env para o GitHub. Ele já está no .gitignore.

### 3. Rodar

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

O frontend abre em http://localhost:5173  
O backend roda em http://localhost:3001

---

## Estrutura do projeto

```
profeia/
├── backend/
│   ├── server.js              # Servidor Express
│   ├── controllers/
│   │   └── agente.js          # Lógica principal do agente
│   ├── prompts/
│   │   └── index.js           # ENGENHARIA DE PROMPT (coração do TCC)
│   ├── services/
│   │   └── openai.js          # Conexão com a API da OpenAI
│   └── .env                   # ← COLOQUE SUA KEY AQUI
└── frontend/
    └── src/
        ├── App.jsx             # Gerenciador de telas
        ├── pages/
        │   ├── Turmas.jsx      # Lista de turmas
        │   ├── CadastroTurma.jsx # Formulário de cadastro
        │   ├── Home.jsx        # Cards de criação
        │   └── Chat.jsx        # Chat guiado com a IA
        └── services/
            └── api.js          # Comunicação com o backend
```

---

## Onde está a Engenharia de Prompt

**`backend/prompts/index.js`**

Este é o arquivo mais importante do TCC academicamente.  
Contém o system prompt e todas as funções que montam os prompts dinâmicos  
para cada tipo de material, considerando as informações da turma.

---

## Deploy (Vercel)

1. Suba o projeto para o GitHub
2. Acesse vercel.com e importe o repositório
3. Configure a variável de ambiente `OPENAI_API_KEY` no painel do Vercel
4. Deploy automático!
