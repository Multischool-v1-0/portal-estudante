"use client";

import styled from "styled-components";
import bgImage from "@/assets/backgrounds/bg_welcome.jpeg";
import Button from "@/components/ui/Button";
import Link from "next/link";

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${bgImage.src}) no-repeat center center;
  background-size: auto max(100%, 100vh);
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 10000;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  overflow-y: auto; /* Permite scroll quando necessário */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(28, 28, 28, 69%);
    z-index: -1;
  }
`;

const Content = styled.div`
  width: 90vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 4rem 1.4rem;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.textWhite};
  font-weight: ${(props) => props.theme.fonts.weight.bold};
  font-size: 2.5rem;
  margin-bottom: -0.6rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textWhite};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  font-size: 1.07rem;
  line-height: 1.5;
`;

const Buttons = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 1.5rem; /* Adiciona mais espaçamento entre botões em telas menores */
    height: auto; /* Remove altura fixa para permitir o gap */
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.textWhite};
`;

export default function Welcome() {
  return (
    <BackgroundImage>
      <Content>
        <Title>Bem-vindo ao Multischool Angola</Title>
        <Description>
          Facilitamos a gestão da sua vida acadêmica com soluções que quebram o
          convencional!
        </Description>
        <Buttons>
          <Button
            bgColor="primary"
            textColor="background"
            text="Fazer login"
            hasBorder={false}
            href="/login"
            onClick={() => console.log("Botão clicado")}
          />
          <Button
            bgColor="background"
            textColor="primary"
            text="Criar conta"
            href="/tips"
            hasBorder={false}
          />
        </Buttons>
        <LinkContainer>
          <StyledLink href="/explore">
            Explorar instituições de ensino
          </StyledLink>
        </LinkContainer>
      </Content>
    </BackgroundImage>
  );
}
