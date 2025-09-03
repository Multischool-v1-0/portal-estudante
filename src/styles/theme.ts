import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#6C5F8D",
    primary_light: "#C5A4DB",
    primary_light_200: "#D9D9EC",
    secondary: "#F19E0F",
    background: "#FFFFFF",
    background_2: "#F3F3F3",
    textWhite: "#FFFFFF",
    foreground: "#878787",
    muted: "#c4c4c4ff",
    textBlack: "#000000"
  },
  fonts: {
    family: {
      poppins: "var(--font-poppins), sans-serif",
    },
    weight: {
      light: "300",
      regular: "400",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
  },
};