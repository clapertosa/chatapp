import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Particles from "../../components/Particles/Particles";

const theme = {
  navbarHeight: "4rem",
  colors: {
    strongPink: "#db3bc8",
    lightBlue: "#282582",
    strongBlue: "#1b065e",
    mediumPink: "#ff87ab",
    lightPink: "#fcc8c2"
  },
  message: {
    currentUser: {
      borderLeft: "15px solid #1b065e",
      borderRight: "15px solid transparent",
      borderTop: "15px solid #1b065e",
      borderBottom: "15px solid transparent",
      right: "-16px"
    },
    anotherUser: {
      borderLeft: "15px solid transparent",
      borderRight: "15px solid #1b065e",
      borderTop: "15px solid #1b065e",
      borderBottom: "15px solid transparent",
      left: "-16px"
    }
  },
  mediaQuery: { minWidth: "40rem" }
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    scrollbar-color: #db3bc8 #fcc8c2;
    scrollbar-width: thin;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #fcc8c2;
  }

  *::-webkit-scrollbar-thumb {
    background: #db3bc8;
  }

  html, body {
    @font-face {
    font-family: 'SourceSansPro';
    src: url("../../static/fonts/SourceSansPro-SemiBold.ttf");
  }

    @font-face {
    font-family: 'Webpixel';
    src: url("../../static/fonts/webpixel bitmap_black.otf");
  }

    font-family: "SourceSansPro";
    width: 100%;
    margin: 0;
    padding: 0;
    color: ${theme.colors.lightPink};

    a {
      color: ${theme.colors.lightPink};
    }

  }

  body > div,
  #__next,
  #__next > div,
  #__next > div > div {
  height: 100%;
}
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "header" "main";
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  align-items: center;
  height: ${props => props.theme.navbarHeight};
  background-color: ${theme.colors.strongBlue};
  border-bottom: 1px solid ${theme.colors.strongPink};
  font-family: "Webpixel";
  z-index: 100;
`;

const Main = styled.div`
  grid-area: main;
  height: 100%;
`;

const Layout = props => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <Navbar />
          </Header>
          <Main>
            <Particles />
            {props.children}
          </Main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
