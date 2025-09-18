// components/ui/PaymentCard.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface PaymentCardProps {
  icon: StaticImageData | string;
  title: string;
  onClick?: () => void;   // ação personalizada
  link?: string;          // redirecionamento via Next.js
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 120px;
  border: 1px solid #e5e7eb; /* equivalente ao border-gray-200 */
  border-radius: 11px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  margin-top: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #1f2937; /* equivalente ao text-gray-800 */
`;

const PaymentCard: React.FC<PaymentCardProps> = ({ icon, title, onClick, link }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      router.push(link);
    }
  };

  return (
    <Card onClick={handleClick}>
      <IconWrapper>
        <Image src={icon} alt={title} width={20} height={20} />
      </IconWrapper>
      <Title>{title}</Title>
    </Card>
  );
};

export default PaymentCard;
