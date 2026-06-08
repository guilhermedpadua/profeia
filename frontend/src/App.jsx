import React, { useState } from "react";
import Turmas from "./pages/Turmas/Turmas";
import CadastroTurma from "./pages/CadastroTurma/CadastroTurma";
import Home from "./pages/Home";
import Chat from "./pages/Chat/Chat";

export default function App() {
  const [tela, setTela] = useState("turmas"); // turmas | cadastro | home | chat
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [tipoMaterial, setTipoMaterial] = useState(null);
  const [turmas, setTurmas] = useState([]);

  function selecionarTurma(turma) {
    setTurmaSelecionada(turma);
    setTela("home");
  }

  function abrirChat(tipo) {
    setTipoMaterial(tipo);
    setTela("chat");
  }

  function salvarTurma(turma) {
    const nova = { ...turma, id: Date.now() };
    setTurmas((prev) => [...prev, nova]);
    setTurmaSelecionada(nova);
    setTela("home");
  }

  return (
    <>
      {tela === "turmas" && (
        <Turmas
          turmas={turmas}
          onSelecionar={selecionarTurma}
          onNovaTurma={() => setTela("cadastro")}
        />
      )}
      {tela === "cadastro" && (
        <CadastroTurma
          onSalvar={salvarTurma}
          onVoltar={() => setTela("turmas")}
        />
      )}
      {tela === "home" && (
        <Home
          turma={turmaSelecionada}
          onCard={abrirChat}
          onTrocarTurma={() => setTela("turmas")}
        />
      )}
      {tela === "chat" && (
        <Chat
          turma={turmaSelecionada}
          tipo={tipoMaterial}
          onVoltar={() => setTela("home")}
        />
      )}
    </>
  );
}
