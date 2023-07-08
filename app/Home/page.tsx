'use client'
import React from 'react'

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
export default function Page() {
  return (
    <>
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
    </>
  )
}
