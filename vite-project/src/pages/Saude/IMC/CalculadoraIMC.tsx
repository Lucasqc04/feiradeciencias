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

const CalculadoraIMC: React.FC = () => {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<number | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcularIMC = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setResultado('Por favor, insira valores válidos para peso e altura.');
    } else {
      const imc = pesoNum / Math.pow(alturaNum, 2);
      setResultado(imc);
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcularIMC}>
          <InputGroup>
            <label>Peso (kg):</label>
            <StyledInput
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Altura (m):</label>
            <StyledInput
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
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
              <ResultadoTexto>{`Seu IMC é: ${resultado.toFixed(2)}`}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Como Funciona:</h3>
          <p>
            Esta calculadora calcula o IMC (Índice de Massa Corporal) com base no peso e altura fornecidos.
            O IMC é uma medida amplamente utilizada para avaliar se uma pessoa tem um peso saudável em relação à sua altura.
            <br/>
            resultados menores que 16 — magreza grave;
            <br/>
resultados entre 16 e 16,9 — magreza moderada;
<br/>
resultados entre 17 e 18,5 — magreza leve;
<br/>
resultados entre 18,6 e 24,9 — peso ideal;
<br/>
resultados entre 25 e 29,9 — sobrepeso;
<br/>
resultados entre 30 e 34,9 — obesidade grau I;
<br/>
resultados entre 35 e 39,9 — obesidade grau II ou severa;
<br/>
resultados maiores do que 40 — obesidade grau III ou mórbida.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Uso:</h3>
          <p>
            <strong>Avaliação de Saúde:</strong> Determinar o IMC para avaliar a saúde e o risco de doenças relacionadas ao peso.
          </p>
          <p>
            <strong>Acompanhamento de Fitness:</strong> Monitorar as mudanças no IMC ao longo do tempo como parte de um programa de condicionamento físico.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraIMC;
