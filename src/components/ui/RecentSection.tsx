"use client";

import styled from "styled-components";
import Money from "@/assets/icons/Money.png";
import Pause from "@/assets/icons/pause.png";
import Image from "next/image";
import { theme } from "@/styles/theme";

export type SectionType = "recentes" | "pendencias" | "movimentos";
export type CardType = "credit" | "student";

interface RecentSectionProps {
  variant?: SectionType;
  activeCard?: CardType;
  showHeader?: boolean;
  title?: string;
}

const Section = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.primary_light_100};
  margin-bottom: 40px;
`;

const SectionHeader = styled.div<{ $isMovimentos?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.$isMovimentos ? "16px 20px" : "20px 20px 15px"};
  background: transparent;
  border-bottom: ${(props) => props.$isMovimentos ? "1px solid #e9ecef" : "none"};
`;

const SectionTitle = styled.h3<{ $isMovimentos?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.$isMovimentos ? theme.colors.primary : "#333"};
  margin: 0;
`;

const ViewMore = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TransactionList = styled.div`
  padding: 0 20px 20px;
  max-height: calc(4 * 64px);
  overflow-y: auto;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a7fb8;
  font-size: 18px;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: #333;
  margin-bottom: 2px;
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const TransactionAmount = styled.div<{ $isPositive?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => (props.$isPositive ? "#4CAF50" : "#FF5252")};
`;

const TransactionStatus = styled.div<{ $statusColor?: string }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => {
    switch (props.$statusColor) {
      case "success":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "error":
        return "#FF5252";
      default:
        return "#999";
    }
  }};
`;

// Dados para cartão de crédito
const creditRecentesData = [
  {
    title: "Propina Junho",
    date: "06.06.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Julho",
    date: "05.07.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Bônus plataforma",
    date: "06.06.2024",
    amount: "+10.900,50 kz",
    isPositive: true,
  },
  {
    title: "Pag. Estágio",
    date: "06.06.2024",
    amount: "+45.600,50 kz",
    isPositive: true,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
];

const creditPendenciasData = [
  {
    title: "Crédito bancário",
    date: "Externo",
    status: "200.000,00 kz",
    statusColor: "warning",
  },
  {
    title: "Declaração C/ Notas",
    date: "Irregularidade",
    status: "0 kz",
    statusColor: "success",
  },
  {
    title: "Solicitação de adiamento...",
    date: "Secretaria acadêmica",
    status: "Rejeitada",
    statusColor: "error",
  },
  {
    title: "Declaração C/ Notas",
    date: "Secretaria acadêmica",
    status: "Irregularidade",
    statusColor: "error",
  },
  {
    title: "Candidatura Bolsa",
    date: "Externo",
    status: "Em falta",
    statusColor: "warning",
  },
  {
    title: "Candidatura Bolsa",
    date: "Interno",
    status: "Em falta",
    statusColor: "warning",
  },
];

// Dados para movimentos (como na imagem)
const movimentosData = [
  {
    title: "Propina Julho",
    date: "05.07.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Junho",
    date: "06.06.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Bônus plataforma",
    date: "06.06.2024",
    amount: "+10.900,50 kz",
    isPositive: true,
  },
  {
    title: "Pag. Estágio",
    date: "06.06.2024",
    amount: "+45.600,50 kz",
    isPositive: true,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
];

// Dados para cartão de estudante
const studentRecentesData = [
  {
    title: "Biblioteca",
    date: "05.07.2024 às 12:45:50",
    amount: "há 1h",
    isPositive: true,
  },
  {
    title: "Refeitório",
    date: "05.07.2024 às 10:10:05",
    amount: "há 2h",
    isPositive: true,
  },
  {
    title: "LABPRO P2-01",
    date: "05.07.2024 às 09:05:07",
    amount: "há 4h",
    isPositive: true,
  },
  {
    title: "Mini auditório 1",
    date: "03.07.2024 às 12:12:15",
    amount: "há 2d",
    isPositive: true,
  },
  {
    title: "Cafetaria",
    date: "01.05.2024 às 10:20:25",
    amount: "há 2m",
    isPositive: true,
  },
];

const studentPendenciasData = [
  {
    title: "Recurso de Estrutura de dados",
    date: "Secretaria acadêmica",
    status: "Pendente",
    statusColor: "warning",
  },
  {
    title: "Nota 1PP - Gestão de Projectos",
    date: "Sistema acadêmico",
    status: "Disponível",
    statusColor: "success",
  },
  {
    title: "Exame de Programação III",
    date: "15 de julho, quarta-feira",
    status: "Agendado",
    statusColor: "warning",
  },
  {
    title: "Entrega de TCC",
    date: "Coordenação do curso",
    status: "Em atraso",
    statusColor: "error",
  },
  {
    title: "Matrícula 2º Semestre",
    date: "Secretaria acadêmica",
    status: "Aberta",
    statusColor: "success",
  },
];

export default function RecentSection({ 
  variant = "recentes", 
  activeCard = "credit",
  showHeader = true,
  title 
}: RecentSectionProps) {
  const isRecentes = variant === "recentes";
  const isMovimentos = variant === "movimentos";
  const isStudentCard = activeCard === "student";
  
  // Seleciona os dados baseado no cartão ativo e seção
  let data;
  if (isMovimentos) {
    data = movimentosData;
  } else if (isRecentes) {
    data = isStudentCard ? studentRecentesData : creditRecentesData;
  } else {
    data = isStudentCard ? studentPendenciasData : creditPendenciasData;
  }
  
  const sectionTitle = title || (isMovimentos ? "Movimentos" : isRecentes ? "Recentes" : "Pendências");
  const icon = isRecentes || isMovimentos ? Money : Pause;

  return (
    <Section>
      {showHeader && (
        <SectionHeader $isMovimentos={isMovimentos}>
          {isMovimentos ? (
            <HeaderRow>
              <SectionTitle $isMovimentos>Descrição</SectionTitle>
              <SectionTitle $isMovimentos>Montante</SectionTitle>
            </HeaderRow>
          ) : (
            <>
              <SectionTitle>{sectionTitle}</SectionTitle>
              <ViewMore>Ver mais</ViewMore>
            </>
          )}
        </SectionHeader>
      )}

      <TransactionList>
        {data.map((item, index) => (
          <TransactionItem key={index}>
            <TransactionIcon>
              <Image
                src={icon}
                alt={`Ícone de ${sectionTitle.toLowerCase()}`}
                width={20}
                height={20}
              />
            </TransactionIcon>
            <TransactionInfo>
              <TransactionTitle>{item.title}</TransactionTitle>
              <TransactionDate>{item.date}</TransactionDate>
            </TransactionInfo>
            {isRecentes || isMovimentos ? (
              <TransactionAmount $isPositive={(item as any).isPositive}>
                {(item as any).amount}
              </TransactionAmount>
            ) : (
              <TransactionStatus $statusColor={(item as any).statusColor}>
                {(item as any).status}
              </TransactionStatus>
            )}
          </TransactionItem>
        ))}
      </TransactionList>
    </Section>
  );
}