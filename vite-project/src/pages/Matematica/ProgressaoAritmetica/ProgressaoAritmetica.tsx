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
  RadioGroup
} from '../../../ui/Styles/input/input.styles';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interface para o resultado da PA
interface ResultadoPA {
  valor: number;
}

// Função para calcular a PA
const calcularPA = (primeiroTermo: number, razao: number, numeroTermo: number): { termoGeral: number } => {
  const termoGeralCalculado = primeiroTermo + (numeroTermo - 1) * razao;
  return { termoGeral: termoGeralCalculado };
};

const CalculadoraProgressaoAritmetica: React.FC = () => {
  const [calculo, setCalculo] = useState<string>('termoGeral');
  const [primeiroTermo, setPrimeiroTermo] = useState<string>('');
  const [razao, setRazao] = useState<string>('');
  const [numeroTermo, setNumeroTermo] = useState<string>('');
  const [termoGeral, setTermoGeral] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoPA | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const validarInputs = (primeiroTermoNum: number, razaoNum: number, numeroTermoNum: number, termoGeralNum: number) => {
    if (calculo === 'termoGeral' && (isNaN(primeiroTermoNum) || isNaN(razaoNum) || isNaN(numeroTermoNum))) {
      return 'Por favor, insira valores válidos para o primeiro termo, a razão e o número do termo.';
    }
    if (calculo === 'primeiroTermo' && (isNaN(termoGeralNum) || isNaN(razaoNum) || isNaN(numeroTermoNum))) {
      return 'Por favor, insira valores válidos para o termo geral, a razão e o número do termo.';
    }
    if (calculo === 'razao' && (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(numeroTermoNum))) {
      return 'Por favor, insira valores válidos para o termo geral, o primeiro termo e o número do termo.';
    }
    if (calculo === 'numeroTermo' && (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(razaoNum))) {
      return 'Por favor, insira valores válidos para o termo geral, o primeiro termo e a razão.';
    }
    return '';
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const primeiroTermoNum = parseFloat(primeiroTermo);
    const razaoNum = parseFloat(razao);
    const numeroTermoNum = parseFloat(numeroTermo);
    const termoGeralNum = parseFloat(termoGeral);

    const erro = validarInputs(primeiroTermoNum, razaoNum, numeroTermoNum, termoGeralNum);
    if (erro) {
      setResultado(erro);
      return;
    }

    let resultadoCalculado;
    switch (calculo) {
      case 'termoGeral':
        resultadoCalculado = calcularPA(primeiroTermoNum, razaoNum, numeroTermoNum);
        setResultado({ valor: resultadoCalculado.termoGeral });
        break;
      case 'primeiroTermo':
        const primeiroTermoCalculado = termoGeralNum - (numeroTermoNum - 1) * razaoNum;
        setResultado({ valor: primeiroTermoCalculado });
        break;
      case 'razao':
        const razaoCalculada = (termoGeralNum - primeiroTermoNum) / (numeroTermoNum - 1);
        setResultado({ valor: razaoCalculada });
        break;
      case 'numeroTermo':
        const numeroTermoCalculado = (termoGeralNum - primeiroTermoNum) / razaoNum + 1;
        setResultado({ valor: numeroTermoCalculado });
        break;
      default:
        setResultado('Erro ao calcular.');
        break;
    }
  };

  // Função para gerar dados do gráfico
  const gerarGrafico = (primeiroTermoNum: number, razaoNum: number, numeroTermoNum: number) => {
    const termos = Array.from({ length: numeroTermoNum }, (_, index) => primeiroTermoNum + index * razaoNum);
    const labels = Array.from({ length: numeroTermoNum }, (_, index) => index + 1);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Termos da PA',
          data: termos,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Calcular:</label>
            <hr />
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  value="termoGeral"
                  checked={calculo === 'termoGeral'}
                  onChange={() => setCalculo('termoGeral')}
                />
                Termo Geral
              </label>
              <label>
                <input
                  type="radio"
                  value="primeiroTermo"
                  checked={calculo === 'primeiroTermo'}
                  onChange={() => setCalculo('primeiroTermo')}
                />
                Primeiro Termo
              </label>
              <label>
                <input
                  type="radio"
                  value="razao"
                  checked={calculo === 'razao'}
                  onChange={() => setCalculo('razao')}
                />
                Razão
              </label>
              <label>
                <input
                  type="radio"
                  value="numeroTermo"
                  checked={calculo === 'numeroTermo'}
                  onChange={() => setCalculo('numeroTermo')}
                />
                Número do Termo
              </label>
            </RadioGroup>
            <hr />
          </InputGroup>

          {['primeiroTermo', 'razao', 'numeroTermo', 'termoGeral'].map((campo) => {
            if (calculo !== campo) {
              return (
                <InputGroup key={campo}>
                  <label>{campo === 'primeiroTermo' ? 'Primeiro Termo' : campo === 'razao' ? 'Razão' : campo === 'numeroTermo' ? 'Número do Termo' : 'Termo Geral'}:</label>
                  <StyledInput
                    type="number"
                    value={campo === 'primeiroTermo' ? primeiroTermo : campo === 'razao' ? razao : campo === 'numeroTermo' ? numeroTermo : termoGeral}
                    onChange={(e) => {
                      if (campo === 'primeiroTermo') setPrimeiroTermo(e.target.value);
                      if (campo === 'razao') setRazao(e.target.value);
                      if (campo === 'numeroTermo') setNumeroTermo(e.target.value);
                      if (campo === 'termoGeral') setTermoGeral(e.target.value);
                    }}
                    required
                  />
                </InputGroup>
              );
            }
            return null;
          })}
          
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>

        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>{resultado.valor.toFixed(2)}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>

      {resultado && typeof resultado !== 'string' && (
        <div>
          <h3>Gráfico da PA</h3>
          <Line data={gerarGrafico(parseFloat(primeiroTermo), parseFloat(razao), parseFloat(numeroTermo))} />
        </div>
      )}

      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação sobre Progressão Aritmética (PA)</h3>
          <p>
            A Progressão Aritmética (PA) é uma sequência de números em que a diferença entre termos consecutivos é sempre a mesma, chamada de razão (r).
          </p>
          <ul>
            <li><strong>a<sub>1</sub></strong>: Primeiro termo da PA.</li>
            <li><strong>r</strong>: Razão da PA.</li>
            <li><strong>n</strong>: Número do termo desejado.</li>
            <li><strong>a<sub>n</sub></strong>: Termo geral da PA.</li>
          </ul>
        </Explicacao>
      )}

      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo do Termo Geral da PA</h3>
          <p>
            <strong>Exemplo 1:</strong> Em uma PA com primeiro termo 2 e razão 3, qual é o 6º termo?<br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>a<sub>6</sub> = 2 + (6 - 1) * 3</em> = 2 + 15 = 17.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraProgressaoAritmetica;
