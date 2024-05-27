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

interface ResultadoLadoTriangulo {
  lado: number;
}

const calcularLadoTriangulo = (angulo: number, razao: string, valorRazao: number): number => {
  let lado: number;
  switch (razao) {
    case 'seno':
      lado = valorRazao / Math.sin(angulo * (Math.PI / 180));
      break;
    case 'cosseno':
      lado = valorRazao / Math.cos(angulo * (Math.PI / 180));
      break;
    case 'tangente':
      lado = valorRazao / Math.tan(angulo * (Math.PI / 180));
      break;
    default:
      lado = 0;
  }
  return lado;
};

const CalculadoraLadoTriangulo: React.FC = () => {
  const [angulo, setAngulo] = useState<string>('');
  const [razao, setRazao] = useState<string>('seno');
  const [valorRazao, setValorRazao] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoLadoTriangulo | string | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

  const limparCampos = () => {
    setResultado(null);
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    limparCampos();

    const anguloNum = parseFloat(angulo);
    const valorRazaoNum = parseFloat(valorRazao);

    if (isNaN(anguloNum) || isNaN(valorRazaoNum) || anguloNum <= 0 || valorRazaoNum <= 0) {
      setResultado('Por favor, insira valores válidos para o ângulo e a razão trigonométrica.');
    } else {
      const lado = calcularLadoTriangulo(anguloNum, razao, valorRazaoNum);
      setResultado({ lado });
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={calcular}>
          <InputGroup>
            <label>Ângulo (graus):</label>
            <StyledInput
              type="number"
              value={angulo}
              onChange={(e) => setAngulo(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Razão trigonométrica:</label>
            <select
              value={razao}
              onChange={(e) => setRazao(e.target.value)}
              required
            >
              <option value="seno">Seno</option>
              <option value="cosseno">Cosseno</option>
              <option value="tangente">Tangente</option>
            </select>
          </InputGroup>
          <InputGroup>
            <label>Valor da razão:</label>
            <StyledInput
              type="number"
              value={valorRazao}
              onChange={(e) => setValorRazao(e.target.value)}
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
              <ResultadoTexto>{resultado.lado.toFixed(2)}</ResultadoTexto>
            )}
          </ResultadoContainer>
        )}
      </FormContainer>
      <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
      {mostrarExplicacao && (
        <Explicacao>
          <h3>Explicação do Triângulo Retângulo</h3>
          <p>
            No contexto de um triângulo retângulo, o seno, cosseno e tangente de um ângulo agudo
            são razões trigonométricas que relacionam os lados do triângulo.
          </p>
          <p>
            Por exemplo, se você conhece o seno de um ângulo e o valor de um dos lados adjacente a ele,
            você pode usar a definição do seno para encontrar o comprimento do lado oposto.
          </p>
        </Explicacao>
      )}
      <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
      {mostrarExemplos && (
        <Exemplos>
          <h3>Exemplos de Utilização</h3>
          <p>
            <strong>Exemplo 1:</strong> Em um terreno plano, um poste de 5 metros de altura projeta uma sombra de 8 metros de comprimento. Qual é o ângulo de inclinação do sol em relação ao solo?
            <br />
            <strong>Solução:</strong> Para encontrar o ângulo de inclinação do sol, podemos usar a tangente do ângulo, que é a razão entre a altura do poste (oposto) e o comprimento da sombra (adjacente). Com o valor da tangente e a função inversa da tangente (arco tangente), podemos encontrar o ângulo.
          </p>
          <p>
            <strong>Exemplo 2:</strong> Uma rampa tem uma inclinação de 30 graus em relação ao solo. Se um carrinho precisa subir essa rampa, qual é o comprimento mínimo da rampa para que o carrinho suba 1 metro?
            <br />
            <strong>Solução:</strong> Podemos usar o cosseno do ângulo de inclinação para encontrar o comprimento da rampa, que é a razão entre o comprimento da rampa (adjacente) e a altura do carrinho que ele precisa subir (hipotenusa).
          </p>  
        </Exemplos>
      )}
    </Container>
  );
};

export default CalculadoraLadoTriangulo;
