import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { gerarMaterial } from "../../services/api";

const FLOWS = {
  plano: { icon: "📄", titulo: "Plano de Aula", passos: [
    { campo: "tema",     msg: "Qual o **tema** da aula?",                        placeholder: "Ex: Frações — operações básicas",            tipo: "texto" },
    { campo: "duracao",  msg: "Duração da aula?",                                tipo: "opcoes", opcoes: ["45 minutos","50 minutos","1h30","2 horas"] },
    { campo: "recursos", msg: "Recursos disponíveis na escola?",                 tipo: "opcoes", opcoes: ["Só quadro e giz","Projetor/TV","Lab. de informática","Celulares/tablets"] },
  ]},
  slides: { icon: "📊", titulo: "Slides", passos: [
    { campo: "tema",      msg: "Qual o **tema** da apresentação?",               placeholder: "Ex: A Revolução Industrial",                 tipo: "texto" },
    { campo: "qtdSlides", msg: "Quantos slides?",                                tipo: "opcoes", opcoes: ["5 a 8 slides","10 a 15 slides","Mais de 15 slides"] },
    { campo: "estilo",    msg: "Estilo da apresentação?",                        tipo: "opcoes", opcoes: ["Explicativo (teoria)","Com exercícios","Visual/ilustrado","Resumo rápido"] },
  ]},
  ativ: { icon: "✏️", titulo: "Exercícios", passos: [
    { campo: "tema", msg: "Qual o **conteúdo** das atividades?",                 placeholder: "Ex: Verbos no presente do indicativo",       tipo: "texto" },
    { campo: "tipo", msg: "Tipo de questão?",                                    tipo: "opcoes", opcoes: ["Objetiva (múltipla escolha)","Dissertativa","Prática","Mista"] },
    { campo: "qtd",  msg: "Quantas questões?",                                   tipo: "opcoes", opcoes: ["5 questões","10 questões","15 questões","20 questões"] },
  ]},
  aval: { icon: "📝", titulo: "Avaliação", passos: [
    { campo: "temas",   msg: "Quais **conteúdos** serão avaliados?",             placeholder: "Ex: Equações do 1º grau e sistemas lineares", tipo: "texto" },
    { campo: "formato", msg: "Formato da avaliação?",                            tipo: "opcoes", opcoes: ["Só objetiva","Só dissertativa","Mista","Atividade prática"] },
    { campo: "tempo",   msg: "Tempo para responder?",                            tipo: "opcoes", opcoes: ["30 minutos","45 minutos","1 hora","2 horas"] },
  ]},
  adapta: { icon: "🎯", titulo: "Adaptar por Nível", passos: [
    { campo: "conteudo", msg: "Cole o **material** que quer adaptar ou descreva o tema:", placeholder: "Ex: texto sobre fotossíntese", tipo: "texto" },
    { campo: "nivel",    msg: "Para qual nível adaptar?",                        tipo: "opcoes", opcoes: ["Fácil","Médio","Avançado","Os três níveis"] },
  ]},
  especial: { icon: "♿", titulo: "Necessidades Especiais", passos: [
    { campo: "conteudo",    msg: "Descreva o **conteúdo** que quer adaptar:",    placeholder: "Ex: Atividade sobre interpretação de texto", tipo: "texto" },
    { campo: "necessidade", msg: "Para qual necessidade adaptar?",               tipo: "opcoes", opcoes: ["TEA","TDAH","PCD motora","Deficiência visual","Deficiência auditiva","Dislexia","Altas habilidades"] },
  ]},
};

