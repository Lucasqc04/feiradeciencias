import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface ResultadoCirculo {
  area: number;
  perimetro: number;
}

const CalculadoraCirculo: React.FC = () => {
  const [raio, setRaio] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoCirculo | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const r = parseFloat(raio);

    if (isNaN(r) || r <= 0) {
      setResultado('O raio deve ser um número positivo.');
      return;
    }

    const area = Math.PI * r * r;
    const perimetro = 2 * Math.PI * r;

    setResultado({ area, perimetro });
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Raio:</label>
            <StyledInput type="number" value={raio} onChange={(e) => setRaio(e.target.value)} required />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>
                Área: {resultado.area.toFixed(2)}
                <hr />
                Perímetro: {resultado.perimetro.toFixed(2)}
              </ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação da Área e Perímetro do Círculo</h3>
          <p>
            A área de um círculo é calculada pela fórmula: Área = π * raio².
          </p>
          <p>
            O perímetro de um círculo é calculado pela fórmula: Perímetro = 2 * π * raio.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
         <Exemplos>
         <h3>Exemplos de Problemas Utilizando a Área e o Perímetro do Círculo</h3>
         <p>
           <strong>Exemplo 1:</strong> Uma empresa de jardinagem deseja cercar um jardim circular com raio de 10 metros. Calcule a quantidade de tela necessária para cercar o jardim.
           <br />
           <strong>Solução:</strong> Para calcular a quantidade de tela necessária, precisamos do perímetro do círculo, que é dado por 2 * π * raio. No caso, seria 2 * π * 10 ≈ 62,83 metros.
         </p>
         <p>
           <strong>Exemplo 2:</strong> Um engenheiro precisa construir um reservatório de água em formato cilíndrico com base circular. Ele tem um raio disponível de 5 metros para a base. Calcule a área da base e o perímetro do reservatório.
           <br />
           <strong>Solução:</strong> A área da base do reservatório é dada pela fórmula π * raio². No caso, seria π * 5² ≈ 78,54 metros quadrados. Já o perímetro do reservatório, que corresponde à circunferência da base, é dado por 2 * π * raio, ou seja, 2 * π * 5 ≈ 31,42 metros.
         </p>
       </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraCirculo;

const ResultadoContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#ffb74c58" : "#34495e"};
  border: 2px solid ${({ theme }) => theme.textColor};
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 90%;
  margin-left:5%;
`;

const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20%;
  margin-top:5%;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 90%;
`;

const Toggle = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#e6e6e6" : "#34495e"};
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  transition: background-color 0.3s ease;
  width: 100%;
  text-align: center;
  margin-top: 2%;
  font-size: large;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#ccc" : "#2c3e50"};
  }
`;

const FormContainer = styled.div`
   background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f9f9f9" : "#34495e"};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
  margin-bottom: 20px;
  width: 90%;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 90%; /* Ajuste a largura conforme necessário */
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "white" : "#34495e"};
  color: ${({ theme }) => theme.textColor};
  margin-left: 5%;
`;

const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#007bff" : "#2980b9"};
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#0056b3" : "#3498db"};
  }
`;

const RadioLabel = styled.label`
  margin-left: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
`;

const Explicacao = styled.div`
   background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f2f2f2" : "#34495e"};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
`;

const Exemplos = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f2f2f2" : "#34495e"};
  border-radius: 5px;
  padding: 10px;
  width: 90%;
`;

