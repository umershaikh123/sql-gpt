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
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'

import { Theme, ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { ButtonTheme } from '@/theme/theme'

export const Navbar = () => {
  const pages = ['Home', 'Text-ER', 'ER-SQL', 'CSV-SQL']
  const settings = ['Logout']

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            background: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SQL-GPT
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  MenuListProps={{
                    sx: {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map(page => (
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        background: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ minWidth: '7rem' }}
                      >
                        {page}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SQL-GPT
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map(page => (
                  <Button
                    key={page}
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      px: 3,
                      ml: 3,
                      display: 'block',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  flexGrow: 0,
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="profile"
                      src="./Images/profile.jpg"
                      sx={{ width: '50px', height: '50px' }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  MenuListProps={{
                    sx: {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                  sx={{
                    mt: '45px',

                    '& .MuiMenuItem-root': {
                      backgroundColor: theme.palette.secondary.main, // Specify the desired background color
                    },
                    '& .MuiTypography-root': {
                      color: theme.palette.primary.main, // Specify the desired text color
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(setting => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{
                        '& .MuiMenuItem-root': {
                          backgroundColor: theme.palette.secondary.main, // Specify the desired background color
                        },
                        '& .MuiTypography-root': {
                          color: theme.palette.primary.main, // Specify the desired text color
                        },
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  )
}
