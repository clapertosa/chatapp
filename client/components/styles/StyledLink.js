import Link from "next/link";
import styled from "styled-components";

const Anchor = styled.a`
  text-decoration: none;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};

  &:hover {
    font-family: "Webpixel";
    font-size: 2.4rem;
    color: ${({ theme: { colors } }) => colors.strongPink};
  }
`;

const StyledLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <Anchor href={href}>{children}</Anchor>
    </Link>
  );
};

export default StyledLink;
