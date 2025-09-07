"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderWelcome";
import Icon from "@/components/ui/IconLogo";
import CustomInput from "@/components/ui/InputRegister";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import BackgroundVectors from "@/components/Bg_vectors";

const Content = styled.div`
  width: 90%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-height: 600px) {
    height: auto;
    min-height: 100vh;
    justify-content: flex-start;
    gap: 1rem;
  }
`;



const Text = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2.8rem;
  background: #000 @media (max-height: 600px) {
    margin-bottom: 1.5rem;
    gap: 1rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-size: 0.96rem;
  line-height: 1.5;
`;

const Inputs = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem; /* Added gap for better spacing */
  background: #000 @media (max-height: 600px) {
    gap: 1.5rem;
  }
`;

const Links = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 1rem; /* Added gap for better spacing */

  @media (max-height: 600px) {
    margin-top: 2rem;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-size: 2.5rem;
  margin-bottom: -0.6rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-top: 1rem;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  text-decoration: none;
  margin-bottom: 10px
`;

const LinkMerge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  font-size: 15px;
`;

const InlineText = styled.span`
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  line-height: 1;
`;

export default function Welcome() {
  const UserIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LockIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  return (
    <BackgroundVectors>
      <Content>
        {/* <Cab> */}
          <Header
            variant="logo"
            logoComponent={<Icon width={40} height={50} />}
            onBackClick={() => console.log("Voltar clicado")}
          />
        {/* </Cab> */}
        <Text>
          <Title>Vamos começar a jornada!</Title>
          <Description>Inicie a sessão na sua conta</Description>
        </Text>
        <Inputs>
          <CustomInput
            label="Número de estudante"
            icon={<UserIcon />}
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder="ex: 2032742"
            type="email"
          />
          <CustomInput
            label="Palavra-passe"
            icon={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*************"
            isPassword={true}
          />
        </Inputs>
        <Links>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Fazer login"
            hasBorder={false}
            href="/login"
            onClick={() => console.log("Botão clicado")}
          />
          <LinkContainer>
            <StyledLink href="/reset">Esqueci-me do PIN de acesso</StyledLink>
            <LinkMerge>
              <InlineText> Não possui uma conta? - </InlineText>
              <StyledLink href="/tips">Criar conta</StyledLink>
            </LinkMerge>
          </LinkContainer>
        </Links>
      </Content>
    </BackgroundVectors>
  );
}
