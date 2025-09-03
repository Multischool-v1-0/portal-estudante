"use client";
import styled from "styled-components";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/navigation";

// Tipos para as cores do theme
type ThemeColor = keyof DefaultTheme["colors"];

// Interface para as props do botão (estendida com ícone)
interface ButtonProps {
  bgColor?: ThemeColor | string;
  textColor?: string;
  text?: string;
  hasBorder?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "rounded";
  [key: string]: unknown;
}

// Interface para as props do styled component (estendida)
interface StyledButtonProps {
  bgColor: string;
  textColor: string;
  hasBorder: boolean;
  $hasIcon: boolean;
  $variant: "default" | "rounded";
}

// Styled Button Component com filtragem de props
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["bgColor", "textColor", "hasBorder", "$hasIcon", "$variant"].includes(
      prop
    ),
})<StyledButtonProps>`
  width: 100%;
  padding: 16px 24px;
  border-radius: ${(props) => (props.$variant === "rounded" ? "50px" : "16px")};
  font-size: 16px;
  font-weight: ${(props) => (props.$variant === "rounded" ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  display: ${(props) => (props.$hasIcon ? "flex" : "block")};
  align-items: ${(props) => (props.$hasIcon ? "center" : "initial")};
  justify-content: ${(props) => (props.$hasIcon ? "center" : "initial")};
  gap: ${(props) => (props.$hasIcon ? "8px" : "0")};

  /* Propriedades para remover estilos de link */
  text-decoration: none !important;
  color: ${(props) => props.textColor} !important;

  /* Reset de estilos padrão do botão */
  background: none;
  border: none;
  font-family: inherit;

  font-weight: ${(props) =>
    props.theme?.fonts?.weight?.semibold ||
    (props.$variant === "rounded" ? "600" : "500")};

  background-color: ${(props) => {
    if (props.theme?.colors && props.bgColor in props.theme.colors) {
      return props.theme.colors[
        props.bgColor as keyof typeof props.theme.colors
      ];
    }
    return props.bgColor;
  }};

  border: ${(props) =>
    props.hasBorder
      ? `2px solid ${props.theme?.colors?.primary || "#6B46C1"}`
      : "none"};

  &:hover {
    transform: translateY(
      ${(props) => (props.$variant === "rounded" ? "-1px" : "0")}
    );
    box-shadow: ${(props) =>
      props.$variant === "rounded"
        ? "0 8px 20px rgba(107, 70, 193, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.1)"};
    color: ${(props) => props.textColor} !important;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: ${(props) => props.textColor} !important;
  }

  &:focus {
    color: ${(props) => props.textColor} !important;
    outline: none;
  }

  &:visited {
    color: ${(props) => props.textColor} !important;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    color: ${(props) => props.textColor} !important;
  }

  /* Garantir que links filhos também não tenham estilos */
  a {
    text-decoration: none !important;
    color: inherit !important;
  }
`;

// Componente Button reutilizável (versão estendida)
const Button: React.FC<ButtonProps> = ({
  bgColor = "primary",
  textColor = "#ffffff",
  text = "Botão Multischool",
  hasBorder = false,
  onClick,
  disabled = false,
  href,
  icon,
  iconPosition = "right",
  variant = "default",
  ...props
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      bgColor={bgColor}
      textColor={textColor}
      hasBorder={hasBorder}
      onClick={handleClick}
      disabled={disabled}
      $hasIcon={!!icon}
      $variant={variant}
      {...props}
    >
      {iconPosition === "left" && icon}
      {text}
      {iconPosition === "right" && icon}
    </StyledButton>
  );
};

export default Button;
