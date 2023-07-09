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
import { Children } from 'react'
import { ChatHistory } from '@/components/chatHistory'
import { ChatModel } from '@/components/chatModel'

export default function Page() {
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
              <ChatHistory />
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
              {' '}
              Text to ER
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
              <ChatModel />
            </Box>
          </Stack>
        </ThemeProvider>
      </>
    </>
  )
}
