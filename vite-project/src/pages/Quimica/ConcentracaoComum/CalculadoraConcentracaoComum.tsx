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

interface ResultadoConcentracao {
  valor: number;
}

const calcularConcentracao = (quantidadeSoluto: number, volumeSolucao: number): { concentracao: number } => {
  const concentracaoCalculada = quantidadeSoluto / volumeSolucao;
  return { concentracao: concentracaoCalculada };
};

const calcularQuantidadeSoluto = (concentracao: number, volumeSolucao: number): { quantidadeSoluto: number } => {
  const quantidadeSolutoCalculada = concentracao * volumeSolucao;
  return { quantidadeSoluto: quantidadeSolutoCalculada };
};

const calcularVolumeSolucao = (quantidadeSoluto: number, concentracao: number): { volumeSolucao: number } => {
  const volumeSolucaoCalculado = quantidadeSoluto / concentracao;
  return { volumeSolucao: volumeSolucaoCalculado };
};

const CalculadoraConcentracaoComum: React.FC = () => {
  const [calculo, setCalculo] = useState<string>('concentracao');
  const [quantidadeSoluto, setQuantidadeSoluto] = useState<string>('');
  const [volumeSolucao, setVolumeSolucao] = useState<string>('');
  const [concentracao, setConcentracao] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoConcentracao | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const quantidadeSolutoNum = parseFloat(quantidadeSoluto);
    const volumeSolucaoNum = parseFloat(volumeSolucao);
    const concentracaoNum = parseFloat(concentracao);

    if (calculo === 'concentracao') {
      if (isNaN(quantidadeSolutoNum) || isNaN(volumeSolucaoNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de soluto e o volume da solução.');
        return;
      }
      const resultadoCalculado = calcularConcentracao(quantidadeSolutoNum, volumeSolucaoNum);
      setResultado({ valor: resultadoCalculado.concentracao });
    } else if (calculo === 'quantidadeSoluto') {
      if (isNaN(concentracaoNum) || isNaN(volumeSolucaoNum)) {
        setResultado('Por favor, insira valores válidos para a concentração e o volume da solução.');
        return;
      }
      const resultadoCalculado = calcularQuantidadeSoluto(concentracaoNum, volumeSolucaoNum);
      setResultado({ valor: resultadoCalculado.quantidadeSoluto });
    } else if (calculo === 'volumeSolucao') {
      if (isNaN(quantidadeSolutoNum) || isNaN(concentracaoNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de soluto e a concentração.');
        return;
      }
      const resultadoCalculado = calcularVolumeSolucao(quantidadeSolutoNum, concentracaoNum);
      setResultado({ valor: resultadoCalculado.volumeSolucao });
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
        <label>Calcular:</label>
          <InputGroup>
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  value="concentracao"
                  checked={calculo === 'concentracao'}
                  onChange={() => setCalculo('concentracao')}
                />
                Concentração
              </label>
              <label>
                <input
                  type="radio"
                  value="quantidadeSoluto"
                  checked={calculo === 'quantidadeSoluto'}
                  onChange={() => setCalculo('quantidadeSoluto')}
                />
                Quantidade de Soluto
              </label>
              <label>
                <input
                  type="radio"
                  value="volumeSolucao"
                  checked={calculo === 'volumeSolucao'}
                  onChange={() => setCalculo('volumeSolucao')}
                />
                Volume da Solução
              </label>
            </RadioGroup>
          </InputGroup>
          {calculo !== 'quantidadeSoluto' && (
            <InputGroup>
              <label>Quantidade de Soluto (g):</label>
              <StyledInput
                type="number"
                value={quantidadeSoluto}
                onChange={(e) => setQuantidadeSoluto(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'volumeSolucao' && (
            <InputGroup>
              <label>Volume da Solução (L):</label>
              <StyledInput
                type="number"
                value={volumeSolucao}
                onChange={(e) => setVolumeSolucao(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'concentracao' && (
            <InputGroup>
              <label>Concentração (mol/L):</label>
              <StyledInput
                type="number"
                value={concentracao}
                onChange={(e) => setConcentracao(e.target.value)}
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
          <h3>Explicação da Concentração Comum</h3>
          <p>
            A concentração comum (ou molaridade) é a medida da quantidade de soluto presente em uma certa quantidade de solução.
          </p>
          <p>
            A fórmula para calcular a concentração é: <strong>C = n / V</strong>, onde:
            <ul>
              <li><strong>C</strong>: Concentração em mol/L.</li>
              <li><strong>n</strong>: Quantidade de soluto em mol.</li>
              <li><strong>V</strong>: Volume da solução em litros.</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo da Concentração Comum</h3>
          <p>
            <strong>Exemplo 1:</strong> Qual é a concentração de uma solução contendo 2 mol de soluto em 1 litro de solução?
            <br />
            <strong>Solução:</strong> Usando a fórmula da concentração: <em>C = 2 mol / 1 L</em> = 2 mol/L.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Qual é a quantidade de soluto necessária para obter uma solução de 0.5 mol/L em 2 litros de solução?
            <br />
            <strong>Solução:</strong> Usando a fórmula da quantidade de soluto: <em>n = C * V</em> ⟹ <em>n = 0.5 mol/L * 2 L</em> = 1 mol.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraConcentracaoComum;
