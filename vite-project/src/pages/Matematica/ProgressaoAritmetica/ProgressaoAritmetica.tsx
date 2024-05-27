 
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
 
// Interface específica para o resultado da PA
interface ResultadoPA {
  valor: number;
}
 
// Função de cálculo específica para a PA
const calcularPA = (primeiroTermo: number, razao: number, numeroTermo: number): { termoGeral: number } => {
  // Calcula o termo geral da PA
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
 
  const calcular = (e: FormEvent) => {
    e.preventDefault();
 
    const primeiroTermoNum = parseFloat(primeiroTermo);
    const razaoNum = parseFloat(razao);
    const numeroTermoNum = parseFloat(numeroTermo);
    const termoGeralNum = parseFloat(termoGeral);
 
    if (calculo === 'termoGeral') {
      if (isNaN(primeiroTermoNum) || isNaN(razaoNum) || isNaN(numeroTermoNum)) {
        setResultado('Por favor, insira valores válidos para o primeiro termo, a razão e o número do termo.');
        return;
      }
      const resultadoCalculado = calcularPA(primeiroTermoNum, razaoNum, numeroTermoNum);
      setResultado({ valor: resultadoCalculado.termoGeral });
    } else if (calculo === 'primeiroTermo') {
      if (isNaN(termoGeralNum) || isNaN(razaoNum) || isNaN(numeroTermoNum)) {
        setResultado('Por favor, insira valores válidos para o termo geral, a razão e o número do termo.');
        return;
      }
      const primeiroTermoCalculado = termoGeralNum - (numeroTermoNum - 1) * razaoNum;
      setResultado({ valor: primeiroTermoCalculado });
    } else if (calculo === 'razao') {
      if (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(numeroTermoNum)) {
        setResultado('Por favor, insira valores válidos para o termo geral, o primeiro termo e o número do termo.');
        return;
      }
      const razaoCalculada = (termoGeralNum - primeiroTermoNum) / (numeroTermoNum - 1);
      setResultado({ valor: razaoCalculada });
    } else if (calculo === 'numeroTermo') {
      if (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(razaoNum)) {
        setResultado('Por favor, insira valores válidos para o termo geral, o primeiro termo e a razão.');
        return;
      }
      const numeroTermoCalculado = (termoGeralNum - primeiroTermoNum) / razaoNum + 1;
      setResultado({ valor: numeroTermoCalculado });
    }
  };
 
  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Calcular:</label>
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
          </InputGroup>
          {calculo !== 'primeiroTermo' && (
            <InputGroup>
              <label>Primeiro Termo:</label>
              <StyledInput
                type="number"
                value={primeiroTermo}
                onChange={(e) => setPrimeiroTermo(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'razao' && (
            <InputGroup>
              <label>Razão:</label>
              <StyledInput
                type="number"
                value={razao}
                onChange={(e) => setRazao(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'numeroTermo' && (
            <InputGroup>
              <label>Número do Termo:</label>
              <StyledInput
                type="number"
                value={numeroTermo}
                onChange={(e) => setNumeroTermo(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'termoGeral' && (
            <InputGroup>
              <label>Termo Geral:</label>
              <StyledInput
                type="number"
                value={termoGeral}
                onChange={(e) => setTermoGeral(e.target.value)}
                required
              />
            </InputGroup>
          )}
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
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação da Progressão Aritmética (PA)</h3>
          <p>
            Uma Progressão Aritmética (PA) é uma sequência numérica em que cada termo, a partir do segundo, 
            é a soma do termo anterior com uma constante fixa chamada de razão.
          </p>
          <p>
            O termo geral de uma PA é dado pela fórmula: <strong>a<sub>n</sub> = a<sub>1</sub> + (n - 1) * r</strong>, onde:
            <ul>
              <li><strong>a<sub>1</sub></strong>: Primeiro termo da PA. (Normalmente, é o termo inicial dado na sequência)</li>
              <li><strong>r</strong>: Razão da PA. (A diferença constante entre os termos consecutivos)</li>
              <li><strong>n</strong>: Número do termo desejado. (A posição do termo na sequência)</li>
              <li><strong>a<sub>n</sub></strong>: Termo geral da PA. (O valor do termo na posição <em>n</em>)</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo do Termo Geral da PA</h3>
          <p>
            <strong>Exemplo 1:</strong> Em uma PA com primeiro termo 2 e razão 3, qual é o 6º termo?
<br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>a<sub>6</sub> = 2 + (6 - 1) * 3</em> = 2 + 15 = 17.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Em uma PA com termo geral 20 e razão 4, qual é o 5º termo?
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>a<sub>5</sub> = a<sub>1</sub> + (5 - 1) * 4</em>.
            <br />
            Precisamos encontrar o primeiro termo: <em>20 = a<sub>1</sub> + (5 - 1) * 4</em>.
            <br />
            Então, <em>20 = a<sub>1</sub> + 16</em>, logo, <em>a<sub>1</sub> = 4</em>.
            <br />
            Portanto, <em>a<sub>5</sub> = 4 + (5 - 1) * 4 = 4 + 16 = 20</em>.
          </p>
          <p>
            <strong>Exemplo 3:</strong> Qual é a razão de uma PA se o 3º termo é 15 e o 7º termo é 31?
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>a<sub>3</sub> = a<sub>1</sub> + 2r</em> e <em>a<sub>7</sub> = a<sub>1</sub> + 6r</em>.
            <br />
            Temos duas equações: 
            <br />
            1) <em>15 = a<sub>1</sub> + 2r</em>
            <br />
            2) <em>31 = a<sub>1</sub> + 6r</em>
            <br />
            Subtraindo a primeira equação da segunda: <em>31 - 15 = (a<sub>1</sub> + 6r) - (a<sub>1</sub> + 2r)</em>
            <br />
            <em>16 = 4r</em>, logo, <em>r = 4</em>.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};
 
export default CalculadoraProgressaoAritmetica;