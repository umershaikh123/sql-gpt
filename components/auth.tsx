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
  TextField,
  Paper,
  FormGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { Children } from 'react'
import { ChatHistory } from '@/components/chatHistory'
import { ChatModel } from '@/components/chatModel'
import { useCompletion, useChat } from 'ai/react'
import { useRouter } from 'next/navigation'

import { useParams } from 'next/navigation'
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Link from 'next/link'
import * as React from 'react'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'

import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// import Link from '@mui/material'
const mainPrimary = theme.palette.primary.main
const darkGreen = theme.palette.border.main

const CssTextField = styled(TextField)({
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.secondary.main,
  maxWidth: '20rem',

  '& input::selection': {
    color: theme.palette.primary.main, // Selected text color
    backgroundColor: theme.palette.secondary.main, // Selected text background color
  },

  '& input': {
    color: theme.palette.primary.main, // Selected text color
    backgroundColor: theme.palette.secondary.main, // Selected text background color
  },

  '& label': { color: theme.palette.border.main },
  '& helperText': { color: theme.palette.primary.main },
  '& .MuiInputBase-input': {
    color: theme.palette.primary.main,

    // width: '60%',
  },

  '& label.Mui-focused': {
    transition: 'all 0.3s ease-in-out',
    color: mainPrimary,
  },
  '& .MuiInput-underline:after': {
    transition: 'all 0.3s ease-in-out',
    borderBottomColor: mainPrimary,
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      transition: 'all 0.3s ease-in-out',
      borderColor: mainPrimary,
    },
    '&:hover fieldset': {
      transition: 'all 0.3s ease-in-out',
      borderColor: darkGreen,
    },
    '&.Mui-focused fieldset': {
      transition: 'all 0.3s ease-in-out',
      borderColor: darkGreen,
    },
  },
})

function Auth() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Stack justifyContent="center" alignItems="center">
          {/* <SingleColumnLayout style={{ maxWidth: 600 }}> */}
          {/* <Box className="mt-16 border-2 border-emerald rounded-xl" sx={{ px: 10, py: 4, boxShadow: '0px 4px 4px #40B1D4', width: '50rem' }}> */}

          <Box
            className="   rounded-xl  "
            sx={{
              px: 10,
              py: 4,
              mt: 20,
              maxWidth: '50rem',
              background: theme.palette.secondary.main,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Avatar
                alt="profile"
                src="/Images/ChatGPT_logo.svg"
                sx={{
                  width: '45px',
                  height: '45px',

                  mb: 2,
                }}
              />
            </Stack>
            <Typography
              variant="h4"
              sx={{
                mb: 4,

                color: theme.palette.primary.main,

                textDecoration: 'none',
              }}
            >
              Welcome to SQL GPT
            </Typography>
            {/* <H2>Sign up</H2> */}

            <Typography
              variant="subtitle2"
              sx={{
                mr: 2,
                mt: 1,
                mb: 4,
                flexGrow: 1,

                color: theme.palette.primary.main,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Login to your account to continue
            </Typography>

            <Stack sx={{}}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  href="/api/auth/login"
                  sx={{ minWidth: '1rem', width: '7rem' }}
                >
                  Log In
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minWidth: '1rem', width: '7rem' }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export { Auth }
