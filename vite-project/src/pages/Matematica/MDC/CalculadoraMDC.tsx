import React, { useState, FormEvent } from 'react';

import {
    ResultadoContainer,
    ResultadoTexto,
    Container,
    FormContainer,
    InputGroup,
    StyledInput,
    CenteredButton,
    RadioGroup,
    Toggle,
    Explicacao,
    Exemplos
  } from '../../../ui/Styles/input/input.styles';
 
interface ResultadoMDC {
  mdc: number;
}
 
const CalculadoraMDC: React.FC = () => {
  const [quantidadeNumeros, setQuantidadeNumeros] = useState<number>(2);
  const [valores, setValores] = useState<string[]>(Array(5).fill(''));
  const [resultado, setResultado] = useState<ResultadoMDC | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);
 
  const calcular = (e: FormEvent) => {
    e.preventDefault();
 
    const numeros = valores.slice(0, quantidadeNumeros).map(Number);
    if (numeros.some(isNaN) || numeros.some(n => n <= 0)) {
      setResultado('Todos os valores devem ser números inteiros positivos.');
      return;
    }
 
    const mdc = numeros.reduce((acc, curr) => calcularMDC(acc, curr));
    setResultado({ mdc });
  };
 
  const calcularMDC = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
 
  const handleValorChange = (index: number, value: string) => {
    const newValues = [...valores];
    newValues[index] = value;
    setValores(newValues);
  };
 
  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Quantidade de Números:</label>
            <RadioGroup>
              {[2, 3, 4, 5].map(num => (
                <label key={num}>
                  <input
                    type="radio"
                    value={num}
                    checked={quantidadeNumeros === num}
                    onChange={() => setQuantidadeNumeros(num)}
                  />
                  {num}
                </label>
              ))}
            </RadioGroup>
          </InputGroup>
          {[...Array(quantidadeNumeros)].map((_, index) => (
            <InputGroup key={index}>
              <label>Valor {index + 1}:</label>
              <StyledInput
                type="number"
                value={valores[index]}
                onChange={(e) => handleValorChange(index, e.target.value)}
                required
              />
            </InputGroup>
          ))}
          <CenteredButton type="submit">Calcular MDC</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>MDC:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>{resultado.mdc}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Máximo Divisor Comum (MDC)</h3>
          <p>
            O Máximo Divisor Comum (MDC) de dois ou mais números é o maior número que divide todos eles sem deixar resto. O MDC pode ser encontrado usando o algoritmo de Euclides.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando o Máximo Divisor Comum (MDC)</h3>
          <p>
            <strong>Exemplo 1:</strong> Encontre o MDC de 48 e 18.
            <br />
            <strong>Solução:</strong> Os divisores de 48 são 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. Os divisores de 18 são 1, 2, 3, 6, 9, 18. O maior número comum a ambos é 6, então o MDC de 48 e 18 é 6.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Qual é o MDC de 56 e 98?
            <br />
            <strong>Solução:</strong> Os divisores de 56 são 1, 2, 4, 7, 8, 14, 28, 56. Os divisores de 98 são 1, 2, 7, 14, 49, 98. O maior número comum a ambos é 14, então o MDC de 56 e 98 é 14.
          </p>
          <p>
            <strong>Exemplo 3:</strong> Três irmãos têm respectivamente 24, 36 e 60 brinquedos cada um. Eles desejam distribuir seus brinquedos em caixas, de forma que cada caixa contenha a mesma quantidade de brinquedos e nenhum brinquedo fique de fora. Qual é o maior número de brinquedos que podem ser colocados em cada caixa?
            <br />
            <strong>Solução:</strong> O problema é equivalente a encontrar o MDC de 24, 36 e 60. Os divisores de 24 são 1, 2, 3, 4, 6, 8, 12, 24. Os divisores de 36 são 1, 2, 3, 4, 6, 9, 12, 18, 36. Os divisores de 60 são 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60. O maior número comum a todos é 12, então o MDC de 24, 36 e 60 é 12. Assim, o maior número de brinquedos em cada caixa é 12.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};
 
export default CalculadoraMDC;