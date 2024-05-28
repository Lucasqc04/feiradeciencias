// CalculadoraForcaResultante.jsx
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


interface ResultadoForcaResultante {
  forca?: number;
  massa?: number;
  aceleracao?: number;
}

const CalculadoraForcaResultante: React.FC = () => {
  const [valorA, setValorA] = useState<string>('');
  const [valorB, setValorB] = useState<string>('');
  const [tipoCalculo, setTipoCalculo] = useState<'calcularForca' | 'calcularMassa' | 'calcularAceleracao'>('calcularForca');
  const [resultado, setResultado] = useState<ResultadoForcaResultante | string | null>(null);
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

    if (tipoCalculo === 'calcularForca') {
      const F = A * B;
      setResultado({ forca: F });
    } else if (tipoCalculo === 'calcularMassa') {
      const m = A / B;
      setResultado({ massa: m });
    } else if (tipoCalculo === 'calcularAceleracao') {
      const a = A / B;
      setResultado({ aceleracao: a });
    }
  };

  return (
    <Container>
        <FormContainer>
        <label>Calcular:</label>
        <hr/>
        <RadioGroup>
          <input
            type="radio"
            id="calcularForca"
            value="calcularForca"
            checked={tipoCalculo === 'calcularForca'}
            onChange={() => setTipoCalculo('calcularForca')}
          />
          <label htmlFor="calcularForca">Calcular Força (F = m * a)</label>
         
       
          <input
            type="radio"
            id="calcularMassa"
            value="calcularMassa"
            checked={tipoCalculo === 'calcularMassa'}
            onChange={() => setTipoCalculo('calcularMassa')}
          />
          <label htmlFor="calcularMassa">Calcular Massa (m = F / a)</label>
       
       
          <input
            type="radio"
            id="calcularAceleracao"
            value="calcularAceleracao"
            checked={tipoCalculo === 'calcularAceleracao'}
            onChange={() => setTipoCalculo('calcularAceleracao')}
          />
          <label htmlFor="calcularAceleracao">Calcular Aceleração (a = F / m)</label>
        </RadioGroup>
  
        <hr/>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>{tipoCalculo === 'calcularForca' ? 'Massa (m):' : 'Força (F):'}</label>
            <StyledInput type="number" value={valorA} onChange={(e) => setValorA(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <label>{tipoCalculo === 'calcularAceleracao' ? 'Massa (m):' : 'Aceleração (a):'}</label>
            <StyledInput type="number" value={valorB} onChange={(e) => setValorB(e.target.value)} required />
          </InputGroup>
          <CenteredButton type="submit">Calcular</CenteredButton>
        </form>
        {resultado && (
          <ResultadoContainer>
            <h3>Resultado:</h3>
            {typeof resultado === 'string' ? (
              <ResultadoTexto>{resultado}</ResultadoTexto>
            ) : tipoCalculo === 'calcularForca' ? (
              <ResultadoTexto>Força Resultante (F): {resultado.forca?.toFixed(2)} N</ResultadoTexto>
            ) : tipoCalculo === 'calcularMassa' ? (
              <ResultadoTexto>Massa (m): {resultado.massa?.toFixed(2)} kg</ResultadoTexto>
            ) : (
              <ResultadoTexto>Aceleração (a): {resultado.aceleracao?.toFixed(2)} m/s²</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação da Fórmula da Força Resultante</h3>
          <p>
            A fórmula da força resultante é dada por <strong>F = m * a</strong>, onde:
          </p>
          <ul>
            <li><strong>F</strong> é a força resultante em Newtons (N).</li>
            <li><strong>m</strong> é a massa em quilogramas (kg).</li>
            <li><strong>a</strong> é a aceleração em metros por segundo ao quadrado (m/s²).</li>
          </ul>
          <p>
            Esta fórmula é derivada da Segunda Lei de Newton, que estabelece que a força resultante que age sobre um
            objeto é igual à massa do objeto multiplicada pela aceleração que ele experimenta.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Problemas Utilizando a Fórmula da Força Resultante</h3>
          <p>
            <strong>Exemplo 1:</strong> Um carro de 1000 kg acelera a 2 m/s². Qual é a força resultante que atua sobre o carro?
            <br />
            <strong>Solução:</strong> Aplicando a fórmula F = m * a, temos F = 1000 kg * 2 m/s² = 2000 N.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Um objeto de 5 kg é puxado com uma força resultante de 20 N. Qual é a aceleração do objeto?
            <br />
            <strong>Solução:</strong> Reorganizando a fórmula para a = F / m, temos a = 20 N / 5 kg = 4 m/s².
          </p>
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraForcaResultante;

 