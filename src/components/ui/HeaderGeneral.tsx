"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserAvatar from "./Avatar";
import SideMenu from "./MenuLateral";
import { mockStudents } from "@/mocks/student";
import { getFirstAndLastName } from "@/utils/cutName";
import ArrowLeft from "@/assets/icons/arrow_left_simple.svg";

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.family.poppins};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
`;

const Title = styled.h1`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
  text-align: center;
`;

const MenuLateral = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.background_2};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    width: 18px;
    height: 2px;
    background: #000;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 2px;
    background: #666;
  }

  span::before {
    top: -6px;
  }

  span::after {
    top: 6px;
  }
`;

const BackButton = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type HeaderProps = {
  variant?: "default" | "withBack";
  title?: string;
};

export default function Header({ variant = "default", title }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const student = mockStudents.find((s) => s.id === "stu-1");
  if (!student) {
    return <p>Dados do estudante não encontrados</p>;
  }

  const studentFullName = getFirstAndLastName(student.fullName);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <HeaderContainer>
        <UserInfo>
          {variant === "default" ? (
            <>
              <Avatar>
                <UserAvatar size={45} name={student?.fullName} />
              </Avatar>
              <Title>Olá, {studentFullName}</Title>
            </>
          ) : (
            <>
              <BackButton onClick={() => router.back()}>
                <Image src={ArrowLeft} alt="Voltar" width={14} height={14} />
              </BackButton>
              <Title>{title}</Title>
            </>
          )}
          <MenuLateral onClick={handleMenuToggle}>
            <span />
          </MenuLateral>
        </UserInfo>
      </HeaderContainer>

      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
