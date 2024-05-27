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

 

const calcularMontanteJurosSimples = (capital: number, taxa: number, periodo: number): number => {
  return capital + (capital * taxa * periodo) / 100;
};

const CalculadoraJurosSimples: React.FC = () => {
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
      const montante = calcularMontanteJurosSimples(capitalNum, taxaNum, periodoNum);
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
          <h3>Explicação de Juros Simples</h3>
          <p>
            Juros simples são calculados apenas sobre o capital inicial ao longo do tempo, sem levar em conta os juros acumulados.
          </p>
          <p>
            A fórmula dos juros simples é dada por: <em>M = C + (C * i * n)</em>, onde:
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
          <h3>Exemplos de Cálculo de Juros Simples</h3>
          <p>
            <strong>Exemplo 1:</strong> Calcule o montante acumulado ao investir R$ 1000,00 a uma taxa de juros mensal de 1.5% durante 12 meses.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos juros simples: <em>M = 1000 + (1000 * 0.015 * 12)</em>.
            <br />
            O montante acumulado será de <em>R$ {calcularMontanteJurosSimples(1000, 1.5, 12).toFixed(2)}</em>.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Calcule o montante final de um empréstimo de R$ 500,00 com taxa de juros mensal de 2.0% durante 24 meses.
            <br />
            <strong>Solução:</strong> Utilizando a fórmula dos juros simples: <em>M = 500 + (500 * 0.02 * 24)</em>.
            <br />
            O montante acumulado será de <em>R$ {calcularMontanteJurosSimples(500, 2, 24).toFixed(2)}</em>.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraJurosSimples;