function formatMsg(txt) {
  return txt.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

export default function Chat({ turma, tipo, onVoltar }) {
  const flow = FLOWS[tipo];
  const [msgs, setMsgs]       = useState([]);
  const [passo, setPasso]     = useState(0);
  const [dados, setDados]     = useState({});
  const [input, setInput]     = useState("");
  const [carregando, setCarreg] = useState(false);
  const [resultado, setResult]  = useState(null);
  const [erro, setErro]         = useState(null);
  const fimRef = useRef(null);

  useEffect(() => {
    setTimeout(() => adicionarAgente(flow.passos[0].msg, flow.passos[0]), 400);
  }, []);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, carregando, resultado]);

  function adicionarAgente(texto, passoObj) {
    setMsgs((p) => [...p, { de: "agente", texto, passoObj }]);
  }

  function adicionarUsuario(texto) {
    setMsgs((p) => [...p, { de: "usuario", texto }]);
  }

  function responder(valor, campo) {
    adicionarUsuario(valor);
    const novosDados = { ...dados, [campo]: valor };
    setDados(novosDados);
    const proximo = passo + 1;
    if (proximo < flow.passos.length) {
      setPasso(proximo);
      setTimeout(() => adicionarAgente(flow.passos[proximo].msg, flow.passos[proximo]), 500);
    } else {
      setPasso(proximo);
      setTimeout(() => gerar(novosDados), 300);
    }
  }

  function enviarInput() {
    if (!input.trim()) return;
    const campoAtual = flow.passos[passo]?.campo;
    if (!campoAtual) return;
    responder(input.trim(), campoAtual);
    setInput("");
  }

  async function gerar(dadosFinais) {
    setCarreg(true);
    setErro(null);
    try {
      const { resultado } = await gerarMaterial({ tipo, turma, dados: dadosFinais });
      setResult(resultado);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarreg(false);
    }
  }

  function reiniciar() {
    setResult(null);
    setMsgs([]);
    setDados({});
    setPasso(0);
    setErro(null);
    setTimeout(() => adicionarAgente(flow.passos[0].msg, flow.passos[0]), 300);
  }

  const passoAtual = flow.passos[passo];

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <button className="chat-btn-voltar" onClick={onVoltar}>← Voltar</button>
        <span className="chat-header-icon">{flow.icon}</span>
        <div>
          <div className="chat-header-title">{flow.titulo}</div>
          <div className="chat-header-sub">{turma.nome}</div>
        </div>
      </div>

      <div className="chat-messages">
        {msgs.map((m, i) => (
          <div key={i} className={`msg-row ${m.de}`}>
            {m.de === "agente" && (
              <div className="msg-avatar">🎓</div>
            )}
            <div>
              <div
                className={`msg-bubble ${m.de}`}
                dangerouslySetInnerHTML={{ __html: m.de === "agente" ? formatMsg(m.texto) : m.texto }}
              />
              {m.de === "agente" && m.passoObj?.tipo === "opcoes" && i === msgs.length - 1 && !resultado && !carregando && (
                <div className="quick-replies">
                  {m.passoObj.opcoes.map((op) => (
                    <button key={op} className="qr-btn" onClick={() => responder(op, m.passoObj.campo)}>
                      {op}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {carregando && (
          <div className="typing-wrap">
            <div className="msg-avatar">🎓</div>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        {resultado && (
          <div className="result-box">
            <div className="result-header">✅ Material gerado!</div>
            <pre className="result-text">{resultado}</pre>
            <div className="result-actions">
              <button className="btn-copiar" onClick={() => navigator.clipboard.writeText(resultado)}>
                📋 Copiar
              </button>
              <button className="btn-secundario" onClick={reiniciar}>✏️ Gerar novo</button>
              <button className="btn-secundario" onClick={onVoltar}>← Voltar</button>
            </div>
          </div>
        )}

        {erro && <div className="erro-box">⚠️ {erro}</div>}

        <div ref={fimRef} />
      </div>

      {!resultado && !carregando && passoAtual?.tipo === "texto" && (
        <div className="chat-input-area">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarInput()}
            placeholder={passoAtual.placeholder || "Digite sua resposta..."}
            autoFocus
          />
          <button className="btn-enviar" onClick={enviarInput}>↑</button>
        </div>
      )}
    </div>
  );
}