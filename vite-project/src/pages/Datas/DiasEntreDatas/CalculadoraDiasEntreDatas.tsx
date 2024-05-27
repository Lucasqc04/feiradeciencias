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

const CalculadoraDiasEntreDatas: React.FC = () => {
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [resultado, setResultado] = useState<number | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcularDiasEntreDatas = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataFim);

    if (isNaN(dataInicioObj.getTime()) || isNaN(dataFimObj.getTime())) {
      setResultado('Por favor, insira datas válidas.');
    } else {
      const diferencaTempo = Math.abs(dataFimObj.getTime() - dataInicioObj.getTime());
      const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
      setResultado(diferencaDias);
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcularDiasEntreDatas}>
          <InputGroup>
            <label>Data de Início:</label>
            <StyledInput
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Data de Fim:</label>
            <StyledInput
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
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
              <ResultadoTexto>{`Dias entre as datas: ${resultado}`}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Como Funciona:</h3>
          <p>
            Esta calculadora permite calcular a diferença em dias entre duas datas fornecidas.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Uso:</h3>
          <p>
            <strong>Planejamento de Viagem:</strong> Determinar o número de dias entre a data de partida e a data de retorno em uma viagem.
          </p>
          <p>
            <strong>Prazos de Projeto:</strong> Calcular o número de dias disponíveis entre a data atual e o prazo final de um projeto.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraDiasEntreDatas;
