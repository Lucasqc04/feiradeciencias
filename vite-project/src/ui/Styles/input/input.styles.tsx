import styled from 'styled-components';

export const ResultadoContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#ffb74c58" : "#34495e"};
  border: 2px solid ${({ theme }) => theme.textColor};
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 90%;
  margin-left: 5%;
`;

export const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
  margin-top: 3%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 90%;
`;

export const Toggle = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#e6e6e6" : "#34495e"};
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  transition: background-color 0.3s ease;
  width: 50%;
  text-align: center;
  margin-top: 2%;
  font-size: large;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#ccc" : "#2c3e50"};
  }
`;

export const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f9f9f9" : "#34495e"};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 95%;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
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
  border: 2px solid ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "white" : "#34495e"};
  color: ${({ theme }) => theme.textColor};
  margin-left: 2%;
  margin-right: 2%;
`;

export const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#007bff" : "#2980b9"};
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#0056b3" : "#3498db"};
  }
`;

export const RadioGroup = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};

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
    border: 2px solid ${({ theme }) => theme.textColor};
    border-radius: 50%;
    width: 10px;
    height: 10px;
    outline: none;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background-color: ${({ theme }) => theme.textColor};
  }
`;

export const Explicacao = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f2f2f2" : "#34495e"};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
  margin-top: 1%;
`;

export const Exemplos = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "#f2f2f2" : "#34495e"};
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
  border: 2px solid ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.backgroundColor === "#ffffff" ? "white" : "#34495e"};
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
`;
