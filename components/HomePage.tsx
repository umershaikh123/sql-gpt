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

import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'

function HomePage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container mx-auto  flex flex-col justify-center items-center py-[4rem]">
          <div className="flex flex-col space-y-[7rem]  mt-[0rem] justify-center items-center">
            <div className="flex flex-col w-1/2 space-y-6 lead">
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'worksans',
                  fontWeight: 500,

                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Effortlessly Convert Text to Schema
              </Typography>

              <Typography
                variant="subtitle2"
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  lineHeight: '1.75rem',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Our SQL GPT makes it incredibly simple to transform textual
                descriptions of database structures into visually appealing and
                intuitive ER diagrams. With just a few lines of code, you can
                instantly generate ER diagrams that accurately represent your
                data model, saving you time and effort in the database design
                process
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                href="/SubPages/Text_ER"
                sx={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  maxWidth: '8rem',
                }}
              >
                Get Started
              </Button>
            </div>

            {/* <div className="flex flex-col w-1/2 space-y-6 lead">
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'worksans',
                  fontWeight: 500,

                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Convert ER Diagrams to SQL with Ease
              </Typography>

              <Typography
                variant="subtitle2"
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  lineHeight: '1.75rem',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Simplify the process of translating ER diagrams into SQL scripts
                with our intuitive SQL GPT. Whether you need to create a new
                database or modify an existing one, our tool automates the
                conversion process, generating accurate SQL statements that
                reflect the relationships and constraints defined in your ER
                diagram. Save time and ensure consistency in your database
                development by leveraging the power of our ER diagram to SQL
                conversion feature.
              </Typography>
            </div> */}

            <div className="flex flex-col w-1/2 space-y-6 lead">
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'worksans',
                  fontWeight: 500,

                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Seamless Conversion from CSV to SQL
              </Typography>

              <Typography
                variant="subtitle2"
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: 'none', md: 'flex' },
                  lineHeight: '1.75rem',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Experience seamless and efficient conversion from CSV files to
                SQL databases using our SQL GPT. Our powerful tool enables you
                to effortlessly import and transform your structured data from
                CSV files into SQL queries and statements, allowing you to
                quickly populate or update your database tables with minimal
                hassle. Say goodbye to manual data entry and let our tool handle
                the heavy lifting for you
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                href="/SubPages/CSV_SQL"
                sx={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  maxWidth: '8rem',
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default HomePage
