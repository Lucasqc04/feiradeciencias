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

interface ResultadoEquacaoGases {
  valor: number;
}

const calcularPressao = (quantidadeSubstancia: number, volume: number, temperatura: number): { pressao: number } => {
  const pressaoCalculada = (quantidadeSubstancia * 0.0821 * temperatura) / volume;
  return { pressao: pressaoCalculada };
};

const calcularVolume = (quantidadeSubstancia: number, pressao: number, temperatura: number): { volume: number } => {
  const volumeCalculado = (quantidadeSubstancia * 0.0821 * temperatura) / pressao;
  return { volume: volumeCalculado };
};

const calcularQuantidadeSubstancia = (pressao: number, volume: number, temperatura: number): { quantidadeSubstancia: number } => {
  const quantidadeSubstanciaCalculada = (pressao * volume) / (0.0821 * temperatura);
  return { quantidadeSubstancia: quantidadeSubstanciaCalculada };
};

const CalculadoraEquacaoGases: React.FC = () => {
  const [calculo, setCalculo] = useState<string>('pressao');
  const [quantidadeSubstancia, setQuantidadeSubstancia] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [pressao, setPressao] = useState<string>('');
  const [temperatura, setTemperatura] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoEquacaoGases | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const quantidadeSubstanciaNum = parseFloat(quantidadeSubstancia);
    const volumeNum = parseFloat(volume);
    const pressaoNum = parseFloat(pressao);
    const temperaturaNum = parseFloat(temperatura);

    if (calculo === 'pressao') {
      if (isNaN(quantidadeSubstanciaNum) || isNaN(volumeNum) || isNaN(temperaturaNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de substância, o volume e a temperatura.');
        return;
      }
      const resultadoCalculado = calcularPressao(quantidadeSubstanciaNum, volumeNum, temperaturaNum);
      setResultado({ valor: resultadoCalculado.pressao });
    } else if (calculo === 'volume') {
      if (isNaN(quantidadeSubstanciaNum) || isNaN(pressaoNum) || isNaN(temperaturaNum)) {
        setResultado('Por favor, insira valores válidos para a quantidade de substância, a pressão e a temperatura.');
        return;
      }
      const resultadoCalculado = calcularVolume(quantidadeSubstanciaNum, pressaoNum, temperaturaNum);
      setResultado({ valor: resultadoCalculado.volume });
    } else if (calculo === 'quantidadeSubstancia') {
      if (isNaN(pressaoNum) || isNaN(volumeNum) || isNaN(temperaturaNum)) {
        setResultado('Por favor, insira valores válidos para a pressão, o volume e a temperatura.');
        return;
      }
      const resultadoCalculado = calcularQuantidadeSubstancia(pressaoNum, volumeNum, temperaturaNum);
      setResultado({ valor: resultadoCalculado.quantidadeSubstancia });
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
                  value="pressao"
                  checked={calculo === 'pressao'}
                  onChange={() => setCalculo('pressao')}
                />
                Pressão
              </label>
              <label>
                <input
                  type="radio"
                  value="volume"
                  checked={calculo === 'volume'}
                  onChange={() => setCalculo('volume')}
                />
                Volume
              </label>
              <label>
                <input
                  type="radio"
                  value="quantidadeSubstancia"
                  checked={calculo === 'quantidadeSubstancia'}
                  onChange={() => setCalculo('quantidadeSubstancia')}
                />
                Quantidade de Substância
              </label>
            </RadioGroup>
          </InputGroup>
          {calculo !== 'quantidadeSubstancia' && (
            <InputGroup>
              <label>Quantidade de Substância (mol):</label>
              <StyledInput
                type="number"
                value={quantidadeSubstancia}
                onChange={(e) => setQuantidadeSubstancia(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'volume' && (
            <InputGroup>
              <label>Volume (L):</label>
              <StyledInput
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </InputGroup>
          )}
          {calculo !== 'pressao' && (
            <InputGroup>
              <label>Pressão (atm):</label>
              <StyledInput
                type="number"
                value={pressao}
                onChange={(e) => setPressao(e.target.value)}
                required
              />
            </InputGroup>
          )}
          <InputGroup>
            <label>Temperatura (K):</label>
            <StyledInput
              type="number"
              value={temperatura}
              onChange={(e) => setTemperatura(e.target.value)}
              required
            />
          </InputGroup>
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
          <h3>Explicação da Equação Geral dos Gases</h3>
          <p>
            A equação geral dos gases é usada para calcular a pressão, o volume
 e a quantidade de substância de um gás ideal a uma determinada temperatura.
          </p>
          <p>
            A fórmula geral é: <strong>pv = nRT</strong>, onde:
            <ul>
              <li><strong>p</strong>: Pressão em atm.</li>
              <li><strong>v</strong>: Volume em litros.</li>
              <li><strong>n</strong>: Quantidade de substância em mol.</li>
              <li><strong>R</strong>: Constante dos gases (0.0821 atm * L / mol * K).</li>
              <li><strong>T</strong>: Temperatura em Kelvin (°C + 273.15).</li>
            </ul>
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo da Equação Geral dos Gases</h3>
          <p>
            <strong>Exemplo 1:</strong> Um mol de gás ocupa 22.4 litros a uma temperatura de 0°C. Qual é a pressão?
            <br />
            <strong>Solução:</strong> Usando a fórmula da pressão: <em>p = (1 mol * 0.0821 atm * L / mol * K * 273.15 K) / 22.4 L</em> ≈ 1 atm.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Em um recipiente de 5 litros, a uma pressão de 2 atm e temperatura de 27°C, quantos mols de gás estão presentes?
            <br />
            <strong>Solução:</strong> Usando a fórmula da quantidade de substância: <em>n = (2 atm * 5 L) / (0.0821 atm * L / mol * K * 300.15 K)</em> ≈ 0.41 mol.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraEquacaoGases;

