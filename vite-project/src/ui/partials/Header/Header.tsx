import { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AstroLogo from '../../../assets/AstroLogo.jpg'; // Importe sua imagem de logotipo aqui

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const handleToggleModal = (content: string[]) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="mb-3"> {/* Define o fundo branco e texto escuro */}
      <Navbar.Brand style={{ fontFamily: 'Arial, sans-serif' }}> {/* Aplica a fonte desejada */}
          <img src={AstroLogo} alt="Astro Logo" style={{ width: '60px', marginRight: '10px', marginLeft: '10px' }} /> {/* Adiciona a logo Astro com margens */}
          AstroCalc
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => handleToggleModal(['Bhaskara', 'MMC', 'MDC', 'ProgressaoAritmetica', 'ProgressaoGeometrica', 'RegraDeTres'])}>Matemática</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['Pitagoras', 'Circulo-Area-Perimetro', 'Circulo-Arco', 'AreaPoligonoRegular', 'AreaTrianguloEquilatero', 'LadoTriangulo'])}>Geometria</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['IMC'])}>Saúde</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['DiasParaAniversario', 'DiasEntreDatas'])}>Datas</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['VelocidadeMedia', 'ForcaResultante', 'MRU', "MRUV"])}>Física</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['JurosCompostos', 'JurosSimples'])}>Financeiro</Nav.Link>
            <Nav.Link onClick={() => handleToggleModal(['ConcentracaoComum', 'Molaridade', 'EquacaoGases'])}>Química</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
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
    </>
  );
};

export default Header;
