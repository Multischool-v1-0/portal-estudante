"use client";

import React from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { HeroCard } from "@/components/candidato/HeroCard";
import { OptionCard } from "@/components/candidato/OptionCard";
import { useRouter } from "next/navigation";
import Bg from "@/assets/backgrounds/candidato/bg_home.png";

const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  height: 120vh;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 20px 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  grid-row-gap: 15px; 
  height: 240px;

  & > :first-child {
    grid-row: 1 / 3;
  }

  & > :nth-child(2) {
    grid-row: 1;
  }

  & > :last-child {
    grid-column: 2;
    grid-row: 2;
  }

  }
  `;
  //   @media (max-width: 480px) {
  //     grid-template-columns: 1fr;
  //     grid-template-rows: auto auto auto;
  //     height: auto;
  
  //     & > :first-child {
  //       grid-row: auto;
  //     }
  
  //     & > :nth-child(2) {
  //       grid-row: auto;
  //     }
  
  //     & > :last-child {
  //       grid-column: auto;
  //       grid-row: auto;
  //     }

export default function ExameAcessoPage() {
  const router = useRouter();
  const handleBackClick = () => {
    console.log("Back clicked");
    // Implementar navegação
  };

  const handleCardClick = (cardName: string, variant: string) => {
    console.log(`${cardName} clicked, variant: ${variant}`);

    // Redirecionamento com base na variante
    switch (variant) {
      case "primary":
        router.push("/candidato/exame_acesso");
        break;
      case "secondary":
        router.push("/preparatorio-topicos");
        break;
      case "disabled":
        router.push("/nota-exame");
        break;
      default:
        console.log("Variante não reconhecida:", variant);
    }
  };

  return (
    <>
      

      <Container>
        <Header variant="default" />

        <HeroCard
          title="Preparatório Multischool Online"
          subtitle="Formação à distância para o teu sucesso no exame de acesso."
          date="20 de agosto"
          imageUrl={Bg.src}
        />

        <SectionTitle>Selecione uma opção</SectionTitle>

        <CardGrid>
          <OptionCard
            variant="primary"
            status="disponivel"
            title="Exame de acesso"
            date="02 - 04 de Agosto"
            subtitle="08h às 10h30"
            size="tall"
            onClick={() => handleCardClick("Exame de acesso", "primary")}
          />

          <div>
            <OptionCard
              variant="secondary"
              status="disponivel"
              title="Preparatório e Tópicos"
              onClick={() =>
                handleCardClick("Preparatório e Tópicos", "secondary")
              }
            />
          </div>

          <OptionCard
            variant="disabled"
            status="indisponivel"
            title="Nota do Exame de Acesso"
            onClick={() => handleCardClick("Nota do Exame", "disabled")}
          />
        </CardGrid>
      </Container>
    </>
  );
}
