'use client'

import { Navbar } from '../components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ReactNode } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Auth } from '@/components/auth'
import HomePage from '@/components/HomePage'
import { useState, CSSProperties, useRef, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import BarLoader from 'react-spinners/BarLoader'
import PulseLoader from 'react-spinners/PulseLoader'
import anime from 'animejs/lib/anime.es.js'
import { motion } from 'framer-motion'

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  // borderColor: "red",
}

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type IndexProps = {
  children: ReactNode
}

export function Index({ children }: IndexProps) {
  const { user, error, isLoading } = useUser()
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

  if (isLoading) {
    return (
      <>
        <div className="relative w-[100rem] h-[90vh]">
          <div className="absolute top-[45%] left-[55%]">
            <PulseLoader color="#FF4081" size="18px" />
          </div>
        </div>
      </>
    )
  }

  if (error) return <div>{error.message}</div>

  if (!user) {
    return (
      <div className=" container mx-auto" ref={Ref}>
        <Navbar />

        {children}
      </div>
    )
  } else {
    return (
      <>
        <Auth />
      </>
    )
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Ref = useRef<any>(null)

  useEffect(() => {
    const element = Ref.current

    if (element) {
      anime({
        targets: element,

        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutSine',
      })
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>SQL GPT</title>
      </head>
      <UserProvider>
        <body className={inter.className} ref={Ref}>
          <Index>{children}</Index>
        </body>
      </UserProvider>
    </html>
  )
}

{
  /* <>{children}</> */
}

{
  /* <link href="/Images/vercel.svg" sizes="180x180" /> */
}
