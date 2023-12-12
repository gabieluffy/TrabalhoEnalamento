import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormSala.css"; // Update the CSS file path

function FormSala() {
  const [salas, setSalas] = useState([]);
  const [novaSala, setNovaSala] = useState({
    andar: "",
    numero: "",
    predio: "",
    numeroDeCadeiras: "",
  });
  const [salaEditando, setSalaEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedSalas = JSON.parse(localStorage.getItem("salas")) || [];
    setSalas(storedSalas);
  }, []);

  const adicionarSala = () => {
    try {
      const novaSala = {
        id: salas.length + 1,
        andar: "",
        numero: "",
        predio: "",
        numeroDeCadeiras: "",
      };
      const updatedSalas = [...salas, novaSala];
      setSalas(updatedSalas);
      localStorage.setItem("salas", JSON.stringify(updatedSalas));
    } catch (error) {
      console.error("Erro ao adicionar sala", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const salaParaEditar = salas[index];
    setSalaEditando(salaParaEditar);
    setNovaSala({
      andar: salaParaEditar.andar,
      numero: salaParaEditar.numero,
      predio: salaParaEditar.predio,
      numeroDeCadeiras: salaParaEditar.numeroDeCadeiras,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (
        novaSala.andar &&
        novaSala.numero &&
        novaSala.predio &&
        novaSala.numeroDeCadeiras
      ) {
        const salasAtualizadas = [...salas];
        salasAtualizadas[salas.indexOf(salaEditando)] = novaSala;
        setSalas(salasAtualizadas);
        setSalaEditando(null);
        setNovaSala({
          andar: "",
          numero: "",
          predio: "",
          numeroDeCadeiras: "",
        });
        setEditando(false);
        localStorage.setItem("salas", JSON.stringify(salasAtualizadas));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    setSalaEditando(null);
    setNovaSala({
      andar: "",
      numero: "",
      predio: "",
      numeroDeCadeiras: "",
    });
    setEditando(false);
  };

  const excluirSala = (index) => {
    const novasSalas = salas.filter((sala, i) => i !== index);
    setSalas(novasSalas);
    setSalaEditando(null);
    setNovaSala({
      andar: "",
      numero: "",
      predio: "",
      numeroDeCadeiras: "",
    });
    setEditando(false);
    localStorage.setItem("salas", JSON.stringify(novasSalas));
  };

  return (
    <>
      <Header />
      <div className="section1FormSalas">
        <h1 className="tituloPagina">Cadastro Sala</h1>
        <div className="conatinerFormSalas">
          <div className="cadastroFormularioSalas">
            <div className="divComboSala">
              <label className="labelComboSala">Andar:</label>
              <input
                className="imputComboSala"
                placeholder="Digite o andar da sala"
                id="andarSala"
                value={novaSala.andar}
                onChange={(e) =>
                  setNovaSala({ ...novaSala, andar: e.target.value })
                }
              />
            </div>
            <div className="divComboSala">
              <label className="labelComboSala">Número:</label>
              <input
                className="imputComboSala"
                placeholder="Digite o número da sala"
                id="numeroSala"
                value={novaSala.numero}
                onChange={(e) =>
                  setNovaSala({ ...novaSala, numero: e.target.value })
                }
              />
            </div>
            <div className="divComboSala">
              <label className="labelComboSala">Prédio:</label>
              <input
                className="imputComboSala"
                placeholder="Digite o prédio da sala"
                id="predioSala"
                value={novaSala.predio}
                onChange={(e) =>
                  setNovaSala({ ...novaSala, predio: e.target.value })
                }
              />
            </div>
            <div className="divComboSala">
              <label className="labelComboSala">Número de Cadeiras:</label>
              <input
                className="imputComboSala"
                placeholder="Digite o número de cadeiras da sala"
                id="cadeirasSala"
                value={novaSala.numeroDeCadeiras}
                onChange={(e) =>
                  setNovaSala({
                    ...novaSala,
                    numeroDeCadeiras: e.target.value,
                  })
                }
              />
            </div>
            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarSala"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoSala"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarSala}
                className="btnSubmitFormSalas"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaSalas">
          <table>
            <thead>
              <tr>
                <th>Andar</th>
                <th>Número</th>
                <th>Prédio</th>
                <th>Número de Cadeiras</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {salas.map((sala, index) => (
                <tr key={index}>
                  <td className="tdforms">{sala.andar}</td>
                  <td className="tdforms">{sala.numero}</td>
                  <td className="tdforms">{sala.predio}</td>
                  <td className="tdforms">{sala.numeroDeCadeiras}</td>
                  <td className="tdforms">
                    <button
                      type="button"
                      onClick={() => preencherCamposDeEdicao(index)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button type="button" onClick={() => excluirSala(index)}>
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

export default FormSala;
