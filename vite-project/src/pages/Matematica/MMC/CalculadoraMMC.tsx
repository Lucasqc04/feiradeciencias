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
 
interface ResultadoMMC {
  mmc: number;
}
 
const CalculadoraMMC: React.FC = () => {
  const [quantidadeNumeros, setQuantidadeNumeros] = useState<number>(2);
  const [valores, setValores] = useState<string[]>(Array(5).fill(''));
  const [resultado, setResultado] = useState<ResultadoMMC | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);
 
  const calcular = (e: FormEvent) => {
    e.preventDefault();
 
    const numeros = valores.slice(0, quantidadeNumeros).map(Number);
    if (numeros.some(isNaN) || numeros.some(n => n <= 0)) {
      setResultado('Todos os valores devem ser números inteiros positivos.');
      return;
    }
 
    const mmc = numeros.reduce((acc, curr) => calcularMMC(acc, curr));
    setResultado({ mmc });
  };
 
  const calcularMMC = (a: number, b: number): number => {
    let m = a;
    let n = b;
    while (n !== 0) {
      let r = m % n;
      m = n;
      n = r;
    }
    return (a * b) / m;
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
          <CenteredButton type="submit">Calcular MMC</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>MMC:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>{resultado.mmc}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Mínimo Múltiplo Comum (MMC)</h3>
          <p>
            O Mínimo Múltiplo Comum (MMC) de dois ou mais números é o menor número comum múltiplo a todos eles. Pode ser calculado usando o algoritmo de Euclides para dois números e aplicando sucessivamente para mais números.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando o Mínimo Múltiplo Comum (MMC)</h3>
          <p>
            <strong>Exemplo 1:</strong> Encontre o MMC de 12 e 18.
            <br />
            <strong>Solução:</strong> Os múltiplos de 12 são 12, 24, 36, 48, 60... e os múltiplos de 18 são 18, 36, 54, 72...
            O menor múltiplo comum a ambos é 36, então o MMC de 12 e 18 é 36.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Qual é o MMC de 8 e 10?
            <br />
            <strong>Solução:</strong> Os múltiplos de 8 são 8, 16, 24, 32, 40... e os múltiplos de 10 são 10, 20, 30, 40, 50...
            O menor múltiplo comum a ambos é 40, então o MMC de 8 e 10 é 40.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};
 
export default CalculadoraMMC;
 
 