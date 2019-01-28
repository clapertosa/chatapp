import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  width: ${props => (props.navbar ? "50px" : "auto")};
  height: auto;

  a {
    display: flex;
    align-items: center;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = ({ navbar }) => {
  return (
    <Container navbar={navbar}>
      <Link href="/">
        <a>
          <img src="/static/images/logo.svg" alt="Chat balloon logo" />
        </a>
      </Link>
    </Container>
  );
};

export default Logo;
