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

// Interface específica para o resultado da PG
interface ResultadoPG {
  valor: number;
}

// Função de cálculo específica para a PG
const calcularPG = (primeiroTermo: number, razao: number, numeroTermo: number, tipoCalculo: string, termoGeralNum: number): ResultadoPG => {
    switch (tipoCalculo) {
      case 'termoGeral':
        const termoGeralCalculado = primeiroTermo * Math.pow(razao, numeroTermo - 1);
        return { valor: termoGeralCalculado };
      case 'primeiroTermo':
        const primeiroTermoCalculado = termoGeralNum / Math.pow(razao, numeroTermo - 1);
        return { valor: primeiroTermoCalculado };
      case 'razao':
        const razaoCalculada = Math.pow(termoGeralNum / primeiroTermo, 1 / (numeroTermo - 1));
        return { valor: razaoCalculada };
      case 'numeroTermo':
        const numeroTermoCalculado = Math.log(termoGeralNum / primeiroTermo) / Math.log(razao) + 1;
        return { valor: numeroTermoCalculado };
      default:
        return { valor: 0 };
    }
};

const CalculadoraProgressaoGeometrica: React.FC = () => {
  const [calculo, setCalculo] = useState<string>('termoGeral');
  const [primeiroTermo, setPrimeiroTermo] = useState<string>('');
  const [razao, setRazao] = useState<string>('');
  const [numeroTermo, setNumeroTermo] = useState<string>('');
  const [termoGeral, setTermoGeral] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoPG | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null)
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    limparCampos()

    const primeiroTermoNum = parseFloat(primeiroTermo);
    const razaoNum = parseFloat(razao);
    const numeroTermoNum = parseFloat(numeroTermo);
    const termoGeralNum = parseFloat(termoGeral);

    if (calculo === 'termoGeral' && (isNaN(primeiroTermoNum) || isNaN(razaoNum) || isNaN(numeroTermoNum))) {
      setResultado('Por favor, insira valores válidos para o primeiro termo, a razão e o número do termo.');
    } else if (calculo === 'primeiroTermo' && (isNaN(termoGeralNum) || isNaN(razaoNum) || isNaN(numeroTermoNum))) {
      setResultado('Por favor, insira valores válidos para o termo geral, a razão e o número do termo.');
    } else if (calculo === 'razao' && (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(numeroTermoNum))) {
      setResultado('Por favor, insira valores válidos para o termo geral, o primeiro termo e o número do termo.');
    } else if (calculo === 'numeroTermo' && (isNaN(termoGeralNum) || isNaN(primeiroTermoNum) || isNaN(razaoNum))) {
      setResultado('Por favor, insira valores válidos para o termo geral, o primeiro termo e a razão.');
    } else {
        const resultadoCalculado = calcularPG(primeiroTermoNum, razaoNum, numeroTermoNum, calculo, termoGeralNum);


      setResultado( resultadoCalculado);
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
    onChange={() => {
      setCalculo('termoGeral');
      limparCampos(); 
    }}
  />
  Termo Geral
</label>
<label>
  <input
    type="radio"
    value="primeiroTermo"
    checked={calculo === 'primeiroTermo'}
    onChange={() => {
      setCalculo('primeiroTermo');
      limparCampos();  
    }}
  />
  Primeiro Termo
</label>
<label>
  <input
    type="radio"
    value="razao"
    checked={calculo === 'razao'}
    onChange={() => {
      setCalculo('razao');
      limparCampos();  
    }}
  />
  Razão
</label>
<label>
  <input
    type="radio"
    value="numeroTermo"
    checked={calculo === 'numeroTermo'}
    onChange={() => {
      setCalculo('numeroTermo');
      limparCampos();  
    }}
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
          <h3>Explicação da Progressão Geométrica (PG)</h3>
          <p>
            Uma Progressão Geométrica (PG) é uma sequência numérica onde cada termo, a partir do segundo, é obtido pela multiplicação do termo anterior por uma constante chamada razão.
          </p>
          <p>
            Fórmula do termo geral de uma PG: <em>a<sub>n</sub> = a<sub>1</sub> * r^(n - 1)</em>
          </p>
          <p>
            Onde:
            <ul>
              <li><strong>a<sub>n</sub></strong>: é o termo geral que você deseja encontrar.</li>
              <li><strong>a<sub>1</sub></strong>: é o primeiro termo da progressão.</li>
              <li><strong>r</strong>: é a razão da progressão.</li>
              <li><strong>n</strong>: é a posição do termo na sequência.</li>
            </ul>
          </p>
          <p>
            Geralmente, você encontra o primeiro termo e a razão a partir das condições iniciais de um problema. A posição do termo é o número de elementos a partir do início da sequência. O termo geral é o valor que você está tentando encontrar.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo da Progressão Geométrica</h3>
          <p>
            <strong>Exemplo 1:</strong> Encontre o 5º termo de uma PG onde o primeiro termo é 3 e a razão é 2.
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>a<sub>5</sub> = 3 * 2^(5 - 1) = 3 * 16 = 48</em>.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Encontre o primeiro termo de uma PG onde o 4º termo é 81 e a razão é 3.
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>81 = a<sub>1</sub> * 3^(4 - 1)</em>.
            <br />
            <em>81 = a<sub>1</sub> * 27</em>, logo, <em>a<sub>1</sub> = 81 / 27 = 3</em>.
          </p>
    
<p>
            <strong>Exemplo 3:</strong> Encontre a razão de uma PG onde o primeiro termo é 5 e o 4º termo é 40.
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>40 = 5 * r^(4 - 1)</em>.
            <br />
            <em>40 = 5 * r^3</em>, logo, <em>r^3 = 40 / 5 = 8</em> e <em>r = ³√8 = 2</em>.
          </p>
          <p>
            <strong>Exemplo 4:</strong> Encontre o número do termo de uma PG onde o primeiro termo é 2, a razão é 4, e o termo geral é 512.
            <br />
            <strong>Solução:</strong> Usando a fórmula do termo geral: <em>512 = 2 * 4^(n - 1)</em>.
            <br />
            <em>512 / 2 = 4^(n - 1)</em> resulta em <em>256 = 4^(n - 1)</em>, e aplicando logaritmo base 4: <em>log<sub>4</sub>(256) = n - 1</em>.
            <br />
            <em>4^4 = 256</em>, então <em>n - 1 = 4</em> e <em>n = 5</em>.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};
 
export default CalculadoraProgressaoGeometrica;