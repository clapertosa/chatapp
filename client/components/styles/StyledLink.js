import Link from "next/link";
import styled from "styled-components";

const Anchor = styled.a`
  grid-area: ${({ gridArea }) => (gridArea ? gridArea : "")};
  text-decoration: none;
  border-bottom: ${props =>
    !props.noBorder ? `1px solid ${props.theme.colors.strongPink}` : null};

  &:hover {
    font-family: ${({ noHover }) => (!noHover ? "Webpixel" : null)};
    font-size: ${({ noHover }) => (!noHover ? "2.4rem" : null)};
    font-weight: normal;
    color: ${({ theme: { colors } }) => colors.strongPink};
  }
`;

const StyledLink = ({ children, href, gridArea, noBorder, noHover }) => {
  return (
    <Link href={href}>
      <Anchor
        href={href}
        gridArea={gridArea}
        noBorder={noBorder}
        noHover={noHover}
      >
        {children}
      </Anchor>
    </Link>
  );
};

export default StyledLink;
