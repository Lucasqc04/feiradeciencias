 
import   { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Input } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalculatorDisplay = styled(Input)`
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
`;

const CalculatorRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;

  button {
    flex: 1;
    margin: 0 5px;
  }
`;

const FloatingCalculator = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (value === 'C') {
      setDisplay('');
      return;
    }

    setDisplay(display + value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <FloatingButton type="primary" icon={<CalculatorOutlined />} onClick={showModal} />
      <Modal title="Calculadora" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <CalculatorContainer>
          <CalculatorDisplay value={display} readOnly />
          <CalculatorRow>
            <Button onClick={() => handleButtonClick('1')}>1</Button>
            <Button onClick={() => handleButtonClick('2')}>2</Button>
            <Button onClick={() => handleButtonClick('3')}>3</Button>
            <Button onClick={() => handleButtonClick('+')}>+</Button>
          </CalculatorRow>
          <CalculatorRow>
            <Button onClick={() => handleButtonClick('4')}>4</Button>
            <Button onClick={() => handleButtonClick('5')}>5</Button>
            <Button onClick={() => handleButtonClick('6')}>6</Button>
            <Button onClick={() => handleButtonClick('-')}>-</Button>
          </CalculatorRow>
          <CalculatorRow>
            <Button onClick={() => handleButtonClick('7')}>7</Button>
            <Button onClick={() => handleButtonClick('8')}>8</Button>
            <Button onClick={() => handleButtonClick('9')}>9</Button>
            <Button onClick={() => handleButtonClick('*')}>*</Button>
          </CalculatorRow>
          <CalculatorRow>
            <Button onClick={() => handleButtonClick('0')}>0</Button>
            <Button onClick={() => handleButtonClick('.')}>.</Button>
            <Button onClick={() => handleButtonClick('C')}>C</Button>
            <Button onClick={() => handleButtonClick('/')}>/</Button>
          </CalculatorRow>
          <CalculatorRow>
            <Button onClick={() => handleButtonClick('=')}>=</Button>
          </CalculatorRow>
        </CalculatorContainer>
      </Modal>
    </>
  );
};

export default FloatingCalculator;
