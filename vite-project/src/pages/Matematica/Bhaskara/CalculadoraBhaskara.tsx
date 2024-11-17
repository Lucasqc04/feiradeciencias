import React, { useState, FormEvent, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  ResultadoContainer,
  ResultadoTexto,
  Container,
  FormContainer,
  InputGroup,
  StyledInput,
  CenteredButton,
  Explicacao,
  Exemplos,
  Toggle
} from "../../../ui/Styles/input/input.styles";

// Importando os componentes necessários do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Função de cálculo específica para Bhaskara
const calcularBhaskara = (a: number, b: number, c: number) => {
  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    return { x1: "Não existem raízes reais", x2: "Não existem raízes reais", delta };
  } else {
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    return { x1, x2, delta };
  }
};

const gerarDadosGrafico = (a: number, b: number, c: number) => {
  const pontosX = Array.from({ length: 41 }, (_, i) => i - 20); // Gera valores de -20 a 20
  const pontosY = pontosX.map((x) => a * x * x + b * x + c); // Calcula os valores de Y para cada X

  // Encontrar os valores máximo e mínimo de Y para ajustar a escala
  const maxY = Math.max(...pontosY);
  const minY = Math.min(...pontosY);

  // Ajustar a margem superior e inferior para garantir que o gráfico não fique muito "apertado"
  const intervaloY = Math.max(Math.abs(maxY), Math.abs(minY)) + 10;

  // Ajuste dinâmico da escala do eixo Y
  const escalaY = {
    min: minY - intervaloY * 0.1,  // Reduz um pouco o valor mínimo para dar mais espaço
    max: maxY + intervaloY * 0.1   // Aumenta um pouco o valor máximo para dar mais espaço
  };

  return {
    labels: pontosX,
    datasets: [
      {
        label: "Parábola (ax² + bx + c)",
        data: pontosY,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2,
        fill: true
      }
    ],
    options: {
      scales: {
        y: {
          min: escalaY.min,
          max: escalaY.max,
          ticks: {
            stepSize: Math.max(1, Math.abs((escalaY.max - escalaY.min) / 10)) // Controla o intervalo das marcações no eixo Y
          }
        }
      }
    }
  };
};

const CalculadoraBhaskara: React.FC = () => {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [resultado, setResultado] = useState<any | null>(null);
  const [dadosGrafico, setDadosGrafico] = useState<any | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  useEffect(() => {
    // Inicializa o gráfico vazio ao carregar a página
    setDadosGrafico(null);
  }, []);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResultado("Por favor, insira valores numéricos para os coeficientes.");
      setDadosGrafico(null);
      return;
    }

    if (aNum === 0) {
      setResultado('O coeficiente "a" não pode ser igual a zero.');
      setDadosGrafico(null);
      return;
    }

    const resultadoCalculado = calcularBhaskara(aNum, bNum, cNum);
    setResultado(resultadoCalculado);

    const novosDadosGrafico = gerarDadosGrafico(aNum, bNum, cNum);
    setDadosGrafico(novosDadosGrafico);
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
            {typeof resultado.x1 === "string" ? (
              <ResultadoTexto>{resultado.x1}</ResultadoTexto>
            ) : (
              <div>
                <ResultadoTexto>x1 = {resultado.x1}</ResultadoTexto>
                <ResultadoTexto>x2 = {resultado.x2}</ResultadoTexto>
              </div>
            )}
          </ResultadoContainer>
        )}
        {dadosGrafico && (
          <div>
            <h3>Gráfico da Equação</h3>
            <Line data={dadosGrafico} />
          </div>
        )}
        
        <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>
          Mostrar Explicação
        </Toggle>
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

        <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>
          Mostrar Exemplos
        </Toggle>
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
      </FormContainer>
    </Container>
  );
};

export default CalculadoraBhaskara;
