import { createTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createTheme({
  palette: {
    primary: {
      dark: '#102A43',
      light: '#486581',
      main: '#243B53',
      contrastText: '#F0F4F8'
    },
    secondary: {
      dark: '#035388',
      light: '#2BB0ED',
      main: '#0B69A3',
      contrastText: '#D9E2EC'
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
    },
    grey: {
      100: '#F0F4F8',
      200: '#D9E2EC',
      300: '#BCCCDC',
      400: '#9FB3C8',
      500: '#829AB1',
      600: '#627D98',
      700: '#334E68',
      800: '#243B53',
      900: '#102A43'
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
