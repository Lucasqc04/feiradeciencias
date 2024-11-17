import styled from 'styled-components';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';

const { Panel } = Collapse;

const HeroContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f5f5f5" : "#2c3e50"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textColor};
  max-width: 800px;
  text-align: justify;
  margin: 20px auto;
  line-height: 1.6;
`;

const ToggleContainer = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const PanelHeader = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.textColor};
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroTitle>Bem-vindo à ASTROCALC</HeroTitle>
      <HeroSubtitle>Descubra ferramentas incríveis e aprenda mais!</HeroSubtitle>
      <Description>
        A ASTROCALC é um projeto desenvolvido para oferecer uma série de calculadoras em diversos temas, com o objetivo de facilitar a vida dos estudantes e promover o aprendizado de maneira prática e interativa. Aqui, você encontrará ferramentas úteis para resolver problemas matemáticos, explorar conceitos geométricos, cuidar da saúde, calcular datas importantes, compreender princípios físicos e gerenciar finanças pessoais.
        Navegue pelas categorias abaixo e descubra como nossas calculadoras podem ajudar você a aprender mais e simplificar suas tarefas diárias.
      </Description>
      <ToggleContainer>
        <Collapse accordion>
          <Panel header={<PanelHeader>Matemática</PanelHeader>} key="1">
            <ul>
              <li><Link to="/Bhaskara">Calculadora de Bhaskara</Link></li>
              <li><Link to="/MMC">Calculadora de MMC</Link></li>
              <li><Link to="/MDC">Calculadora de MDC</Link></li>
              <li><Link to="/ProgressaoAritmetica">Calculadora de Progressão Aritmética</Link></li>
              <li><Link to="/ProgressaoGeometrica">Calculadora de Progressão Geométrica</Link></li>
              <li><Link to="/RegraDeTres">Calculadora de Regra de Três</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Geometria</PanelHeader>} key="2">
            <ul>
              <li><Link to="/Pitagoras">Calculadora de Pitágoras</Link></li>
              <li><Link to="/Circulo-Area-Perimetro">Calculadora de Área e Perímetro do Círculo</Link></li>
              <li><Link to="/Circulo-Arco">Calculadora de Comprimento do Arco do Círculo</Link></li>
              <li><Link to="/AreaPoligonoRegular">Calculadora de Área de Polígono Regular</Link></li>
              <li><Link to="/AreaTrianguloEquilatero">Calculadora de Área de Triângulo Equilátero</Link></li>
              <li><Link to="/LadoTriangulo">Calculadora de Lado do Triângulo</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Saúde</PanelHeader>} key="3">
            <ul>
              <li><Link to="/IMC">Calculadora de IMC</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Datas</PanelHeader>} key="4">
            <ul>
              <li><Link to="/DiasParaAniversario">Calculadora de Dias para Aniversário</Link></li>
              <li><Link to="/DiasEntreDatas">Calculadora de Dias Entre Datas</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Física</PanelHeader>} key="5">
            <ul>
              <li><Link to="/VelocidadeMedia">Calculadora de Velocidade Média</Link></li>
              <li><Link to="/ForcaResultante">Calculadora de Força Resultante</Link></li>
              <li><Link to="/MRU">Calculadora de Movimento Retilíneo Uniforme (MRU)</Link></li>
              <li><Link to="/MRUV">Calculadora de Movimento Retilíneo Uniformemente Variado (MRUV)</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Financeiro</PanelHeader>} key="6">
            <ul>
              <li><Link to="/JurosCompostos">Calculadora de Juros Compostos</Link></li>
              <li><Link to="/JurosSimples">Calculadora de Juros Simples</Link></li>
            </ul>
          </Panel>
          <Panel header={<PanelHeader>Química</PanelHeader>} key="7">
            <ul>
              <li><Link to="/ConcentracaoComum">Calculadora de Concentração Comum</Link></li>
              <li><Link to="/Molaridade">Calculadora de Molaridade</Link></li>
              <li><Link to="/EquacaoGases">Calculadora de Equação Geral dos Gases</Link></li>
            </ul>
          </Panel>
        </Collapse>
      </ToggleContainer>
    </HeroContainer>
  );
};

export default Hero;
