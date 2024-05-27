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

 

const calcularMontante = (capital: number, taxa: number, periodo: number): number => {
  return capital * Math.pow((1 + taxa / 100), periodo);
};

const CalculadoraJurosCompostos: React.FC = () => {
  const [capital, setCapital] = useState<string>('');
  const [taxa, setTaxa] = useState<string>('');
  const [periodo, setPeriodo] = useState<string>('');
  const [resultado, setResultado] = useState<number | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const capitalNum = parseFloat(capital);
    const taxaNum = parseFloat(taxa);
    const periodoNum = parseFloat(periodo);

    if (isNaN(capitalNum) || isNaN(taxaNum) || isNaN(periodoNum)) {
      setResultado('Por favor, insira valores válidos para capital, taxa e período.');
    } else {
      const montante = calcularMontante(capitalNum, taxaNum, periodoNum);
      setResultado(montante);
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Capital:</label>
            <StyledInput
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Taxa de juros (% ao mês):</label>
            <StyledInput
              type="number"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Período (meses):</label>
            <StyledInput
              type="number"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
            />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado !== null && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>Montante = {resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>Montante = {resultado.toFixed(2)}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação de Juros Compostos</h3>
          <p>
            Juros compostos são calculados sobre o montante acumulado ao longo do tempo, ou seja, os juros de cada período são somados ao capital inicial para calcular os juros do próximo período.
          </p>
          <p>
            A fórmula dos juros compostos é dada por: <em>M = C * (1 + i)^n</em>, onde:
            <ul>
              <li><strong>M</strong>: é o montante total após o período n.</li>
              <li><strong>C</strong>: é o capital inicial.</li>
              <li><strong>i</strong>: é a taxa de juros por período, em forma decimal.</li>
              <li><strong>n</strong>: é o número de períodos.</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo de Juros Compostos</h3>
          <p>
            <strong>Exemplo 1:</strong> Calcule o montante acumulado ao investir R$ 1000,00 a uma taxa de juros mensal de 1.5% durante 12 meses.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos juros compostos: <em>M = 1000 * (1 + 0.015)^12</em>.
            <br />
            O montante acumulado será de <em>R$ {calcularMontante(1000, 1.5, 12).toFixed(2)}</em>.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Calcule o montante final de um empréstimo de R$ 500,00 com taxa de juros mensal de 2.0% durante 24 meses.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos juros compostos: <em>M = 500 * (1 + 0.02)^24</em>.
            <br />
            O montante acumulado será de <em>R$ {calcularMontante(500, 2, 24).toFixed(2)}</em>.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraJurosCompostos;
