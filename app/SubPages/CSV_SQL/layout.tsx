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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
