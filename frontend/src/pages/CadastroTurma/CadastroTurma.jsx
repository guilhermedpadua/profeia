import React, { useState } from "react";
import "./CadastroTurma.css";

const NECESSIDADES = [
  "TEA", "TDAH", "PCD motora",
  "Deficiência visual", "Deficiência auditiva",
  "Dislexia", "Altas habilidades"
];

export default function CadastroTurma({ onSalvar, onVoltar }) {
  const [form, setForm] = useState({
    nome: "", disciplina: "", nivel: "", qtdAlunos: "", necessidades: []
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const togNec = (n) => {
    const lista = form.necessidades.includes(n)
      ? form.necessidades.filter((x) => x !== n)
      : [...form.necessidades, n];
    set("necessidades", lista);
  };

  const salvar = () => {
    if (!form.nome || !form.disciplina || !form.nivel)
      return alert("Preencha nome, disciplina e nível.");
    onSalvar(form);
  };

  return (
    <div className="cadastro-wrap">
      <div className="cadastro-inner">
        <button className="btn-voltar" onClick={onVoltar}>← Voltar</button>

        <div className="cadastro-card">
          <h1>Cadastrar turma</h1>
          <p>O agente usará essas informações para personalizar todos os materiais.</p>

          <div className="field">
            <label>Nome da turma *</label>
            <input
              placeholder="Ex: 7º ano B — tarde"
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Disciplina *</label>
            <input
              placeholder="Ex: Matemática, Português, Biologia..."
              value={form.disciplina}
              onChange={(e) => set("disciplina", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Nível de ensino *</label>
            <select value={form.nivel} onChange={(e) => set("nivel", e.target.value)}>
              <option value="">Selecione...</option>
              <option>Educação Infantil</option>
              <option>Ensino Fundamental I (1º ao 5º ano)</option>
              <option>Ensino Fundamental II (6º ao 9º ano)</option>
              <option>Ensino Médio</option>
              <option>Ensino Superior</option>
            </select>
          </div>

          <div className="field">
            <label>Quantidade de alunos</label>
            <input
              type="number"
              placeholder="Ex: 35"
              value={form.qtdAlunos}
              onChange={(e) => set("qtdAlunos", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Necessidades especiais na turma</label>
            <p className="field-hint">
              Selecione todas que se aplicam. O agente incluirá adaptações automaticamente.
            </p>
            <div className="tag-wrap">
              {NECESSIDADES.map((n) => (
                <button
                  key={n}
                  className={`tag-btn ${form.necessidades.includes(n) ? "ativo" : ""}`}
                  onClick={() => togNec(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-salvar" onClick={salvar}>
            Salvar turma →
          </button>
        </div>
      </div>
    </div>
  );
}