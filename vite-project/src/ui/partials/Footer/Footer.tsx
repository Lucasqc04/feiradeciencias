import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AstroLogo from '../../../assets/AstroLogo.jpg';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 90vw;
  margin: auto;
`;

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const handleToggleModal = (content: string[]) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
    <FooterContainer>
      <footer 
        className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
        style={{
          backgroundColor: "var(--backgroundColor)",
          color: "var(--textColor)",
        }}
      >
        <p className="col-md-4 mb-0" style={{ color: "var(--textColor)" }}>&copy; 2024 AstroCalc, Inc</p>
        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img src={AstroLogo} alt="Astro Logo" className="me-2" style={{ width: '80px', height: '80px' }} />
        </a>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['Bhaskara', 'MMC', 'MDC', 'ProgressaoAritmetica', 'ProgressaoGeometrica', 'RegraDeTres'])} style={{ color: "var(--textColor)" }}>Matemática</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['Pitagoras', 'Circulo-Area-Perimetro', 'Circulo-Arco', 'AreaPoligonoRegular', 'AreaTrianguloEquilatero', 'LadoTriangulo'])} style={{ color: "var(--textColor)" }}>Geometria</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['IMC'])} style={{ color: "var(--textColor)" }}>Saúde</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['DiasParaAniversario', 'DiasEntreDatas'])} style={{ color: "var(--textColor)" }}>Datas</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['VelocidadeMedia', 'ForcaResultante', 'MRU', "MRUV"])} style={{ color: "var(--textColor)" }}>Física</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['JurosCompostos', 'JurosSimples'])} style={{ color: "var(--textColor)" }}>Financeiro</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2" onClick={() => handleToggleModal(['ConcentracaoComum', 'Molaridade', 'EquacaoGases'])} style={{ color: "var(--textColor)" }}>Química</a>
          </li>
        </ul>
      </footer>

      <Modal show={showModal} onHide={() => handleToggleModal([])}>
        <Modal.Header closeButton style={{ backgroundColor: "var(--headerBackgroundColor)" }}>
          <Modal.Title style={{ color: "var(--textColor)" }}>Links</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "var(--textColor)", backgroundColor: "var(--backgroundColor)" }}>
          <ul>
            {modalContent.map((page, index) => (
              <li key={index}>
                <Link to={`/${page}`} style={{ color: "var(--textColor)" }}>{page}</Link>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </FooterContainer>
  );
};

export default Footer;
