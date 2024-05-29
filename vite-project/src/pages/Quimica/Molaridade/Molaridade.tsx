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

interface ResultadoMolaridade {
  valor: number;
}

const calcularMolaridade = (quantidadeSoluto: number, volumeSolucao: number): { molaridade: number } => {
  const molaridadeCalculada = quantidadeSoluto / volumeSolucao;
  return { molaridade: molaridadeCalculada };
};

const calcularQuantidadeSoluto = (molaridade: number, volumeSolucao: number): { quantidadeSoluto: number } => {
  const quantidadeSolutoCalculada = molaridade * volumeSolucao;
  return { quantidadeSoluto: quantidadeSolutoCalculada };
};

const calcularVolumeSolucao = (quantidadeSoluto: number, molaridade: number): { volumeSolucao: number } => {
  const volumeSolucaoCalculado = quantidadeSoluto / molaridade;
  return { volumeSolucao: volumeSolucaoCalculado };
};

const CalculadoraMolaridade: React.FC = () => {
  const [calculo, setCalculo] = useState<string>('molaridade');
  const [quantidadeSoluto, setQuantidadeSoluto] = useState<string>('');
  const [volumeSolucao, setVolumeSolucao] = useState<string>('');
  const [molaridade, setMolaridade] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoMolaridade | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const quantidadeSolutoNum = parseFloat(quantidadeSoluto);
    const volumeSolucaoNum = parseFloat(volumeSolucao);
    const molaridadeNum = parseFloat(molaridade);

    if (calculo === 'molaridade') {
      if (isNaN(quantidadeSolutoNum) || isNaN(volumeSolucaoNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de soluto e o volume da solução.');
        return;
      }
      const resultadoCalculado = calcularMolaridade(quantidadeSolutoNum, volumeSolucaoNum);
      setResultado({ valor: resultadoCalculado.molaridade });
    } else if (calculo === 'quantidadeSoluto') {
      if (isNaN(molaridadeNum) || isNaN(volumeSolucaoNum)) {
        setResultado('Por favor, insira valores válidos para a molaridade e o volume da solução.');
        return;
      }
      const resultadoCalculado = calcularQuantidadeSoluto(molaridadeNum, volumeSolucaoNum);
      setResultado({ valor: resultadoCalculado.quantidadeSoluto });
    } else if (calculo === 'volumeSolucao') {
      if (isNaN(quantidadeSolutoNum) || isNaN(molaridadeNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de soluto e a molaridade.');
        return;
      }
      const resultadoCalculado = calcularVolumeSolucao(quantidadeSolutoNum, molaridadeNum);
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
                  value="molaridade"
                  checked={calculo === 'molaridade'}
                  onChange={() => setCalculo('molaridade')}
                />
                Molaridade
              </label>
              <label>
                <input
                  type="radio"
                  value="quantidadeSoluto"
                  checked={calculo === 'quantidadeSoluto'}
                  onChange={() => setCalculo('quantidadeSoluto')}
                />
                Quantidade de Soluto (mol)
              </label>
              <label>
                <input
                  type="radio"
                  value="volumeSolucao"
                  checked={calculo === 'volumeSolucao'}
                  onChange={() => setCalculo('volumeSolucao')}
                />
                Volume da Solução (L)
              </label>
            </RadioGroup>
          </InputGroup>
          {calculo !== 'quantidadeSoluto' && (
            <InputGroup>
              <label>Quantidade de Soluto (mol):</label>
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
          {calculo !== 'molaridade' && (
            <InputGroup>
              <label>Molaridade (mol/L):</label>
              <StyledInput
                type="number"
                value={molaridade}
                onChange={(e) => setMolaridade(e.target.value)}
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
          <h3>Explicação da Molaridade</h3>
          <p>
            A molaridade é uma medida da concentração de um soluto em uma solução. É definida como o número de moles do soluto por litro de solução.
          </p>
          <p>
            A fórmula para calcular a molaridade é: <strong>M = n / V</strong>, onde:
            <ul>
              <li><strong>M</strong>: Molaridade em mol/L.</li>
              <li><strong>n</strong>: Quantidade de soluto em mol.</li>
              <li><strong>V</strong>: Volume da solução em litros.</li>
              </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo da Molaridade</h3>
          <p>
            <strong>Exemplo 1:</strong> Qual é a molaridade de uma solução que contém 0.5 mol de soluto em 1 litro de solução?
            <br />
            <strong>Solução:</strong> Usando a fórmula da molaridade: <em>M = 0.5 mol / 1 L</em> = 0.5 mol/L.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Qual é a quantidade de soluto necessária para fazer uma solução de 1 mol/L em 2 litros de solução?
            <br />
            <strong>Solução:</strong> Usando a fórmula da quantidade de soluto: <em>n = M * V</em> ⟹ <em>n = 1 mol/L * 2 L</em> = 2 mol.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraMolaridade;
