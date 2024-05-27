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
  Exemplos
} from '../../../ui/Styles/input/input.styles';

// Interface específica para o resultado do comprimento do arco
interface ResultadoComprimentoArco {
  comprimento: number;
}

// Função de cálculo específica para o comprimento do arco
const calcularComprimentoArco = (raio: number, angulo: number): ResultadoComprimentoArco => {
  // Calcula o comprimento do arco
  const comprimentoCalculado = (angulo / 360) * (2 * Math.PI * raio);
  return { comprimento: comprimentoCalculado };
};

const CalculadoraComprimentoArco: React.FC = () => {
  const [raio, setRaio] = useState<string>('');
  const [angulo, setAngulo] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoComprimentoArco | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const raioNum = parseFloat(raio);
    const anguloNum = parseFloat(angulo);

    if (isNaN(raioNum) || raioNum <= 0 || isNaN(anguloNum) || anguloNum < 0 || anguloNum > 360) {
      setResultado('O raio deve ser um número positivo e o ângulo deve estar entre 0 e 360 graus.');
      return;
    }

    const resultadoCalculado = calcularComprimentoArco(raioNum, anguloNum);
    setResultado(resultadoCalculado);
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Raio do Círculo:</label>
            <StyledInput
              type="number"
              value={raio}
              onChange={(e) => setRaio(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Ângulo Central (em graus):</label>
            <StyledInput
              type="number"
              value={angulo}
              onChange={(e) => setAngulo(e.target.value)}
              required
            />
          </InputGroup>
          <CenteredButton type="submit">Calcular Comprimento do Arco</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Comprimento do Arco:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>{resultado.comprimento.toFixed(2)}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Comprimento do Arco</h3>
          <p>
            O comprimento de um arco de círculo é a medida da curva ao longo do círculo, 
            determinada pelo ângulo central e o raio do círculo.
          </p>
          <p>
            A fórmula matemática para calcular o comprimento de um arco de círculo é:
            comprimento = (ângulo / 360) * (2 * π * raio), onde π (pi) é uma constante aproximadamente igual a 3.14159.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo do Comprimento do Arco</h3>
          <p>
            <strong>Exemplo 1:</strong> Uma roda de bicicleta tem um raio de 30 cm. Calcule o comprimento do arco que abrange um ângulo de 120 graus.
            <br />
            <strong>Solução:</strong> comprimento = (120 / 360) * (2 * π * 30) ≈ 62.83 cm.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Um pedaço de arame de 20 cm de comprimento é dobrado para formar um setor circular de ângulo 90 graus. Qual é o raio do círculo?
            <br />
            <strong>Solução:</strong> Para encontrar o raio, usamos a fórmula do comprimento do arco e isolamos o raio: raio = (comprimento / ((ângulo / 360) * 2 * π)).
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraComprimentoArco;
