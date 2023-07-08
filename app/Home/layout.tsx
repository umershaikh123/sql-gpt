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
      <div className=" text-white text-xl">Home LAYOUT</div>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 5,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'worksans',
          fontWeight: 800,

          letterSpacing: '.2rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        SQL-GPT
      </Typography>

      <>{children}</>
    </>
  )
}
