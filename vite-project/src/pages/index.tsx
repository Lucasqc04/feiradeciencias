
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Header from "../ui/partials/Header/Header";
import Footer from "../ui/partials/Footer/Footer";
import Hero from "./Hero/Hero";
import CalculadoraIMC from "./Saude/IMC/CalculadoraIMC";
import CalculadoraDiasParaAniversario from "./Datas/DiasParaAniversario/CalculadoraDiasParaAniversario";
import CalculadoraPitagoras from "./Geometria/Pitagoras/Pitagoras";
import CalculadoraCirculo from "./Geometria/Circulo/CalculadoraCirculo";
import CalculadoraMMC from "./Matematica/MMC/CalculadoraMMC";
import CalculadoraMDC from "./Matematica/MDC/CalculadoraMDC";
import CalculadoraComprimentoArco from "./Geometria/ArcoCirculo/CalculadoraComprimentoArco";
import CalculadoraProgressaoAritmetica from "./Matematica/ProgressaoAritmetica/ProgressaoAritmetica";
import CalculadoraProgressaoGeometrica from "./Matematica/ProgressaoGeometrica/ProgressaoGeometrica";
import CalculadoraBhaskara from "./Matematica/Bhaskara/CalculadoraBhaskara";
import CalculadoraJurosCompostos from "./Financeiro/JurosCompostos/JurosCompostos";
import CalculadoraJurosSimples from "./Financeiro/JurosSimples/JurosSimples";
import CalculadoraAreaPoligonoRegular from "./Geometria/AreaPoligono/AreaPoligono";
import CalculadoraTrianguloEquilatero from "./Geometria/TrianguloEquilatero/TrianguloEquilatero";
import CalculadoraLadoTriangulo from "./Geometria/LadoTriangulo/LadoTriangulo";
import CalculadoraDiasEntreDatas from "./Datas/DiasEntreDatas/CalculadoraDiasEntreDatas";
import CalculadoraVelocidadeMedia from "./Fisica/VelocidadeMedia/CalculadoraVelocidadeMedia";
import FloatingCalculator from '../ui/Components/FloatingCalculator/FloatingCalculator';
import CalculadoraRegraDeTres from "./Matematica/RegraDeTres/RegraDeTresBasica";
import CalculadoraForcaResultante from "./Fisica/ForcaResultante/ForcaResultante";
import CalculadoraMRUV from "./Fisica/MovimentoRetilíneoUniformementeVariado/CalculadoraMRUV";
import CalculadoraMRU from "./Fisica/MovimentoRetilineoUniforme/MovimentoRetilineoUniforme";
import CalculadoraConcentracaoComum from "./Quimica/ConcentracaoComum/CalculadoraConcentracaoComum";
import CalculadoraMolaridade from "./Quimica/Molaridade/Molaridade";
import CalculadoraEquacaoGases from "./Quimica/EquacaoGeralGases/EquacaoGeralGases";
  

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;

const Pages = ({ toggleTheme }: { toggleTheme: () => void }) => { // Recebe a função de troca de tema
  return (
    <Router>
      <AppContainer>
        <Header toggleTheme={toggleTheme} currentTheme={"light"} />
        <MainContent>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Bhaskara" element={<CalculadoraBhaskara />} />
            <Route path="/Pitagoras" element={<CalculadoraPitagoras />} />
            <Route path="/Circulo-Area-Perimetro" element={<CalculadoraCirculo />} />
            <Route path="/Circulo-Arco" element={<CalculadoraComprimentoArco />} />
            <Route path="/MMC" element={<CalculadoraMMC />} />
            <Route path="/MDC" element={<CalculadoraMDC />} />
            <Route path="/ProgressaoAritmetica" element={<CalculadoraProgressaoAritmetica />} />
            <Route path="/ProgressaoGeometrica" element={<CalculadoraProgressaoGeometrica />} />
            <Route path="/JurosCompostos" element={<CalculadoraJurosCompostos />} />
            <Route path="/JurosSimples" element={<CalculadoraJurosSimples />} />
            <Route path="/AreaPoligonoRegular" element={<CalculadoraAreaPoligonoRegular />} />
            <Route path="/AreaTrianguloEquilatero" element={<CalculadoraTrianguloEquilatero />} />
            <Route path="/LadoTriangulo" element={<CalculadoraLadoTriangulo />} />
            <Route path="/IMC" element={<CalculadoraIMC />} />
            <Route path="/DiasParaAniversario" element={<CalculadoraDiasParaAniversario />} />
            <Route path="/DiasEntreDatas" element={<CalculadoraDiasEntreDatas />} />
            <Route path="/VelocidadeMedia" element={<CalculadoraVelocidadeMedia />} />
            <Route path="/RegraDeTres" element={<CalculadoraRegraDeTres />} />
            <Route path="/ForcaResultante" element={<CalculadoraForcaResultante />} />
            <Route path="/MRUV" element={<CalculadoraMRUV />} />
            <Route path="/MRU" element={<CalculadoraMRU />} />
            <Route path="/ConcentracaoComum" element={<CalculadoraConcentracaoComum />} />
            <Route path="/Molaridade" element={<CalculadoraMolaridade />} />
            <Route path="/EquacaoGases" element={<CalculadoraEquacaoGases />} />
           </Routes>
        </MainContent>
        <Footer />
        <FloatingCalculator /> 
      </AppContainer>
    </Router>
  );
};

export default Pages;
