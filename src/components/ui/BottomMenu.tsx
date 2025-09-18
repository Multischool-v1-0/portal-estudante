"use client";

import styled from "styled-components";
import HomeSvg from "@/assets/icons/Home.svg";
import CreditCard from "@/assets/icons/creditcard.png";
import Multibot from "@/assets/icons/multiBot.png";
import User from "@/assets/icons/User.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const MenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 10px;
  z-index: 1000;
`;

const MenuItem = styled.button<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const MenuIconContainer = styled.div<{ $isActive?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive ? props.theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isActive ? "white" : "#999")};
  font-size: 20px;
`;

const MenuLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? props.theme.colors.primary : "#999")};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const HomeIcon = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const CardIcon = styled.div`
  width: 18px;
  height: 12px;
  border-radius: 3px;
  position: relative;
`;

const BotIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  position: relative;
`;

const ProfileIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: relative;
`;

export default function BottomMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Início", icon: HomeSvg, route: "/dashboard" },
    { label: "Cartões", icon: CreditCard, route: "/cartoes" },
    { label: "MultiBot", icon: Multibot, route: "/multibot" },
    { label: "Perfil", icon: User, route: "/perfil" },
  ];

  return (
    <MenuContainer>
      {menuItems.map((item) => {
        const isActive = pathname === item.route;

        return (
          <MenuItem
            key={item.label}
            $isActive={isActive}
            onClick={() => router.push(item.route)}
          >
            <MenuIconContainer $isActive={isActive}>
              <Image
                src={item.icon}
                alt={item.label}
                width={18}
                height={18}
              />
            </MenuIconContainer>
            <MenuLabel $isActive={isActive}>{item.label}</MenuLabel>
          </MenuItem>
        );
      })}
    </MenuContainer>
  );
}
