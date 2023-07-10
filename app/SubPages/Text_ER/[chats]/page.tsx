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

const Chat = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
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
        </Box>
      </ThemeProvider>
    </>
  )
}

const ChatPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    </>
  )
}

export default function Page() {
  return (
    <>
      <ChatPage />
    </>
  )
}
