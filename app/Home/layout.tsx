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
    <>
      <div ref={Ref}>{children}</div>
    </>
  )
}
