import React from "react";
import styled from "styled-components";

interface HeaderProps {
  variant?: "default" | "with-back";
  onBack?: () => void;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  padding: 20px 0;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "←";
    font-size: 24px;
    color: #6b7280;
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin: 20px 0 0 0;
  letter-spacing: 0.2px;
  text-align: center;
`;

export const Header: React.FC<HeaderProps> = ({
  variant = "default",
  onBack,
}) => {
  return (
    <HeaderContainer>
      {variant === "with-back" && <BackButton onClick={onBack} />}
      <Title>EXAME DE ACESSO 2025/26</Title>
    </HeaderContainer>
  );
};
