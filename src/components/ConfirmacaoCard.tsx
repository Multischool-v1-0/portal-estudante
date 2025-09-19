"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Arrow from "@/assets/icons/arrow_bt.svg";
import Image from "next/image";
import { getEnrollmentDetails } from "@/helper/findStudent";

const enrollment = getEnrollmentDetails("enr-1");

// Styled Components para a variante compacta
const CompactCardContainer = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  width: 90%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  gap: 22px;
`;

const CompactRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
`;

const CompactLabel = styled.span`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  opacity: 0.8;
`;

const CompactValue = styled.span<{ 
  bold?: boolean; 
  color?: 'primary' | 'success' | 'default';
}>`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => {
    switch (props.color) {
      case 'success':
        return '#16a34a'; // green-600
      case 'primary':
        return props.theme.colors.primary;
      default:
        return props.theme.colors.primary;
    }
  }};
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

const CompactDropdown = styled.ul`
  position: absolute;
  top: 26px;
  right: 0;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.foreground || '#e5e7eb'};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  width: 100px;
  z-index: 10;
`;

const CompactDropdownItem = styled.li`
  padding: 6px 12px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.foreground};
  cursor: pointer;
  transition: background 0.2s;
`;

// Componente da variante compacta
export function ConfirmacaoCardCompacto() {
  if (enrollment) {
    return (
      <CompactCardContainer>
        <CompactRow>
          <CompactLabel>Ano lectivo</CompactLabel>
          <CompactValue>2025/26</CompactValue>
        </CompactRow>

        <CompactRow>
          <CompactLabel>Semestre</CompactLabel>
          <CompactValue>VIº</CompactValue>
        </CompactRow>

        <CompactRow>
          <CompactLabel>Sala</CompactLabel>
          <CompactValue>BAA3 - 2º andar</CompactValue>
        </CompactRow>

        <CompactRow>
          <CompactLabel>Turma</CompactLabel>
          <CompactValue color="success">EINF-VI</CompactValue>
        </CompactRow>

        <CompactRow>
          <CompactLabel>Período</CompactLabel>
          <CompactValue>Manhã</CompactValue>
        </CompactRow>
      </CompactCardContainer>
    );
  }

  return null;
}

// Componente original (mantido para comparação)
export default function ConfirmacaoCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [periodo, setPeriodo] = useState("Manhã");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setPeriodo(value);
    setIsOpen(false);
  };
  
  if (enrollment) {
    return (
      <CardContainer>
        <Row>
          <Label>Nome</Label>
          <Value bold>{enrollment.student?.fullName}</Value>
        </Row>

        <Row>
          <Label>Ano lectivo</Label>
          <Value bold>2025/26</Value>
        </Row>

        <Row>
          <Label>Semestre</Label>
          <Value bold>VIº</Value>
        </Row>

        <Row>
          <Label>Ano académico</Label>
          <Value bold>3º</Value>
        </Row>

        <Row>
          <Label>Período</Label>
          <Value bold onClick={toggleDropdown}>
            {periodo} <Image src={Arrow} width={10} height={10} alt="" />
            {isOpen && (
              <Dropdown>
                <DropdownItem onClick={() => handleSelect("Manhã")}>
                  Manhã
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("Tarde")}>
                  Tarde
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("Noite")}>
                  Noite
                </DropdownItem>
              </Dropdown>
            )}
          </Value>
        </Row>

        <Row>
          <Label>Turma</Label>
          <Value bold style={{ color: "green" }}>
            EINF-VI
          </Value>
        </Row>

        <Row>
          <Label>Curso</Label>
          <Value bold>{enrollment.course?.name}</Value>
        </Row>
      </CardContainer>
    );
  }
}

// Styled Components originais (mantidos)
const CardContainer = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin: 30px 0 40px 0;
  gap: 23px
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
`;

const Value = styled.span<{ bold?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  position: relative;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 28px;
  right: 0;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  width: 120px;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background 0.2s;
`;