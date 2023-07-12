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
  maxWidth: '35rem',
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

export function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
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
                mt: 3,
                maxWidth: '50rem',
                background: theme.palette.secondary.main,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,

                  color: theme.palette.primary.main,

                  textDecoration: 'none',
                }}
              >
                Sign Up
              </Typography>
              {/* <H2>Sign up</H2> */}

              <Stack sx={{}}>
                <FormGroup>
                  <CssTextField
                    label="Name"
                    id="username"
                    style={{ marginTop: 8 }}
                    name="name"
                    // value={}
                    // onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mr: 2,
                      mt: 1,
                      mb: 4,
                      flexGrow: 1,

                      color: theme.palette.primary.main,

                      textDecoration: 'none',
                    }}
                  >
                    your accounts username
                  </Typography>

                  <CssTextField
                    label="Email"
                    id="username"
                    style={{ marginTop: 8 }}
                    name="name"
                    // value={}
                    // onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mr: 2,
                      mt: 1,
                      mb: 4,
                      flexGrow: 1,

                      color: theme.palette.primary.main,

                      textDecoration: 'none',
                    }}
                  >
                    your accounts Email
                  </Typography>

                  <CssTextField
                    label="Password"
                    id="password"
                    type="password"
                    // value={state.password}
                    name="password"
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment
                    //       position="end"
                    //       sx={{ color: theme.palette.primary.main }}
                    //     >
                    //       <Button type="submit">
                    //         <VisibilityIcon />
                    //       </Button>
                    //     </InputAdornment>
                    //   ),
                    // }}
                    // onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mr: 2,
                      mt: 1,
                      mb: 4,
                      flexGrow: 1,

                      color: theme.palette.primary.main,

                      textDecoration: 'none',
                    }}
                  >
                    your accounts password
                  </Typography>

                  <CssTextField
                    label="Confirm Password"
                    id="password"
                    type="password"
                    // value={state.password}
                    name="password"
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment
                    //       position="end"
                    //       sx={{ color: theme.palette.primary.main }}
                    //     >
                    //       <Button type="submit">
                    //         <VisibilityIcon />
                    //       </Button>
                    //     </InputAdornment>
                    //   ),
                    // }}
                    // onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mr: 2,
                      mt: 1,
                      mb: 4,
                      flexGrow: 1,

                      color: theme.palette.primary.main,

                      textDecoration: 'none',
                    }}
                  >
                    Confirm your accounts password
                  </Typography>
                </FormGroup>

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minWidth: '1rem', mb: 4 }}
                >
                  Register
                </Button>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ px: 4 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    font: 300,
                  }}
                >
                  Already have an account?
                  {/* <Link href="/sign-up"   sx={{ color: blue, ':hover': { color: 'white' }, transition: '300ms ease-in-out' }}> */}
                </Typography>

                <Link href="/"> Log In </Link>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  )
}
{
  /* 
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <CssOutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl> */
}
