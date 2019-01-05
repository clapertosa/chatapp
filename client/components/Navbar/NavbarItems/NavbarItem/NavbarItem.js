import Link from "next/link";
import styled from "styled-components";

const ContainerDesktop = styled.div`
  border-right: 1px solid ${props => props.theme.colors.strongPink};
  border-left: 1px solid ${props => props.theme.colors.strongPink};
  height: 100%;
  transform: skew(-20deg);
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${props => props.theme.colors.lightBlue};
  }

  a {
    display: block;
    line-height: ${props => props.theme.navbarHeight};
    padding: 0 20px;
    text-decoration: none;
    font-size: 2rem;
    transform: skew(20deg);
  }
`;

const ContainerMobile = styled.div`
  border: 1px solid ${props => props.theme.colors.strongPink};
  margin: 10px auto;
  height: 100%;
  width: 90%;
  text-align: center;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${props => props.theme.colors.lightBlue};
  }

  a {
    display: block;
    line-height: ${props => props.theme.navbarHeight};
    padding: 0 20px;
    text-decoration: none;
    font-size: 2rem;
  }
`;

const NavbarItem = ({ children, href, mobile }) => {
  return mobile ? (
    <ContainerMobile>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </ContainerMobile>
  ) : (
    <ContainerDesktop>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </ContainerDesktop>
  );
};

export default NavbarItem;
