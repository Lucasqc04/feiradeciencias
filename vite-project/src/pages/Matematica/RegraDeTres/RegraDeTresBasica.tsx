import React, { useState, FormEvent } from 'react';
import styled  from 'styled-components';

interface ResultadoRegraDeTres {
  valorX: number;
}

const CalculadoraRegraDeTres: React.FC = () => {
  const [valorA, setValorA] = useState<string>('');
  const [valorB, setValorB] = useState<string>('');
  const [valorC, setValorC] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoRegraDeTres | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const A = parseFloat(valorA);
    const B = parseFloat(valorB);
    const C = parseFloat(valorC);

    if (isNaN(A) || isNaN(B) || isNaN(C) || A <= 0 || B <= 0 || C <= 0) {
      setResultado('Os valores devem ser números positivos.');
      return;
    }

    const X = (B * C) / A;
    setResultado({ valorX: X });
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <FractionContainer>
            <InputGroup>
              <StyledInput type="number" value={valorA} onChange={(e) => setValorA(e.target.value)} required />
              <FractionLine />
              <StyledInput type="number" value={valorB} onChange={(e) => setValorB(e.target.value)} required />
            </InputGroup>
            <EqualsSign>=</EqualsSign>
            <InputGroup>
              <StyledInput type="number" value={valorC} onChange={(e) => setValorC(e.target.value)} required />
              <FractionLine />
              <StyledPlaceholder>X</StyledPlaceholder>
            </InputGroup>
          </FractionContainer>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : (
              <ResultadoTexto>
                Valor X: {resultado.valorX.toFixed(2)}
              </ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação da Regra de Três</h3>
          <p>
            A regra de três é uma técnica matemática usada para resolver problemas de proporcionalidade entre
            três valores conhecidos e um valor desconhecido. A fórmula básica é:
          </p>
          <p>
            <strong>A / B = C / X</strong>
          </p>
          <p>
            Onde A, B e C são valores conhecidos e X é o valor que queremos descobrir.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando a Regra de Três</h3>
          <p>
            <strong>Exemplo 1:</strong> Se 4 maçãs custam 2 reais, quanto custarão 10 maçãs?
            <br />
            <strong>Solução:</strong> Aplicando a regra de três, temos: 4 / 2 = 10 / X. Portanto, X = (10 * 2) / 4 = 5 reais.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Um carro percorre 150 km com 10 litros de combustível. Quantos litros serão necessários para percorrer 300 km?
            <br />
            <strong>Solução:</strong> Aplicando a regra de três, temos: 150 / 10 = 300 / X. Portanto, X = (300 * 10) / 150 = 20 litros.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraRegraDeTres;

const ResultadoContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 2px solid ${(props) => props.theme.linkColor};
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 90%;
  margin-left: 5%;
`;

const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20%;
  margin-top: 5%;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 90%;
`;

const FractionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 80px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.linkColor};
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

const FractionLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.linkColor};
  margin: 5px 0;
`;

const StyledPlaceholder = styled.div`
  height: 40px;
  width: 80px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.linkColor};
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EqualsSign = styled.div`
  font-size: 24px;
  margin: 0 20px;
  color: ${(props) => props.theme.textColor};
`;

const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.linkColor};
  color: ${(props) => props.theme.backgroundColor};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.linkHoverColor};
  }
`;

const Toggle = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.3s ease;
  margin-bottom: 2%;

  &:hover {
    background-color: ${(props) => props.theme.linkHoverColor};
  }
`;

const Explicacao = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
`;

const Exemplos = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 5px;
  padding: 10px;
  width: 90%;
`;
