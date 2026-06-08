require("dotenv").config();
const express = require("express");
const cors = require("cors");
const agenteController = require("./controllers/agente");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota principal — recebe o pedido e retorna o material gerado
app.post("/api/gerar", agenteController.gerar);

// Rota de teste — só pra confirmar que o servidor está rodando
app.get("/api/ping", (req, res) => {
  res.json({ status: "ProfeIA online" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
