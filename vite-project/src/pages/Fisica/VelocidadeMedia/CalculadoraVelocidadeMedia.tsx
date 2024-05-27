import React, { useState, FormEvent } from 'react';
import {
    ResultadoContainer,
    ResultadoTexto,
    Container,
    FormContainer,
    InputGroup,
    StyledInput,
    CenteredButton,
    Toggle,
    Explicacao,
    Exemplos,
    RadioGroup
} from '../../../ui/Styles/input/input.styles';

const CalculadoraVelocidadeMedia: React.FC = () => {
    const [velocidadeMedia, setVelocidadeMedia] = useState<string>('');
    const [distancia, setDistancia] = useState<string>('');
    const [tempo, setTempo] = useState<string>('');
    const [calcularVelocidade, setCalcularVelocidade] = useState<boolean>(false);
    const [calcularDistancia, setCalcularDistancia] = useState<boolean>(false);
    const [calcularTempo, setCalcularTempo] = useState<boolean>(false);
    const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
    const [mostrarExemplos, setMostrarExemplos] = useState<boolean>(false);

    const limparCampos = () => {
        setVelocidadeMedia('');
        setDistancia('');
        setTempo('');
    };

    const calcular = (e: FormEvent) => {
        e.preventDefault();

        limparCampos();

        const velocidadeMediaNum = parseFloat(velocidadeMedia);
        const distanciaNum = parseFloat(distancia);
        const tempoNum = parseFloat(tempo);

        if (calcularVelocidade && !isNaN(distanciaNum) && !isNaN(tempoNum) && tempoNum !== 0) {
            const velocidadeCalculada = distanciaNum / tempoNum;
            setVelocidadeMedia(velocidadeCalculada.toFixed(2));
        } else if (calcularDistancia && !isNaN(velocidadeMediaNum) && !isNaN(tempoNum) && velocidadeMediaNum !== 0) {
            const distanciaCalculada = velocidadeMediaNum * tempoNum;
            setDistancia(distanciaCalculada.toFixed(2));
        } else if (calcularTempo && !isNaN(velocidadeMediaNum) && !isNaN(distanciaNum) && velocidadeMediaNum !== 0) {
            const tempoCalculado = distanciaNum / velocidadeMediaNum;
            setTempo(tempoCalculado.toFixed(2));
        } else {
            alert('Por favor, insira valores válidos.');
        }
    };

    return (
        <Container>
            <FormContainer>
                <form onSubmit={calcular}>
                    <RadioGroup>
                        <label>
                            <input
                                type="radio"
                                value="calcularVelocidade"
                                checked={calcularVelocidade}
                                onChange={() => {
                                    setCalcularVelocidade(true);
                                    setCalcularDistancia(false);
                                    setCalcularTempo(false);
                                }}
                            />
                            Calcular Velocidade Média
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="calcularDistancia"
                                checked={calcularDistancia}
                                onChange={() => {
                                    setCalcularVelocidade(false);
                                    setCalcularDistancia(true);
                                    setCalcularTempo(false);
                                }}
                            />
                            Calcular Distância Percorrida
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="calcularTempo"
                                checked={calcularTempo}
                                onChange={() => {
                                    setCalcularVelocidade(false);
                                    setCalcularDistancia(false);
                                    setCalcularTempo(true);
                                }}
                            />
                            Calcular Tempo Decorrido
                        </label>
                    </RadioGroup>
                    {calcularVelocidade && (
                        <>
                            <InputGroup>
                                <label>Distância Percorrida (m):</label>
                                <StyledInput
                                    type="number"
                                    value={distancia}
                                    onChange={(e) => setDistancia(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>Tempo Decorrido (s):</label>
                                <StyledInput
                                    type="number"
                                    value={tempo}
                                    onChange={(e) => setTempo(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </>
                    )}
                    {calcularDistancia && (
                        <>
                            <InputGroup>
                                <label>Velocidade Média (m/s):</label>
                                <StyledInput
                                    type="number"
                                    value={velocidadeMedia}
                                    onChange={(e) => setVelocidadeMedia(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>Tempo Decorrido (s):</label>
                                <StyledInput
                                    type="number"
                                    value={tempo}
                                    onChange={(e) => setTempo(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </>
                    )}
                    {calcularTempo && (
                        <>
                            <InputGroup>
                                <label>Velocidade Média (m/s):</label>
                                <StyledInput
                                    type="number"
                                    value={velocidadeMedia}
                                    onChange={(e) => setVelocidadeMedia(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>Distância Percorrida (m):</label>
                                <StyledInput
                                    type="number"
                                    value={distancia}
                                    onChange={(e) => setDistancia(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </>
                    )}
                    <CenteredButton type="submit">Calcular</CenteredButton>
                </form>
                {velocidadeMedia !== '' && (
                    <ResultadoContainer>
                        <h3>Resultado:</h3>
                        <ResultadoTexto>
                            {calcularVelocidade && `Velocidade Média: ${velocidadeMedia} m/s`}
                            {calcularDistancia && `Distância Percorrida: ${distancia} m`}
                            {calcularTempo && `Tempo Decorrido: ${tempo} s`}
                        </ResultadoTexto>
                    </ResultadoContainer>
                )}
            </FormContainer>
            <Toggle onClick={() => setMostrarExplicacao((prevState) => !prevState)}>Mostrar Explicação</Toggle>
            {mostrarExplicacao && (
                <Explicacao>
                    <h3>Explicação da Velocidade Média</h3>
                    <p>
                        A velocidade média é uma medida da rapidez com que um objeto se desloca em um certo intervalo de tempo.
                    </p>
                    <p>
                        A fórmula para calcular a velocidade média é:
                        <br />
                        <strong>Velocidade Média = Distância Percorrida / Tempo Decorrido</strong>
                    </p>
                    <p>
                        Esta fórmula é usada para determinar a velocidade média de um objeto emmovimento, onde a distância percorrida é dividida pelo tempo decorrido.
                    </p>
                </Explicacao>
            )}
            <Toggle onClick={() => setMostrarExemplos((prevState) => !prevState)}>Mostrar Exemplos</Toggle>
            {mostrarExemplos && (
                <Exemplos>
                    <h3>Exemplos de Cálculo de Velocidade Média</h3>
                    <p>
                        <strong>Exemplo 1:</strong> Um carro percorre uma distância de 100 metros em 20 segundos. Qual é a velocidade média do carro?
                        <br />
                        <strong>Solução:</strong> Velocidade Média = 100 m / 20 s = 5 m/s.
                    </p>
                    <p>
                        <strong>Exemplo 2:</strong> Um atleta corre a uma velocidade média de 8 m/s e percorre uma distância de 800 metros. Quanto tempo ele levou para percorrer essa distância?
                        <br />
                        <strong>Solução:</strong> Tempo Decorrido = 800 m / 8 m/s = 100 s.
                    </p>
                    <p>
                        <strong>Exemplo 3:</strong> Um ciclista leva 2 minutos (120 segundos) para percorrer uma distância de 600 metros. Qual é a sua velocidade média?
                        <br />
                        <strong>Solução:</strong> Velocidade Média = 600 m / 120 s = 5 m/s.
                    </p>
                </Exemplos>
            )}
        </Container>
    );
};

export default CalculadoraVelocidadeMedia;
