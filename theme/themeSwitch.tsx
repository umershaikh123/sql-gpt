import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Button, Box } from '@mui/material'

// Import the custom theme and color schemes
import { theme, colorSchemes } from './theme'

const ThemeSwitcher = () => {
  const [selectedScheme, setSelectedScheme] = useState(0)

  const handleChangeTheme = (index: number) => {
    setSelectedScheme(index)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {colorSchemes.map((scheme, index) => (
          <Button
            key={scheme.name}
            variant={selectedScheme === index ? 'contained' : 'outlined'}
            style={{ backgroundColor: scheme.primary }}
            onClick={() => handleChangeTheme(index)}
          >
            {scheme.name}
          </Button>
        ))}
      </Box>
      {/* Render the rest of your application */}
    </ThemeProvider>
  )
}

export default ThemeSwitcher
