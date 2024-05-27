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

interface ResultadoTrianguloEquilatero {
  area: number;
  perimetro: number;
}

const calcularAreaTrianguloEquilatero = (lado: number): number => {
  return (Math.sqrt(3) / 4) * lado * lado;
};

const calcularPerimetroTrianguloEquilatero = (lado: number): number => {
  return 3 * lado;
};

const CalculadoraTrianguloEquilatero: React.FC = () => {
  const [lado, setLado] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoTrianguloEquilatero | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const ladoNum = parseFloat(lado);

    if (isNaN(ladoNum) || ladoNum <= 0) {
      setResultado('Por favor, insira um valor válido para o lado do triângulo.');
    } else {
      const area = calcularAreaTrianguloEquilatero(ladoNum);
      const perimetro = calcularPerimetroTrianguloEquilatero(ladoNum);
      setResultado({ area, perimetro });
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Tamanho do lado:</label>
            <StyledInput
              type="number"
              value={lado}
              onChange={(e) => setLado(e.target.value)}
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
              <div>
                <p>Área: {resultado.area.toFixed(2)}</p>
                <p>Perímetro: {resultado.perimetro.toFixed(2)}</p>
              </div>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Triângulo Equilátero</h3>
          <p>
            Um triângulo equilátero é um triângulo com todos os lados e ângulos iguais.
          </p>
          <p>
            A área de um triângulo equilátero é dada por: <em>A = (√3 / 4) * lado²</em>.
          </p>
          <p>
            O perímetro de um triângulo equilátero é dado pela soma dos comprimentos de seus três lados: <em>P = 3 * lado</em>.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Cálculo para Triângulo Equilátero</h3>
          <p>
            <strong>Exemplo 1:</strong> Calcule a área e o perímetro de um triângulo equilátero com lado de 6 unidades.
            <br />
            <strong>Solução:</strong>
            <br />
            Área: <em>{calcularAreaTrianguloEquilatero(6).toFixed(2)}</em> unidades²
            <br />
            Perímetro: <em>{calcularPerimetroTrianguloEquilatero(6).toFixed(2)}</em> unidades
          </p>
          <p>
            <strong>Exemplo 2:</strong> Calcule a área e o perímetro de um triângulo equilátero com lado de 10 unidades.
            <br />
            <strong>Solução:</strong>
            <br />
            Área: <em>{calcularAreaTrianguloEquilatero(10).toFixed(2)}</em> unidades²
            <br />
            Perímetro: <em>{calcularPerimetroTrianguloEquilatero(10).toFixed(2)}</em> unidades
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraTrianguloEquilatero;
