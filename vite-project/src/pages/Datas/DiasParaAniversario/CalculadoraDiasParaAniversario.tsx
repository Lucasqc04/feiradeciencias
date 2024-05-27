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

const CalculadoraDiasParaAniversario: React.FC = () => {
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [resultado, setResultado] = useState<number | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcularDiasParaAniversario = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const dataNascimentoObj = new Date(dataNascimento);
    const dataAtual = new Date();

    if (isNaN(dataNascimentoObj.getTime())) {
      setResultado('Por favor, insira uma data de nascimento válida.');
    } else {
      const anoAtual = dataAtual.getFullYear();
      const mesNascimento = dataNascimentoObj.getMonth();
      const diaNascimento = dataNascimentoObj.getDate();
      
      const proximoAniversario = new Date(anoAtual, mesNascimento, diaNascimento);
      
      if (proximoAniversario.getTime() < dataAtual.getTime()) {
        proximoAniversario.setFullYear(anoAtual + 1);
      }

      const diferencaTempo = Math.abs(proximoAniversario.getTime() - dataAtual.getTime());
      const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

      setResultado(diferencaDias);
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcularDiasParaAniversario}>
          <InputGroup>
            <label>Data de Nascimento:</label>
            <StyledInput
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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
              <ResultadoTexto>{`Dias até o próximo aniversário: ${resultado}`}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Como Funciona:</h3>
          <p>
            Esta calculadora determina quantos dias faltam para o próximo aniversário com base na data de nascimento fornecida.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Uso:</h3>
          <p>
            <strong>Contagem Regressiva para o Aniversário:</strong> Descubra quantos dias faltam para o seu próximo aniversário.
          </p>
          <p>
            <strong>Planejamento de Eventos:</strong> Calcule o número de dias até o aniversário de amigos ou familiares para planejar celebrações especiais.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraDiasParaAniversario;
