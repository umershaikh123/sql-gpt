'use client'

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  makeStyles,
  Stack,
  Tooltip,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>
        <ThemeProvider theme={theme}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={5}
            sx={{ p: 5 }}
          >
            <Box
              sx={{
                flexGrow: 0,
                flexBasis: '20rem',
                flexShrink: 10,
                height: '80vh',

                background: theme.palette.secondary.main,
              }}
            >
              BOX1
            </Box>

            <Box
              sx={{
                flexGrow: 2,
                flexBasis: '60rem',
                flexShrink: 3,

                height: '80vh',
                background: theme.palette.secondary.main,
              }}
            >
              BOX2
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                flexBasis: '20rem',
                flexShrink: 10,

                height: '80vh',
                background: theme.palette.secondary.main,
              }}
            >
              BOX3
            </Box>
          </Stack>
        </ThemeProvider>
      </>
    </>
  )
}
