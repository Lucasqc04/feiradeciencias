import styled from 'styled-components';

export const ResultadoContainer = styled.div`
  background-color: #e6f7ff; /* Azul claro */
  border: 2px solid #91d5ff; /* Azul mais escuro */
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
`;
 
export const ResultadoTexto = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #0056b3; /* Azul escuro */
`;
 
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
  margin-top: 5%;
`;
 
export const FormContainer = styled.div`
  background-color: #f9f9f9; /* Cor de fundo do container dos inputs */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
  margin-bottom: 20px;
  width: 90%;
`;
 
export const InputGroup = styled.div`
  margin-bottom: 10px;
`;
 
export const StyledInput = styled.input`
  height: 40px;
  width: 80%; /* Ajuste a largura conforme necessário */
  padding: 10px;
  border-radius: 5px;
  border: 2px solid orange; /* Laranja */
  background: white; /* Branco */
  color: orange; /* Laranja */
  margin-left: 5%;
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
  display: flex;
  gap: 10px;
  margin: 10px 0;
 
  label {
    display: flex;
    align-items: center;
  }
 
  input {
    margin-right: 5px;
  }
`;
 
export const Toggle = styled.button`
  background-color: #e6e6e6;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
  margin-bottom: 2%;
 
  &:hover {
    background-color: #ccc;
  }
`;
 
export const Explicacao = styled.div`
  background-color: #f2f2f2; /* Cor de fundo da explicação */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
`;
 
export const Exemplos = styled.div`
  background-color: #f2f2f2; /* Cor de fundo dos exemplos */
  border-radius: 5px;
  padding: 10px;
  width: 90%;
`;
