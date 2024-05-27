import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface ResultadoPitagoras {
  hipotenusa: number;
  catetoA: number;
  catetoB: number;
}

const CalculadoraPitagoras: React.FC = () => {
  const [valorA, setValorA] = useState<string>('');
  const [valorB, setValorB] = useState<string>('');
  const [tipoCalculo, setTipoCalculo] = useState<'doisCatetos' | 'umCatetoHipotenusa'>('doisCatetos');
  const [resultado, setResultado] = useState<ResultadoPitagoras | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const calcular = (e: FormEvent) => {
    e.preventDefault();
  
    const A = parseFloat(valorA);
    const B = parseFloat(valorB);
  
    if (isNaN(A) || isNaN(B) || A <= 0 || B <= 0) {
      setResultado('Os valores devem ser números positivos.');
      return;
    }
  
    if (tipoCalculo === 'doisCatetos') {
      const C = Math.sqrt(A * A + B * B);
      setResultado({ hipotenusa: C, catetoA: A, catetoB: B });
    } else {
      const hipotenusa = Math.max(A, B);
      const cateto = Math.min(A, B);
  
      if (hipotenusa <= cateto) {
        setResultado('A hipotenusa deve ser maior que o cateto.');
      } else {
        const outroCateto = Math.sqrt(hipotenusa * hipotenusa - cateto * cateto);
        setResultado({ hipotenusa: hipotenusa, catetoA: cateto, catetoB: outroCateto });
      }
    }
  };
  

  return (
    <Container>
      <ToggleContainer>
        <Toggle>
          <input
            type="radio"
            id="doisCatetos"
            value="doisCatetos"
            checked={tipoCalculo === 'doisCatetos'}
            onChange={() => setTipoCalculo('doisCatetos')}
          />
          <RadioLabel htmlFor="doisCatetos">Dois Catetos</RadioLabel>
        </Toggle>
        <Toggle>
          <input
            type="radio"
            id="umCatetoHipotenusa"
            value="umCatetoHipotenusa"
            checked={tipoCalculo === 'umCatetoHipotenusa'}
            onChange={() => setTipoCalculo('umCatetoHipotenusa')}
          />
          <RadioLabel htmlFor="umCatetoHipotenusa">Um Cateto e Uma Hipotenusa</RadioLabel>
        </Toggle>
      </ToggleContainer>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Valor A:</label>
            <StyledInput type="number" value={valorA} onChange={(e) => setValorA(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <label>Valor B:</label>
            <StyledInput type="number" value={valorB} onChange={(e) => setValorB(e.target.value)} required />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
  <ResultadoContainer>
    <h3>Resultado:</h3>
    {typeof resultado === 'string' ? (
      <ResultadoTexto>{resultado}</ResultadoTexto>
    ) : (
      <ResultadoTexto>
        Hipotenusa: {resultado.hipotenusa.toFixed(2)}
        <hr/>
        Cateto A: {resultado.catetoA.toFixed(2)}
        <hr/>
        Cateto B: {resultado.catetoB.toFixed(2)}
      </ResultadoTexto>
    )}
  </ResultadoContainer>
)}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação da Fórmula de Pitágoras</h3>
          <p>
            O Teorema de Pitágoras é uma relação fundamental em geometria euclidiana entre os três lados de um triângulo
            retângulo. Sejam a e b os comprimentos dos catetos e c o comprimento da hipotenusa, a fórmula de Pitágoras
            pode ser expressa por:
          </p>
          <p>
            <strong>c² = a² + b²</strong>
          </p>
          <p>
            Onde c é a hipotenusa e a e b são os catetos do triângulo retângulo.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando o Teorema de Pitágoras</h3>
          <p>
            <strong>Exemplo 1:</strong> Um triângulo tem catetos de comprimento 3 cm e 4 cm. Qual é o comprimento da
            hipotenusa?
            <br />
            <strong>Solução:</strong> Aplicando o Teorema de Pitágoras, temos: c² = 3² + 4² = 9 + 16 = 25. Portanto, a
            hipotenusa é √25 = 5 cm.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Um poste de 10 metros de altura projeta uma sombra de 6 metros de comprimento em
            um dia ensolarado. Qual é a altura do poste se a sombra projetada mede 10 metros?
            <br />
            <strong>Solução:</strong> Podemos representar isso por um triângulo retângulo, onde a altura do poste é o
            cateto oposto e a sombra é a hipotenusa. Aplicando o Teorema de Pitágoras, temos: h² = 10² - 6² = 100 - 36 =
            64. Portanto, a altura do poste é √64 = 8 metros.
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraPitagoras;

const ResultadoContainer = styled.div`
  background-color: #e6f7ff; /* Azul claro */
  border: 2px solid #91d5ff; /* Azul mais escuro */
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 90%;
  margin-left:5%;
`;

const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #0056b3; /* Azul escuro */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20%;
  margin-top:5%;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Toggle = styled.button`
  background-color: #e6e6e6;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
  margin-bottom:2%;

  &:hover {
    background-color: #ccc;
  }
`;

const FormContainer = styled.div`
  background-color: #f9f9f9; /* Cor de fundo do container dos inputs */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
  margin-bottom: 20px;
  width: 90%;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 80%; /* Ajuste a largura conforme necessário */
  padding: 10px;
  border-radius: 5px;
  border: 2px solid orange; /* Laranja */
  background: white; /* Branco */
  color: orange; /* Laranja */
  margin-left: 5%;
`;

const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RadioLabel = styled.label`
  margin-right: 20px;
  font-size: 16px;
`;

const Explicacao = styled.div`
  background-color: #f2f2f2; /* Cor de fundo da explicação */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
`;

const Exemplos = styled.div`
  background-color: #f2f2f2; /* Cor de fundo dos exemplos */
  border-radius: 5px;
  padding: 10px;
  width: 90%;


  
`;
