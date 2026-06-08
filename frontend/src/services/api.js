// URL do backend — em desenvolvimento aponta pra localhost
// Em produção, troca pela URL do Vercel
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function gerarMaterial({ tipo, turma, dados }) {
  const response = await fetch(`${BASE_URL}/api/gerar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo, turma, dados }),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || "Erro ao gerar material");
  }

  return response.json();
}
