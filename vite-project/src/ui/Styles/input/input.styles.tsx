import styled from 'styled-components';

export const ResultadoContainer = styled.div`
  background-color: #ffb74c58; 
  border: 2px solid #ffae00;  
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 90%;
  margin-left:5%;
`;

export const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000000; /* Azul escuro */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
  margin-top:3%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 90%;
`;

export const Toggle = styled.div`
  background-color: #e6e6e6;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0 10px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
  width: 50%;
  text-align: center;
  margin-top: 2%;
  font-size: large;

  &:hover {
    background-color: #ccc;
  }
`;

export const FormContainer = styled.div`
  background-color: #f9f9f9; /* Cor de fundo do container dos inputs */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
  margin-bottom: 20px;
  width: 95%;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between; /* Alinha os elementos nas extremidades */
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledInputLabel = styled.label`
  font-size: 16px;
  flex: 1;  
  text-align: left;  
`;

export const StyledInput = styled.input`
  height: 40px;
  flex: 2;  
  padding: 10px;
  border-radius: 5px;
  border: 2px solid orange;  
  background: white;  
  color: orange; 
  margin-left : 2% ;
  margin-right: 2%;
`;

export const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RadioGroup = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: #333;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="radio"] {
    margin-right: 8px;
    transform: scale(1.5);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 2px solid #007bff;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    outline: none;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background-color: #007bff;
  }
`;
 

export const Explicacao = styled.div`
  background-color: #f2f2f2;  
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
  margin-top: 1%;
`;

export const Exemplos = styled.div`
  background-color: #f2f2f2;  
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  margin-top: 1%;
`;

export const StyledSelect = styled.select`
  height: 40px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid orange; /* Laranja */
  background: white; /* Branco */
  color: orange; /* Laranja */
  font-size: 16px;
`;
