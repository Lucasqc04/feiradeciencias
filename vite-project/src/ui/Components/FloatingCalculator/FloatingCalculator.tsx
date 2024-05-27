import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Modal, Input } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

const FloatingButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const StyledCalculatorOutlined = styled(CalculatorOutlined)`
  font-size: 24px;
`;

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
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
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

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

  const onStart = (  uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) return;
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Draggable>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <FloatingButton type="primary" onClick={showModal}>
            <StyledCalculatorOutlined />
          </FloatingButton>
        </div>
      </Draggable>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            Calculadora
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(  uiData) => onStart( uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
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
