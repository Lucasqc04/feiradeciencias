 // CalculadoraMRUV.jsx
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface ResultadoMRUV {
  velocidadeFinal?: number;
  velocidadeInicial?: number;
  aceleracao?: number;
  deslocamento?: number;
  tempo?: number;
}

const CalculadoraMRUV: React.FC = () => {
  const [valorA, setValorA] = useState<string>('');
  const [valorB, setValorB] = useState<string>('');
  const [valorC, setValorC] = useState<string>('');
  const [tipoCalculo, setTipoCalculo] = useState<'calcularVelocidadeFinal' | 'calcularVelocidadeInicial' | 'calcularAceleracao' | 'calcularDeslocamento' | 'calcularTempo'>('calcularVelocidadeFinal');
  const [resultado, setResultado] = useState<ResultadoMRUV | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const A = parseFloat(valorA);
    const B = parseFloat(valorB);
    const C = parseFloat(valorC);

    if (isNaN(A) || isNaN(B) || isNaN(C) || A <= 0 || B <= 0 || C <= 0) {
      setResultado('Os valores devem ser números positivos.');
      return;
    }

    if (tipoCalculo === 'calcularVelocidadeFinal') {
      const vf = A + B * C;
      setResultado({ velocidadeFinal: vf });
    } else if (tipoCalculo === 'calcularVelocidadeInicial') {
      const vi = A - B * C;
      setResultado({ velocidadeInicial: vi });
    } else if (tipoCalculo === 'calcularAceleracao') {
      const a = (A - B) / C;
      setResultado({ aceleracao: a });
    } else if (tipoCalculo === 'calcularDeslocamento') {
      const d = A * C + (B * C * C) / 2;
      setResultado({ deslocamento: d });
    } else if (tipoCalculo === 'calcularTempo') {
      const t = (A - B) / C;
      setResultado({ tempo: t });
    }
  };

  return (
    <Container>
      <ToggleContainer>
        <Toggle>
          <input
            type="radio"
            id="calcularVelocidadeFinal"
            value="calcularVelocidadeFinal"
            checked={tipoCalculo === 'calcularVelocidadeFinal'}
            onChange={() => setTipoCalculo('calcularVelocidadeFinal')}
          />
          <RadioLabel htmlFor="calcularVelocidadeFinal">Calcular Velocidade Final (Vf = Vi + a * t)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularVelocidadeInicial"
            value="calcularVelocidadeInicial"
            checked={tipoCalculo === 'calcularVelocidadeInicial'}
            onChange={() => setTipoCalculo('calcularVelocidadeInicial')}
          />
          <RadioLabel htmlFor="calcularVelocidadeInicial">Calcular Velocidade Inicial (Vi = Vf - a * t)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularAceleracao"
            value="calcularAceleracao"
            checked={tipoCalculo === 'calcularAceleracao'}
            onChange={() => setTipoCalculo('calcularAceleracao')}
          />
          <RadioLabel htmlFor="calcularAceleracao">Calcular Aceleração (a = (Vf - Vi) / t)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularDeslocamento"
            value="calcularDeslocamento"
            checked={tipoCalculo === 'calcularDeslocamento'}
            onChange={() => setTipoCalculo('calcularDeslocamento')}
          />
          <RadioLabel htmlFor="calcularDeslocamento">Calcular Deslocamento (d = Vi * t + (a * t²) / 2)</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="calcularTempo"
            value="calcularTempo"
            checked={tipoCalculo === 'calcularTempo'}
            onChange={() => setTipoCalculo('calcularTempo')}
          />
          <RadioLabel htmlFor="calcularTempo">Calcular Tempo (t = (Vf - Vi) / a)</RadioLabel>
        </Toggle>
      </ToggleContainer>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>{tipoCalculo === 'calcularVelocidadeFinal' ? 'Velocidade Inicial (Vi):' : 'Velocidade Final (Vf):'}</label>
            <StyledInput type="number" value={valorA} onChange={(e) => setValorA(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <label>{tipoCalculo === 'calcularDeslocamento' ? 'Aceleração (a):' : 'Velocidade Inicial (Vi):'}</label>
            <StyledInput type="number" value={valorB} onChange={(e) => setValorB(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <label>{tipoCalculo === 'calcularDeslocamento' ? 'Tempo (t):' : 'Aceleração (a):'}</label>
            <StyledInput type="number" value={valorC} onChange={(e) => setValorC(e.target.value)} required />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : tipoCalculo === 'calcularVelocidadeFinal' ? (
              <ResultadoTexto>Velocidade Final (Vf): {resultado.velocidadeFinal?.toFixed(2)} m/s</ResultadoTexto>
            ) : tipoCalculo === 'calcularVelocidadeInicial' ? (
              <ResultadoTexto>Velocidade Inicial (Vi): {resultado.velocidadeInicial?.toFixed(2)} m/s</ResultadoTexto>
            ) : tipoCalculo === 'calcularAceleracao' ? (
              <ResultadoTexto>Aceleração (a): {resultado.aceleracao?.toFixed(2)} m/s²</ResultadoTexto>
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
          <h3>Explicação do Movimento Retilíneo Uniformemente Variado (MRUV)</h3>
          <p>
            O Movimento Retilíneo Uniformemente Variado (MRUV) é caracterizado pela variação uniforme da velocidade ao longo do tempo. As fórmulas principais são:
          </p>
          <ul>
            <li><strong>Velocidade Final (Vf):</strong> Vf = Vi + a * t</li>
            <li><strong>Velocidade Inicial (Vi):</strong> Vi = Vf - a * t</li>
            <li><strong>Aceleração (a):</strong> a = (Vf - Vi) / t</li>
            <li><strong>Deslocamento (d):</strong> d = Vi * t + (a * t²) / 2</li>
            <li><strong>Tempo (t):</strong> t = (Vf - Vi) / a</li>
          </ul>
          <p>
            Onde:
            <ul>
              <li><strong>Vf</strong> é a velocidade final.</li>
              <li><strong>Vi</strong> é a velocidade inicial.</li>
              <li><strong>a</strong> é a aceleração.</li>
              <li><strong>d</strong> é o deslocamento.</li>
              <li><strong>t</strong> é o tempo.</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando MRUV</h3>
          <p>
            <strong>Exemplo 1:</strong> Um carro parte do repouso (Vi = 0) e acelera a 2 m/s² por 5 segundos. Qual é a velocidade final?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula Vf = Vi + a * t, temos: Vf = 0 + 2 * 5 = 10 m/s.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Um objeto em movimento possui uma velocidade inicial de 10 m/s e uma aceleração de -2 m/s². Quanto tempo leva para parar?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula t = (Vf - Vi) / a, temos: t = (0 - 10) / (-2) = 5 segundos.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraMRUV;

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
