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
  Stack,
} from '@mui/material'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import { ButtonTheme } from '@/theme/theme'
import { ThemeProvider } from '@mui/material'

import { TextER, CsvSQL, ErSQL } from './NewChatButton'

interface ChatHistoryProps {
  url: string
  type: string
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ url, type }) => {
  return (
    <>
      <Box sx={{ mt: 2, mx: 2 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          spacing={5}
          sx={{
            p: 3,
            minHeight: '70vh',
            height: '100%',
            overflow: 'auto',
            // width: { xs: '80%', xl: '100%' },
          }}
        >
          {/* start buttons */}
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            {type === 'TextER' && (
              <>
                <TextER url={url} />
              </>
            )}

            {type === 'ErSQL' && (
              <>
                <ErSQL url={url} />
              </>
            )}

            {type === 'CsvSQL' && (
              <>
                <CsvSQL url={url} />
              </>
            )}

            {/* <NewChatButton url={url} /> */}
          </Stack>

          <div className=" jus"></div>

          {/* end two buttons  */}
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{}}
          >
            {/* <Button
              variant="outlined"
              color="primary"
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{
                fontSize: '14px',
                textTransform: 'capitalize',
                minWidth: '12rem',
              }}
            >
              Clear Converstations
            </Button> */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GitHubIcon />}
              sx={{
                fontSize: '14px',
                textTransform: 'capitalize',
                minWidth: '12rem',
              }}
            >
              Star on Github
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
