import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormPeriodo.css"; // Certifique-se de ajustar o caminho do arquivo de estilo conforme necessário

function FormPeriodo() {
  const [periodos, setPeriodos] = useState([]);
  const [novoPeriodo, setNovoPeriodo] = useState({
    numero: "",
    semestreAno: "",
    dataInicio: "",
    dataFim: "",
    turno: [],
    cursoId: "",
  });
  const [periodoEditando, setPeriodoEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedPeriodos = JSON.parse(localStorage.getItem("periodos")) || [];
    setPeriodos(storedPeriodos);
  }, []);

  const adicionarPeriodo = () => {
    try {
      const novoPeriodo = {
        id: periodos.length + 1, // Atribuir um ID único ao período
        numero: "",
        semestreAno: "",
        dataInicio: "",
        dataFim: "",
        turno: [],
        cursoId: "",
      };
      const updatedPeriodos = [...periodos, novoPeriodo];
      setPeriodos(updatedPeriodos);
      localStorage.setItem("periodos", JSON.stringify(updatedPeriodos));
    } catch (error) {
      console.error("Erro ao adicionar período", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const periodoParaEditar = periodos[index];
    setPeriodoEditando(periodoParaEditar);
    setNovoPeriodo({
      numero: periodoParaEditar.numero,
      semestreAno: periodoParaEditar.semestreAno,
      dataInicio: periodoParaEditar.dataInicio,
      dataFim: periodoParaEditar.dataFim,
      turno: periodoParaEditar.turno,
      cursoId: periodoParaEditar.cursoId,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (
        novoPeriodo.numero &&
        novoPeriodo.semestreAno &&
        novoPeriodo.dataInicio &&
        novoPeriodo.dataFim &&
        novoPeriodo.turno.length > 0 &&
        novoPeriodo.cursoId
      ) {
        // Cria uma cópia da lista de períodos
        const periodosAtualizados = [...periodos];
        // Substitui o período antigo pelo período editado na lista
        periodosAtualizados[periodos.indexOf(periodoEditando)] = novoPeriodo;
        // Atualiza o estado da lista de períodos
        setPeriodos(periodosAtualizados);
        // Limpa os estados relacionados à edição
        setPeriodoEditando(null);
        setNovoPeriodo({
          numero: "",
          semestreAno: "",
          dataInicio: "",
          dataFim: "",
          turno: [],
          cursoId: "",
        });
        setEditando(false);
        // Atualiza os períodos no localStorage
        localStorage.setItem("periodos", JSON.stringify(periodosAtualizados));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    // Limpe os estados após o cancelamento
    setPeriodoEditando(null);
    setNovoPeriodo({
      numero: "",
      semestreAno: "",
      dataInicio: "",
      dataFim: "",
      turno: [],
      cursoId: "",
    });
    setEditando(false);
  };

  const excluirPeriodo = (index) => {
    const novosPeriodos = periodos.filter((periodo, i) => i !== index);
    setPeriodos(novosPeriodos);
    setPeriodoEditando(null);
    setNovoPeriodo({
      numero: "",
      semestreAno: "",
      dataInicio: "",
      dataFim: "",
      turno: [],
      cursoId: "",
    });
    setEditando(false);
    localStorage.setItem("periodos", JSON.stringify(novosPeriodos));
  };

  return (
    <>
      <Header />
      <div className="section1FormPeriodos">
        <h1 className="tituloPagina">Cadastro Período</h1>
        <div className="conatinerFormPeriodos">
          <div className="cadastroFormularioPeriodos">
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Número do Período:</label>
              <input
                className="imputComboPeriodo"
                placeholder="Digite o número do período"
                id="numeroPeriodo"
                value={novoPeriodo.numero}
                onChange={(e) =>
                  setNovoPeriodo({ ...novoPeriodo, numero: e.target.value })
                }
              />
            </div>
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Semestre/Ano:</label>
              <input
                className="imputComboPeriodo"
                placeholder="Digite o semestre/ano do período"
                id="semestreAnoPeriodo"
                value={novoPeriodo.semestreAno}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    semestreAno: e.target.value,
                  })
                }
              />
            </div>
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Data de Início:</label>
              <input
                className="imputComboPeriodo"
                placeholder="Digite a data de início"
                id="dataInicioPeriodo"
                type="date"
                value={novoPeriodo.dataInicio}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    dataInicio: e.target.value,
                  })
                }
              />
            </div>
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Data de Fim:</label>
              <input
                className="imputComboPeriodo"
                placeholder="Digite a data de fim"
                id="dataFimPeriodo"
                type="date"
                value={novoPeriodo.dataFim}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    dataFim: e.target.value,
                  })
                }
              />
            </div>
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Turno:</label>
              <select
                className="imputComboPeriodo"
                value={novoPeriodo.turno}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    turno: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
                multiple
              >
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </select>
            </div>
            <div className="divComboPeriodo">
              <label className="labelComboPeriodo">Curso:</label>
              {/* Aqui você pode adicionar um campo de seleção para os cursos */}
              {/* Exemplo: */}
              <select
                className="imputComboPeriodo"
                value={novoPeriodo.cursoId}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    cursoId: e.target.value,
                  })
                }
              >
                {/* Opções de cursos */}
                <option value="1">Curso A</option>
                <option value="2">Curso B</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarPeriodo"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoPeriodo"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarPeriodo}
                className="btnSubmitFormPeriodos"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaPeriodos">
          <table>
            <thead>
              <tr>
                <th>Número do Período</th>
                <th>Semestre/Ano</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Turno</th>
                <th>Curso</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {periodos.map((periodo, index) => (
                <tr key={index}>
                  <td className="tdforms">{periodo.numero}</td>
                  <td className="tdforms">{periodo.semestreAno}</td>
                  <td className="tdforms">{periodo.dataInicio}</td>
                  <td className="tdforms">{periodo.dataFim}</td>
                  <td className="tdforms">{periodo.turno.join(", ")}</td>
                  <td className="tdforms">{periodo.cursoId}</td>
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
                      onClick={() => excluirPeriodo(index)}
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

export default FormPeriodo;