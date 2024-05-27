import React, { useState, FormEvent } from 'react';
import {
  ResultadoContainer,
  ResultadoTexto,
  Container,
  FormContainer,
  InputGroup,
  StyledInput,
  CenteredButton,
  Toggle,
  Explicacao,
  Exemplos,
} from '../../../ui/Styles/input/input.styles';
 
const calcularAreaPoligonoRegular = (lado: number, nLados: number): number => {
  return (nLados * lado * lado) / (4 * Math.tan(Math.PI / nLados));
};

const CalculadoraAreaPoligonoRegular: React.FC = () => {
  const [lado, setLado] = useState<string>('');
  const [nLados, setNLados] = useState<string>('');
  const [resultado, setResultado] = useState<number | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const ladoNum = parseFloat(lado);
    const nLadosNum = parseFloat(nLados);

    if (isNaN(ladoNum) || isNaN(nLadosNum) || ladoNum <= 0 || nLadosNum <= 2) {
      setResultado('Por favor, insira valores válidos para o lado e o número de lados.');
    } else {
      const area = calcularAreaPoligonoRegular(ladoNum, nLadosNum);
      setResultado(area);
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Tamanho do lado:</label>
            <StyledInput
              type="number"
              value={lado}
              onChange={(e) => setLado(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Número de lados:</label>
            <StyledInput
              type="number"
              value={nLados}
              onChange={(e) => setNLados(e.target.value)}
              required
            />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado !== null && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>{resultado.toFixed(2)}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação de Polígonos Regulares</h3>
          <p>
            Um polígono regular é uma figura geométrica plana com todos os lados e ângulos iguais.
          </p>
          <p>
            A fórmula para calcular a área de um polígono regular é dada por: <em>A = (n * lado²) / (4 * tan(π / n))</em>, onde:
            <ul>
              <li><strong>A</strong>: é a área do polígono.</li>
              <li><strong>n</strong>: é o número de lados do polígono.</li>
              <li><strong>lado</strong>: é o comprimento de um lado do polígono.</li>
              <li><strong>π</strong>: é a constante pi.</li>
              <li><strong>tan</strong>: é a tangente trigonométrica.</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo de Área de Polígonos Regulares</h3>
          <p>
            <strong>Exemplo 1:</strong> Calcule a área de um hexágono regular com lado de 5 unidades.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos polígonos regulares: <em>A = (6 * 5²) / (4 * tan(π / 6))</em>.
            <br />
            A área do hexágono será de <em>{calcularAreaPoligonoRegular(5, 6).toFixed(2)}</em> unidades².
          </p>
          <p>
            <strong>Exemplo 2:</strong> Calcule a área de um octógono regular com lado de 8 unidades.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos polígonos regulares: <em>A = (8 * 8²) / (4 * tan(π / 8))</em>.
            <br />
            A área do octógono será de <em>{calcularAreaPoligonoRegular(8, 8).toFixed(2)}</em> unidades².
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraAreaPoligonoRegular;
