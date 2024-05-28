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

 
interface ResultadoBhaskara {
  x1: number | string;
  x2: number | string;
}

// Função de cálculo específica para Bhaskara
const calcularBhaskara = (a: number, b: number, c: number): ResultadoBhaskara => {
  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    return { x1: 'Não existem raízes reais', x2: 'Não existem raízes reais' };
  } else {
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    return { x1, x2 };
  }
};

const CalculadoraBhaskara: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoBhaskara | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResultado('Por favor, insira valores numéricos para os coeficientes.');
      return;
    }

    if (aNum === 0) {
      setResultado('O coeficiente "a" não pode ser igual a zero.');
      return;
    }

    const resultadoCalculado = calcularBhaskara(aNum, bNum, cNum);
    setResultado(resultadoCalculado);
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Coeficiente "a":</label>
            <StyledInput
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Coeficiente "b":</label>
            <StyledInput
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Coeficiente "c":</label>
            <StyledInput
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              required
            />
          </InputGroup>
          <CenteredButton type="submit">Calcular Raízes de Bhaskara</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Raízes de Bhaskara:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <div>
                <ResultadoTexto>x1 = {resultado.x1}</ResultadoTexto>
                <ResultadoTexto>x2 = {resultado.x2}</ResultadoTexto>
              </div>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação de Bhaskara</h3>
          <p>
            A fórmula de Bhaskara é utilizada para encontrar as raízes de uma equação do segundo grau do tipo ax² + bx + c = 0,
            onde "a", "b" e "c" são os coeficientes da equação.
          </p>
          <p>
            A fórmula de Bhaskara é: x = (-b ± √(b² - 4ac)) / (2a)
          </p>
        </Explicacao>
      )}
    <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
{mostrarExemplos && (
  <Exemplos>
    <h3>Exemplo de Cálculo de Bhaskara</h3>
    <p>
      <strong>Exemplo:</strong> Uma empresa de construção está projetando um telhado para um novo edifício. A forma do telhado é triangular e eles precisam determinar o comprimento da base do triângulo. Eles sabem que dois lados do triângulo têm o mesmo comprimento de 8 metros e que a área do telhado deve ser de 48 metros quadrados. Calcule o comprimento da base do triângulo.
      <br />
      <strong>Solução:</strong> Para resolver esse problema, podemos usar a fórmula de Bhaskara para encontrar o comprimento da base do triângulo. Vamos denotar o comprimento da base como x. Sabemos que a área de um triângulo é dada por A = (base * altura) / 2. Substituindo os valores conhecidos na fórmula da área, obtemos a seguinte equação quadrática: 48 = (x * 8) / 2. Simplificando, temos x² - 8x + 48 = 0. Agora podemos usar a fórmula de Bhaskara para encontrar os valores de x.
      <br />
      <strong>Passo a Passo:</strong>
      <br />
      1. Escreva a equação quadrática que representa o problema: x² - 8x + 48 = 0.
      <br />
      2. Identifique os coeficientes da equação: a = 1, b = -8, c = 48.
      <br />
      3. Use a fórmula de Bhaskara para encontrar as raízes da equação: x = (-b ± √(b² - 4ac)) / (2a).
      <br />
      4. Substitua os valores de a, b e c na fórmula e resolva para x.
      <br />
      5. Obtenha os valores de x e determine o comprimento da base do triângulo.
    </p>
    <p>
      <strong>Cálculo:</strong>
      <br />
      a = 1, b = -8, c = 48.
      <br />
      Aplicando a fórmula de Bhaskara: x = (-(-8) ± √((-8)² - 4*1*48)) / (2*1).
      <br />
      x = (8 ± √(64 - 192)) / 2.
      <br />
      x = (8 ± √(-128)) / 2.
      <br />
      Como o discriminante é negativo, não existem raízes reais. Portanto, não é possível construir o telhado com os parâmetros fornecidos.
    </p>
  </Exemplos>
)}

    </Container>
  );
};

export default CalculadoraBhaskara;
