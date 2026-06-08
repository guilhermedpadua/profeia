import React from "react";
import "./Home.css";

const CARDS = [
  { tipo: "plano",    icon: "📄", titulo: "Plano de Aula",           desc: "Objetivo, metodologia e avaliação completos.", cor: "#2D6A4F", bg: "#D8F3DC" },
  { tipo: "slides",  icon: "📊", titulo: "Slides",                  desc: "Estrutura de apresentação para o tema.",       cor: "#E07A5F", bg: "#FDEAE5" },
  { tipo: "ativ",    icon: "✏️", titulo: "Atividades e Exercícios",  desc: "Questões personalizadas para a turma.",        cor: "#3D5A80", bg: "#DBE4F0" },
  { tipo: "aval",    icon: "📝", titulo: "Avaliação / Prova",        desc: "Prova coerente com o conteúdo ensinado.",      cor: "#9B5DE5", bg: "#EFE0FF" },
  { tipo: "adapta",  icon: "🎯", titulo: "Adaptar por Nível",        desc: "Versão fácil, médio ou avançado.",             cor: "#F4A261", bg: "#FEF0E3" },
  { tipo: "especial",icon: "♿", titulo: "Necessidades Especiais",   desc: "Adaptações para PCD, TEA, TDAH e mais.",       cor: "#E9C46A", bg: "#FEF8E3" },
];

export default function Home({ turma, onCard, onTrocarTurma }) {
  return (
    <div className="home-wrap">
      <div className="home-header">
        <span className="home-logo">Profe<span>IA</span></span>
        <button className="btn-trocar" onClick={onTrocarTurma}>Trocar turma</button>
      </div>

      <div className="home-turma-banner">
        <span className="home-turma-banner-icon">🏫</span>
        <div>
          <div className="home-turma-banner-nome">{turma.nome}</div>
          <div className="home-turma-banner-sub">
            {turma.disciplina} · {turma.nivel}
            {turma.qtdAlunos ? ` · ${turma.qtdAlunos} alunos` : ""}
          </div>
        </div>
        {turma.necessidades?.length > 0 && (
          <div className="home-turma-badge">♿ Adaptações ativas</div>
        )}
      </div>

      <div className="home-greeting">
        <h1>O que vamos <span>criar hoje?</span></h1>
        <p>Selecione o tipo de material. O agente já sabe tudo sobre a {turma.nome}.</p>
      </div>

      <div className="home-cards">
        {CARDS.map((c) => (
          <div
            key={c.tipo}
            className="home-card"
            onClick={() => onCard(c.tipo)}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = c.cor}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div className="home-card-icon" style={{ background: c.bg }}>{c.icon}</div>
            <div className="home-card-title">{c.titulo}</div>
            <div className="home-card-desc">{c.desc}</div>
            <div className="home-card-link" style={{ color: c.cor }}>Criar →</div>
          </div>
        ))}
      </div>
    </div>
  );
}