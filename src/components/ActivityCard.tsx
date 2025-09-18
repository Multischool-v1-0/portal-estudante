"use client";

import React from "react";
import styled from "styled-components";

// PRIMEIRA VARIANTE - ActivityCard (original com datas)
interface ActivityCardProps {
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido" | "vencida" | "publicada";
  date: string;
  avatar?: string;
  onClick: () => void;
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 10px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${(props) => props.theme.colors.primary};

  &:active {
    transform: translateY(0);
  }
`;

const AvatarContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c5a4db, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const AvatarFallback = styled.div`
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const InstitutionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Institution = styled.span`
  font-size: 13px;
  color: #666;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const StatusBadge = styled.span<{ status: string }>`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "pendente":
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case "em_curso":
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case "concluido":
        return `
          background: #e0e7ff;
          color: #4f46e5;
        `;
      case "publicada":
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 12px;
`;

const DateText = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "em_atraso":
        return `color: #ef4444;`;
      case "pagamento_adiado":
        return `color: #00C3D0;`;
      case "pendente":
        return `color: #f59e0b;`;
      case "inadimplente":
        return `color: #dc2626;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const getStatusText = (status: string) => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "em_curso":
      return "Em curso";
    case "concluido":
      return "Concluído";
    case "publicada":
      return "Publicada";
    default:
      return "Pendente";
  }
};

const getInitials = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  institution,
  status,
  date,
  avatar,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick}>
      <AvatarContainer>
        {avatar ? (
          <AvatarImage src={avatar} alt={title} />
        ) : (
          <AvatarFallback>{getInitials(title)}</AvatarFallback>
        )}
      </AvatarContainer>

      <ContentContainer>
        <Title>{title}</Title>
        <InstitutionContainer>
          <Institution>{institution}</Institution>
          <span style={{ color: "#d1d5db" }}>-</span>
          <StatusBadge status={status}>{getStatusText(status)}</StatusBadge>
        </InstitutionContainer>
      </ContentContainer>

      <DateContainer>
        <DateText status={status}>{date}</DateText>
      </DateContainer>
    </CardContainer>
  );
};

// SEGUNDA VARIANTE - SimpleCard
interface SimpleCardProps {
  title: string;
  status: "em_atraso" | "pagamento_adiado" | "pendente" | "inadimplente";
  amount?: string;
  avatar?: string;
  onClick: () => void;
}

const SimpleCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 9px 16px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: translateY(0);
  }
`;

const SimpleTitle = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const StatusText = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 400;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "em_atraso":
        return `color: #ef4444;`;
      case "pagamento_adiado":
        return `color: #00C3D0;`;
      case "pendente":
        return `color: #f59e0b;`;
      case "inadimplente":
        return `color: #dc2626;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const getSimpleStatusText = (status: string) => {
  switch (status) {
    case "em_atraso":
      return "Em atraso";
    case "pagamento_adiado":
      return "Pagamento adiado";
    case "pendente":
      return "Pendente";
    case "inadimplente":
      return "Inadimplente";
    default:
      return "Pendente";
  }
};

export const SimpleCard: React.FC<SimpleCardProps> = ({
  title,
  status,
  amount,
  avatar,
  onClick,
}) => {
  return (
    <SimpleCardContainer onClick={onClick}>
      <AvatarContainer>
        {avatar ? (
          <AvatarImage src={avatar} alt={title} />
        ) : (
          <AvatarFallback>{getInitials(title)}</AvatarFallback>
        )}
      </AvatarContainer>

      <ContentContainer>
        <SimpleTitle>{title}</SimpleTitle>
        <StatusText status={status}>{getSimpleStatusText(status)}</StatusText>
      </ContentContainer>
      {amount && (
        <DateContainer>
          <DateText status={status}>{amount}</DateText>
        </DateContainer>
      )}
    </SimpleCardContainer>
  );
};
