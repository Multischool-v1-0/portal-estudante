'use client'
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animações
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 10px #ff4757,
      0 0 20px #ff4757,
      0 0 30px #ff4757;
  }
  50% {
    text-shadow: 
      0 0 10px #5352ed,
      0 0 20px #5352ed,
      0 0 30px #5352ed;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title404 = styled.h1`
  font-size: 10rem;
  font-weight: bold;
  margin: 0;
  animation: ${bounce} 2s infinite, ${glow} 3s infinite;
  user-select: none;
  letter-spacing: -10px;
  
  @media (max-width: 768px) {
    font-size: 7rem;
    letter-spacing: -5px;
  }
  
  @media (max-width: 480px) {
    font-size: 5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  margin: 30px 0 15px 0;
  font-weight: 300;
  animation: ${fadeIn} 1s ease 0.5s both;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease 1s both;
  max-width: 500px;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  animation: ${fadeIn} 1s ease 1.5s both;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 15px 30px;
  border-radius: 30px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: ${pulse} 3s infinite;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const DecorativeText = styled.div`
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.1;
  font-weight: bold;
  animation: ${fadeIn} 2s ease 2s both;
  
  &.top-left {
    top: 10%;
    left: 10%;
  }
  
  &.top-right {
    top: 15%;
    right: 10%;
  }
  
  &.bottom-left {
    bottom: 15%;
    left: 15%;
  }
  
  &.bottom-right {
    bottom: 10%;
    right: 15%;
  }
`;

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container>
      {/* <DecorativeText className="top-left">ERRO</DecorativeText> */}
      {/* <DecorativeText className="top-right">PÁGINA</DecorativeText> */}
      {/* <DecorativeText className="bottom-left">NÃO</DecorativeText> */}
      {/* <DecorativeText className="bottom-right">ENCONTRADA</DecorativeText> */}
      
      <Title404>404</Title404>
      <Subtitle>Página não encontrada</Subtitle>
      <Description>
        Oops! Esta página não existe. 
        Que tal voltar ao início ou tentar a página anterior?
      </Description>
      
      <ButtonContainer>
        {/* <Button onClick={handleGoHome}>Voltar ao Início</Button> */}
        {/* <Button onClick={handleGoBack}>Página Anterior</Button> */}
      </ButtonContainer>
    </Container>
  );
}