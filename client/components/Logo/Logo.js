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
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Logo = ({ navbar }) => {
  return (
    <Container navbar={navbar}>
      <Link href="/">
        <a>
          <Image src="../../static/images/logo.svg" />
        </a>
      </Link>
    </Container>
  );
};

export default Logo;
