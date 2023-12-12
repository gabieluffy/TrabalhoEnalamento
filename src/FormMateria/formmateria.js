import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormMateria.css"; // Certifique-se de ajustar o caminho do arquivo de estilo conforme necessário

function FormMateria() {
  const [materias, setMaterias] = useState([]);
  const [novaMateria, setNovaMateria] = useState({
    nome: "",
    periodos: [],
    professor: "",
    dataInicio: "",
    dataFim: "",
    diaSemana: "",
    horario: "",
    sala: "",
  });
  const [materiaEditando, setMateriaEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedMaterias = JSON.parse(localStorage.getItem("materias")) || [];
    setMaterias(storedMaterias);
  }, []);

  const adicionarMateria = () => {
    try {
      const novaMateria = {
        id: materias.length + 1, // Atribuir um ID único à matéria
        nome: "",
        periodos: [],
        professor: "",
        dataInicio: "",
        dataFim: "",
        diaSemana: "",
        horario: "",
        sala: "",
      };
      const materiasAtualizadas = [...materias, novaMateria];
      setMaterias(materiasAtualizadas);
      localStorage.setItem("materias", JSON.stringify(materiasAtualizadas));
    } catch (error) {
      console.error("Erro ao adicionar matéria", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const materiaParaEditar = materias[index];
    setMateriaEditando(materiaParaEditar);
    setNovaMateria({
      nome: materiaParaEditar.nome,
      periodos: materiaParaEditar.periodos,
      professor: materiaParaEditar.professor,
      dataInicio: materiaParaEditar.dataInicio,
      dataFim: materiaParaEditar.dataFim,
      diaSemana: materiaParaEditar.diaSemana,
      horario: materiaParaEditar.horario,
      sala: materiaParaEditar.sala,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (
        novaMateria.nome &&
        novaMateria.periodos.length > 0 &&
        novaMateria.professor &&
        novaMateria.dataInicio &&
        novaMateria.dataFim &&
        novaMateria.diaSemana &&
        novaMateria.horario &&
        novaMateria.sala
      ) {
        // Cria uma cópia da lista de matérias
        const materiasAtualizadas = [...materias];
        // Substitui a matéria antiga pela matéria editada na lista
        materiasAtualizadas[materias.indexOf(materiaEditando)] = novaMateria;
        // Atualiza o estado da lista de matérias
        setMaterias(materiasAtualizadas);
        // Limpa os estados relacionados à edição
        setMateriaEditando(null);
        setNovaMateria({
          nome: "",
          periodos: [],
          professor: "",
          dataInicio: "",
          dataFim: "",
          diaSemana: "",
          horario: "",
          sala: "",
        });
        setEditando(false);
        // Atualiza as matérias no localStorage
        localStorage.setItem("materias", JSON.stringify(materiasAtualizadas));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    // Limpar os estados após o cancelamento
    setMateriaEditando(null);
    setNovaMateria({
      nome: "",
      periodos: [],
      professor: "",
      dataInicio: "",
      dataFim: "",
      diaSemana: "",
      horario: "",
      sala: "",
    });
    setEditando(false);
  };

  const excluirMateria = (index) => {
    const novasMaterias = materias.filter((materia, i) => i !== index);
    setMaterias(novasMaterias);
    setMateriaEditando(null);
    setNovaMateria({
      nome: "",
      periodos: [],
      professor: "",
      dataInicio: "",
      dataFim: "",
      diaSemana: "",
      horario: "",
      sala: "",
    });
    setEditando(false);
    localStorage.setItem("materias", JSON.stringify(novasMaterias));
  };

  return (
    <>
      <Header />
      <div className="section1FormMaterias">
        <h1 className="tituloPagina">Cadastro Matéria</h1>
        <div className="conatinerFormMaterias">
          <div className="cadastroFormularioMaterias">
            <div className="divComboMateria">
              <label className="labelComboMateria">Nome da Matéria:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite o nome da matéria"
                id="nomeMateria"
                value={novaMateria.nome}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, nome: e.target.value })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Períodos:</label>
              {/* Adicione um campo de seleção para os períodos */}
              {/* Exemplo: */}
              <select
                className="imputComboMateria"
                value={novaMateria.periodos}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    periodos: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
                multiple
              >
                {/* Opções de períodos */}
                <option value="1">Período 1</option>
                <option value="2">Período 2</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Professor:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite o nome do professor"
                id="professorMateria"
                value={novaMateria.professor}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, professor: e.target.value })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Data de Início:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite a data de início"
                id="dataInicioMateria"
                type="date"
                value={novaMateria.dataInicio}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    dataInicio: e.target.value,
                  })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Data de Fim:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite a data de fim"
                id="dataFimMateria"
                type="date"
                value={novaMateria.dataFim}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, dataFim: e.target.value })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Dia da Semana:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite o dia da semana"
                id="diaSemanaMateria"
                value={novaMateria.diaSemana}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, diaSemana: e.target.value })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Horário:</label>
              <input
                className="imputComboMateria"
                placeholder="Digite o horário"
                id="horarioMateria"
                value={novaMateria.horario}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, horario: e.target.value })
                }
              />
            </div>
            <div className="divComboMateria">
              <label className="labelComboMateria">Sala:</label>
              {/* Aqui você pode adicionar um campo de seleção para as salas */}
              {/* Exemplo: */}
              <select
                className="imputComboMateria"
                value={novaMateria.sala}
                onChange={(e) =>
                  setNovaMateria({ ...novaMateria, sala: e.target.value })
                }
              >
                {/* Opções de salas */}
                <option value="101">Sala 101</option>
                <option value="102">Sala 102</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarMateria"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoMateria"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarMateria}
                className="btnSubmitFormMaterias"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaMaterias">
          <table>
            <thead>
              <tr>
                <th>Nome da Matéria</th>
                <th>Períodos</th>
                <th>Professor</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Dia da Semana</th>
                <th>Horário</th>
                <th>Sala</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={index}>
                  <td className="tdforms">{materia.nome}</td>
                  <td className="tdforms">{materia.periodos.join(", ")}</td>
                  <td className="tdforms">{materia.professor}</td>
                  <td className="tdforms">{materia.dataInicio}</td>
                  <td className="tdforms">{materia.dataFim}</td>
                  <td className="tdforms">{materia.diaSemana}</td>
                  <td className="tdforms">{materia.horario}</td>
                  <td className="tdforms">{materia.sala}</td>
                  <td className="tdforms">
                    <button
                      type="button"
                      onClick={() => preencherCamposDeEdicao(index)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button
                      type="button"
                      onClick={() => excluirMateria(index)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormMateria;
