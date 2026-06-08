import React from "react";
import "./Turmas.css";
 
export default function Turmas({ turmas, onSelecionar, onNovaTurma }) {
  return (
    <div className="turmas-wrap">
      <div className="turmas-header">
        <span className="turmas-logo">Profe<span>IA</span></span>
        <button className="btn-nova" onClick={onNovaTurma}>+ Nova turma</button>
      </div>
 
      <div className="turmas-greeting">
        <h1>Olá, professor(a)! 👋</h1>
        <p>Selecione uma turma para começar a criar conteúdo.</p>
      </div>
 
      {turmas.length === 0 ? (
        <div className="turmas-empty">
          <div className="turmas-empty-icon">📚</div>
          <h2>Nenhuma turma cadastrada ainda</h2>
          <p>Cadastre sua primeira turma para que o agente gere materiais personalizados para ela.</p>
          <button className="btn-nova" onClick={onNovaTurma}>Cadastrar primeira turma</button>
        </div>
      ) : (
        <div className="turmas-grid">
          {turmas.map((t) => (
            <div key={t.id} className="turma-card" onClick={() => onSelecionar(t)}>
              <div className="turma-card-title">{t.nome}</div>
              <div className="turma-card-sub">{t.disciplina} · {t.nivel}</div>
              {t.necessidades?.length > 0 && (
                <div className="turma-tag">♿ Adaptações necessárias</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
