import { default as NextLink } from "next/link";
import styled from "styled-components";

const Anchor = styled.a`
  text-decoration: none;
  border-bottom: 1px dashed ${({ theme: { colors } }) => colors.strongPink};

  &:hover {
    font-family: "Webpixel";
    font-size: 2.4rem;
    color: ${({ theme: { colors } }) => colors.strongPink};
  }
`;

const Link = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <Anchor href={href}>{children}</Anchor>
    </NextLink>
  );
};

export default Link;
