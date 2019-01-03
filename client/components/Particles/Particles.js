import { Particles as ReactParticles } from "react-particles-js";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${props => props.theme.colors.lightBlue};
  z-index: -900;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const getParams = () => {
  const date = new Date();
  let params;
  if (date.getMonth() === 11 || (date.getMonth() === 0 && date.getDate() < 7)) {
    params = {
      particles: {
        number: {
          value: 160,
          density: {
            enable: false
          }
        },
        size: {
          value: 10,
          random: true
        },
        move: {
          direction: "bottom",
          out_mode: "out"
        },
        line_linked: {
          enable: false
        }
      },
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "remove"
          }
        },
        modes: {
          remove: {
            particles_nb: 10
          }
        }
      }
    };
  } else {
    params = {
      particles: {
        number: {
          value: 160,
          density: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            speed: 4,
            size_min: 0.3
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          random: true,
          speed: 1,
          direction: "top",
          out_mode: "out"
        }
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },
          onclick: {
            enable: true,
            mode: "repulse"
          }
        },
        modes: {
          bubble: {
            distance: 250,
            duration: 2,
            size: 0,
            opacity: 0
          },
          repulse: {
            distance: 400,
            duration: 4
          }
        }
      }
    };
  }
  return params;
};

const Particles = () => {
  return (
    <Container>
      <ReactParticles params={getParams()} />
    </Container>
  );
};

export default Particles;
