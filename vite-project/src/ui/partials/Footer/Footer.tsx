import { Container } from 'react-bootstrap';
 import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AstroLogo from '../../../assets/AstroLogo.jpg'

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const handleToggleModal = (content: string[]) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
    <div>
      <Container>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">&copy; 2024 AstroCalc, Inc</p>
          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <img src={AstroLogo} alt="Astro Logo" className="me-2" style={{ width: '80px', height: '80px' }} />
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['Bhaskara', 'MMC', 'MDC', 'ProgressaoAritmetica', 'ProgressaoGeometrica', 'RegraDeTres'])}>Matemática</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['Pitagoras', 'Circulo-Area-Perimetro', 'Circulo-Arco', 'AreaPoligonoRegular', 'AreaTrianguloEquilatero', 'LadoTriangulo'])}>Geometria</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['IMC'])}>Saúde</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['DiasParaAniversario', 'DiasEntreDatas'])}>Datas</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['VelocidadeMedia', 'ForcaResultante'])}>Física</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={() => handleToggleModal(['JurosCompostos', 'JurosSimples'])}>Financeiro</a></li>
          </ul>
        </footer>
      </Container>

      <Modal show={showModal} onHide={() => handleToggleModal([])}>
        <Modal.Header closeButton>
          <Modal.Title>Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {modalContent.map((page, index) => (
              <li key={index}>
                <Link to={`/${page}`}>{page}</Link>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Footer;
