import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormProfessor.css"; 

function FormProfessor() {
  const [professores, setProfessores] = useState([]);
  const [novoProfessor, setNovoProfessor] = useState({
    nome: "",
    celular: "",
    matricula: "",
  });
  const [professorEditando, setProfessorEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedProfessores = JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(storedProfessores);
  }, []);

  const adicionarProfessor = () => {
    try {
      const novoProfessor = {
        id: professores.length + 1, // Atribuir um ID único ao professor
        nome: "",
        celular: "",
        matricula: "",
      };
      const updatedProfessores = [...professores, novoProfessor];
      setProfessores(updatedProfessores);
      localStorage.setItem("professores", JSON.stringify(updatedProfessores));
    } catch (error) {
      console.error("Erro ao adicionar professor", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const professorParaEditar = professores[index];
    setProfessorEditando(professorParaEditar);
    setNovoProfessor({
      nome: professorParaEditar.nome,
      celular: professorParaEditar.celular,
      matricula: professorParaEditar.matricula,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (
        novoProfessor.nome &&
        novoProfessor.celular &&
        novoProfessor.matricula
      ) {
        // Cria uma cópia da lista de professores
        const professoresAtualizados = [...professores];
        // Substitui o professor antigo pelo professor editado na lista
        professoresAtualizados[professores.indexOf(professorEditando)] = novoProfessor;
        // Atualiza o estado da lista de professores
        setProfessores(professoresAtualizados);
        // Limpa os estados relacionados à edição
        setProfessorEditando(null);
        setNovoProfessor({
          nome: "",
          celular: "",
          matricula: "",
        });
        setEditando(false);
        // Atualiza os professores no localStorage
        localStorage.setItem("professores", JSON.stringify(professoresAtualizados));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    // Limpe os estados após o cancelamento
    setProfessorEditando(null);
    setNovoProfessor({
      nome: "",
      celular: "",
      matricula: "",
    });
    setEditando(false);
  };

  const excluirProfessor = (index) => {
    const novosProfessores = professores.filter((professor, i) => i !== index);
    setProfessores(novosProfessores);
    setProfessorEditando(null);
    setNovoProfessor({
      nome: "",
      celular: "",
      matricula: "",
    });
    setEditando(false);
    localStorage.setItem("professores", JSON.stringify(novosProfessores));
  };

  return (
    <>
      <Header />
      <div className="section1FormProfessores">
        <h1 className="tituloPagina">Cadastro Professor</h1>
        <div className="conatinerFormProfessores">
          <div className="cadastroFormularioProfessores">
            <div className="divComboProfessor">
              <label className="labelComboProfessor">Nome:</label>
              <input
                className="imputComboProfessor"
                placeholder="Digite o nome do professor"
                id="nomeProfessor"
                value={novoProfessor.nome}
                onChange={(e) =>
                  setNovoProfessor({ ...novoProfessor, nome: e.target.value })
                }
              />
            </div>
            <div className="divComboProfessor">
              <label className="labelComboProfessor">Número de Celular:</label>
              <input
                className="imputComboProfessor"
                placeholder="Digite o número de celular"
                id="celularProfessor"
                value={novoProfessor.celular}
                onChange={(e) =>
                  setNovoProfessor({ ...novoProfessor, celular: e.target.value })
                }
              />
            </div>
            <div className="divComboProfessor">
              <label className="labelComboProfessor">Matrícula:</label>
              <input
                className="imputComboProfessor"
                placeholder="Digite a matrícula"
                id="matriculaProfessor"
                value={novoProfessor.matricula}
                onChange={(e) =>
                  setNovoProfessor({ ...novoProfessor, matricula: e.target.value })
                }
              />
            </div>
            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarProfessor"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoProfessor"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarProfessor}
                className="btnSubmitFormProfessores"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaProfessores">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Número de Celular</th>
                <th>Matrícula</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor, index) => (
                <tr key={index}>
                  <td className="tdforms">{professor.nome}</td>
                  <td className="tdforms">{professor.celular}</td>
                  <td className="tdforms">{professor.matricula}</td>
                  <td className="tdforms">
                    <button
                      type="button"
                      onClick={() => preencherCamposDeEdicao(index)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button type="button" onClick={() => excluirProfessor(index)}>
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

export default FormProfessor;
