// CalculadoraMRU.jsx
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface ResultadoMRU {
  velocidade?: number;
  deslocamento?: number;
  tempo?: number;
}

const CalculadoraMRU: React.FC = () => {
  const [valorA, setValorA] = useState<string>('');
  const [valorB, setValorB] = useState<string>('');
  const [tipoCalculo, setTipoCalculo] = useState<'calcularVelocidade' | 'calcularDeslocamento' | 'calcularTempo'>('calcularVelocidade');
  const [resultado, setResultado] = useState<ResultadoMRU | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const A = parseFloat(valorA);
    const B = parseFloat(valorB);

    if (isNaN(A) || isNaN(B) || A <= 0 || B <= 0) {
      setResultado('Os valores devem ser números positivos.');
      return;
    }

    if (tipoCalculo === 'calcularVelocidade') {
      const v = A / B;
      setResultado({ velocidade: v });
    } else if (tipoCalculo === 'calcularDeslocamento') {
      const d = A * B;
      setResultado({ deslocamento: d });
    } else if (tipoCalculo === 'calcularTempo') {
      const t = A / B;
      setResultado({ tempo: t });
    }
  };

  return (
    <Container>
      <ToggleContainer>
        <Toggle>
          <input
            type="radio"
            id="calcularVelocidade"
            value="calcularVelocidade"
            checked={tipoCalculo === 'calcularVelocidade'}
            onChange={() => setTipoCalculo('calcularVelocidade')}
          />
          <RadioLabel htmlFor="calcularVelocidade">Calcular Velocidade (v = d / t)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularDeslocamento"
            value="calcularDeslocamento"
            checked={tipoCalculo === 'calcularDeslocamento'}
            onChange={() => setTipoCalculo('calcularDeslocamento')}
          />
          <RadioLabel htmlFor="calcularDeslocamento">Calcular Deslocamento (d = v * t)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularTempo"
            value="calcularTempo"
            checked={tipoCalculo === 'calcularTempo'}
            onChange={() => setTipoCalculo('calcularTempo')}
          />
          <RadioLabel htmlFor="calcularTempo">Calcular Tempo (t = d / v)</RadioLabel>
        </Toggle>
      </ToggleContainer>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>{tipoCalculo === 'calcularVelocidade' ? 'Deslocamento (d):' : 'Velocidade (v):'}</label>
            <StyledInput type="number" value={valorA} onChange={(e) => setValorA(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <label>{tipoCalculo === 'calcularTempo' ? 'Deslocamento (d):' : 'Tempo (t):'}</label>
            <StyledInput type="number" value={valorB} onChange={(e) => setValorB(e.target.value)} required />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : tipoCalculo === 'calcularVelocidade' ? (
              <ResultadoTexto>Velocidade (v): {resultado.velocidade?.toFixed(2)} m/s</ResultadoTexto>
            ) : tipoCalculo === 'calcularDeslocamento' ? (
              <ResultadoTexto>Deslocamento (d): {resultado.deslocamento?.toFixed(2)} m</ResultadoTexto>
            ) : (
              <ResultadoTexto>Tempo (t): {resultado.tempo?.toFixed(2)} s</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Movimento Retilíneo Uniforme (MRU)</h3>
          <p>
            O Movimento Retilíneo Uniforme (MRU) é caracterizado por um movimento com velocidade constante, ou seja, a aceleração é zero. As fórmulas principais são:
          </p>
          <ul>
            <li><strong>Velocidade (v):</strong> v = d / t</li>
            <li><strong>Deslocamento (d):</strong> d = v * t</li>
            <li><strong>Tempo (t):</strong> t = d / v</li>
          </ul>
          <p>
            Onde:
            <ul>
              <li><strong>v</strong> é a velocidade.</li>
              <li><strong>d</strong> é o deslocamento.</li>
              <li><strong>t</strong> é o tempo.</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando MRU</h3>
          <p>
            <strong>Exemplo 1:</strong> Um carro percorre 100 km em 2 horas. Qual é a sua velocidade?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula v = d / t, temos: v = 100 / 2 = 50 km/h.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Uma bicicleta se desloca a uma velocidade constante de 15 km/h por 3 horas. Qual é o deslocamento?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula d = v * t, temos: d = 15 * 3 = 45 km.
          </p>
          <p>
            <strong>Exemplo 3:</strong> Uma pessoa caminha a uma velocidade constante de 4 km/h e percorre 12 km. Quanto tempo leva?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula t = d / v, temos: t = 12 / 4 = 3 horas.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraMRU;

const ResultadoContainer = styled.div`
  background-color: #e6f7ff; /* Azul claro */
  border: 2px solid #91d5ff; /* Azul mais escuro */
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
  color: #0056b3; /* Azul escuro */
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
  background-color: #e6e6e6;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #ccc;
  }
`;

const FormContainer = styled.div`
  background-color: #f9f9f9; /* Cor de fundo do container dos inputs */
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
  border: 2px solid orange; /* Laranja */
  background: white; /* Branco */
  color: orange; /* Laranja */
  margin-left: 5%;
`;

const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RadioLabel = styled.label`
  margin-left: 8px;
  font-size: 16px;
  color: #333;
`;

const Explicacao = styled.div`
  background-color: #f2f2f2; /* Cor de fundo da explicação */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
`;

const Exemplos = styled.div`
  background-color: #f2f2f2; /* Cor de fundo dos exemplos */
  border-radius: 5px;
  padding: 10px;
  width: 90%;
`;
