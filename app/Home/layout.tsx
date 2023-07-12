'use client'

import { Navbar } from '@/components/Navbar'
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
  Tooltip,
} from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>{children}</>
    </>
  )
}
