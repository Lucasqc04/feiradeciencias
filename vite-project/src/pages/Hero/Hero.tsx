 
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css'

const { Panel } = Collapse;

const HeroContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
 
  
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  max-width: 800px;
  text-align: left;
  margin: 20px auto;
`;

const ToggleContainer = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroTitle>Bem-vindo à ASTROCALC</HeroTitle>
      <HeroSubtitle>Descubra coisas incríveis aqui.</HeroSubtitle>
      <Description>
        Este site foi criado como parte de um projeto de feira de ciências para oferecer uma série de calculadoras em diversos temas, com o objetivo de facilitar a vida dos estudantes e promover o aprendizado. Explore as calculadoras disponíveis nos temas abaixo:
      </Description>
      <ToggleContainer>
        <Collapse accordion>
          <Panel header="Matemática" key="1">
            <ul>
              <li><Link to="/Bhaskara">Calculadora de Bhaskara</Link></li>
              <li><Link to="/MMC">Calculadora de MMC</Link></li>
              <li><Link to="/MDC">Calculadora de MDC</Link></li>
              <li><Link to="/ProgressaoAritmetica">Calculadora de Progressão Aritmética</Link></li>
              <li><Link to="/ProgressaoGeometrica">Calculadora de Progressão Geométrica</Link></li>
              <li><Link to="/RegraDeTres">Calculadora de Regra de Tres</Link></li>
            </ul>
          </Panel>
          <Panel header="Geometria" key="2">
            <ul>
              <li><Link to="/Pitagoras">Calculadora de Pitágoras</Link></li>
              <li><Link to="/Circulo-Area-Perimetro">Calculadora de Área e Perímetro do Círculo</Link></li>
              <li><Link to="/Circulo-Arco">Calculadora de Comprimento do Arco do Círculo</Link></li>
              <li><Link to="/AreaPoligonoRegular">Calculadora de Área de Polígono Regular</Link></li>
              <li><Link to="/AreaTrianguloEquilatero">Calculadora de Área de Triângulo Equilátero</Link></li>
              <li><Link to="/LadoTriangulo">Calculadora de Lado do Triângulo</Link></li>
            </ul>
          </Panel>
          <Panel header="Saúde" key="3">
            <ul>
              <li><Link to="/IMC">Calculadora de IMC</Link></li>
            </ul>
          </Panel>
          <Panel header="Datas" key="4">
            <ul>
              <li><Link to="/DiasParaAniversario">Calculadora de Dias para Aniversário</Link></li>
              <li><Link to="/DiasEntreDatas">Calculadora de Dias Entre Datas</Link></li>
            </ul>
          </Panel>
          <Panel header="Física" key="5">
            <ul>
              <li><Link to="/VelocidadeMedia">Calculadora de Velocidade Média</Link></li>
            
              <li><Link to="/ForcaResultante">Calculadora de Força Resultante</Link></li>
            </ul>
          </Panel>
          <Panel header="Financeiro" key="6">
            <ul>
              <li><Link to="/JurosCompostos">Calculadora de Juros Compostos</Link></li>
              <li><Link to="/JurosSimples">Calculadora de Juros Simples</Link></li>
            </ul>
          </Panel>
        </Collapse>
      </ToggleContainer>
    </HeroContainer>
  );
};

export default Hero;
