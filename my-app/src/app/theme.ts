import { createTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createTheme({
  palette: {
    primary: {
      dark: '#0E7C86',
      light: '#54D1DB',
      main: '#14919B',
      contrastText: '#F0F4F8'
    },
    secondary: {
      dark: '#2D3A8C',
      light: '#647ACB',
      main: '#4055A8',
      contrastText: '#F0F4F8'
    },
    neutral: {
      n100: '#F0F4F8',
      n200: '#D9E2EC',
      n300: '#BCCCDC',
      n400: '#9FB3C8',
      n500: '#829AB1',
      n600: '#627D98',
      n700: '#334E68',
      n800: '#243B53',
      n900: '#102A43'
    }
  },
  typography: {
    h1: {
      fontSize: 30,
      fontWeight: 600
    },
    h2: {
      fontSize: 24,
      fontWeight: 400
    },
    h3: {
      fontSize: 20,
      fontWeight: 400
    },
    h4: {
      fontSize: '0.8rem'
    },
    body1: {
      fontSize: 18,
      fontWeight: 400
    }
  }
})

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    neutral: {
      n100: string
      n200: string
      n300: string
      n400: string
      n500: string
      n600: string
      n700: string
      n800: string
      n900: string
    }
  }
  interface PaletteOptions {
    neutral: {
      n100: string
      n200: string
      n300: string
      n400: string
      n500: string
      n600: string
      n700: string
      n800: string
      n900: string
    }
  }
}

theme = responsiveFontSizes(theme)

export default theme
