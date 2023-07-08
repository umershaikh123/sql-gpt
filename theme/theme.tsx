import { createTheme } from '@mui/material/styles'
import { PaletteColorOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface Palette {
    customScheme: PaletteColorOptions
    chatBackground: PaletteColorOptions
    border: PaletteColorOptions
  }
  interface PaletteOptions {
    customScheme?: PaletteColorOptions
    chatBackground?: PaletteColorOptions
    border?: PaletteColorOptions
  }
}

// Define your color schemes
const colorSchemes = [
  {
    name: 'Default',
    primary: '#FF4081',
    secondary: '#070204',
    background: '#000000',
    chatBackground: '#0D0609',
    border: '#92294C',
  },
  {
    name: 'Hacker',
    primary: '#40FF53',
    secondary: '#020703',
    chatBackground: '#060C06',
    border: '#01FFA4',
  },
  {
    name: 'Blue',
    primary: '#00A3FF',
    secondary: '#020307',
    chatBackground: '#06070C',
    border: '#00D1FF',
  },
]

// Define your custom theme
const theme = createTheme({
  palette: {
    // Set the default color scheme
    primary: {
      main: colorSchemes[0].primary,
    },
    secondary: {
      main: colorSchemes[0].secondary,
    },
    background: {
      default: colorSchemes[0].background,
    },
    chatBackground: {
      main: colorSchemes[0].chatBackground,
    },

    border: {
      main: colorSchemes[0].border,
    },

    // customScheme: {
    //   main: '#ABCDEF',
    // },
  },
})

const ButtonTheme = createTheme({
  palette: {
    primary: {
      main: colorSchemes[0].primary,
    },
  },
})

export { theme, colorSchemes, ButtonTheme }