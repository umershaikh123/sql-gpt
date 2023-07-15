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

import anime from 'animejs/lib/anime.es.js'
import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const Ref = useRef<any>(null)

  useEffect(() => {
    const element = Ref.current

    if (element) {
      anime({
        targets: element,

        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutSine',
      })
    }
  }, [])

  return (
    <div ref={Ref}>
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
              height: '75vh',

              background: theme.palette.secondary.main,
            }}
          >
            <ChatHistory url={'Text_ER'} type={'TextER'} />
          </Box>

          <Box
            sx={{
              flexGrow: 2,
              flexBasis: '70rem',
              flexShrink: 3,

              height: '75vh',
              background: theme.palette.secondary.main,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '24px',
                whiteSpace: 'nowrap',
              }}
            >
              Text to ER
            </Typography>
            {children}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              flexBasis: '20rem',
              flexShrink: 10,

              height: '75vh',
              background: theme.palette.secondary.main,
            }}
          >
            <ChatModel />
          </Box>
        </Stack>
      </ThemeProvider>
    </div>
  )
}

// fetch('/api/mysqlDB')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to fetch data')
//     }
//     return response.json()
//   })
//   .then(data => {
//     // Handle the response data
//     console.log(data)
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error(error)
//   })
