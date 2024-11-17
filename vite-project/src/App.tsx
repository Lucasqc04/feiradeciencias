
import { ThemeProvider } from "styled-components";
import useTheme from "./useTheme";
import GlobalStyle from "./ui/Styles/global"; // Seu arquivo de estilos globais
import Pages from "./pages";
import { lightTheme, darkTheme } from "./ui/Styles/theme"; // Defina seus temas aqui

const App = () => {
  const [theme, toggleTheme] = useTheme(); // Obtém o tema do hook
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle /> {/* Aplica os estilos globais */}
      <Pages toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;
