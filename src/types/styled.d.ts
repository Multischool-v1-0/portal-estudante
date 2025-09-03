import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primary_light: string
      primary_light_200: string
      secondary: string
      background: string
      background_2: string
      textWhite: string
      foreground: string
      muted: string
      textBlack: string
    }
    fonts: {
      family: {
        poppins: string
      }
      weight: {
        light: string
        regular: string
        semibold: string
        bold: string
        extrabold: string
        black: string
      }
    }
  }
}