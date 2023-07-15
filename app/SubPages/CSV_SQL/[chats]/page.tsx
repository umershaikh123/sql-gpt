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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { Children } from 'react'
import { ChatHistory } from '@/components/chatHistory'
import { ChatModel } from '@/components/chatModel'

import { useParams } from 'next/navigation'
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCompletion, useChat } from 'ai/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { UserProvider } from '@auth0/nextjs-auth0/client'
const mainPrimary = theme.palette.primary.main
const darkGreen = theme.palette.border.main

const CssTextField = styled(TextField)({
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.secondary.main,

  '& label': { color: theme.palette.border.main },
  '& helperText': { color: theme.palette.primary.main },
  '& .MuiInputBase-input': {
    color: theme.palette.primary.main,
    height: '3rem',
    width: '70ch',
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

interface Message {
  id: string
  role: 'function' | 'user' | 'assistant' | 'system'
  content: string
}

export const postMessage = async (ChatId: string, Messages: Message[]) => {
  try {
    const response = await fetch(`/api/data/TEXT_ER/${ChatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Messages }),
    })

    if (response.ok) {
      console.log('Messages saved successfully')
    } else {
      console.log('Error saving messages')
    }
  } catch (error) {
    console.log('Error saving messages')
  }
}

const Messages: Message[] = [
  { id: '1', role: 'user', content: 'hey' },
  { id: '2', role: 'assistant', content: 'Hello! How can I assist you today?' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
  { id: '3', role: 'user', content: 'just testing my new application' },
]

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat()
  const { user, error, isLoading } = useUser()
  const [isLoaded, setIsLoaded] = useState(false)

  const params = useParams()
  const chatId = params.chats

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch('/api/data/TEXT_ER/message')
        const chats = await response.json()

        const chat = chats.find(chat => chat.id === chatId)

        console.log('chat.messages ', chat.messages.Messages)
        if (chat && chat.messages && chat.messages.Messages) {
          setMessages(chat.messages.Messages)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    loadMessages()
  }, [chatId])

  const handleButtonSubmit = async (event: any) => {
    event.preventDefault()
    handleSubmit(event)

    setMessages(messages)
    await postMessage(chatId, messages)
  }

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      handleButtonSubmit(event)
    }
  }
  return (
    <>
      <Box sx={{ p: 4 }}>
        <Stack
          direction="column"
          alignItems="start"
          justifyContent="space-between"
          spacing={0}
          sx={{
            py: 2,

            height: '40rem',
            overflow: 'auto',
          }}
        >
          {/* conversation */}
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
            sx={{ overflow: 'auto' }}
          >
            {messages.map(m => (
              <div key={m.id} className=" justify-start bg-[#1A0B11]  w-[75ch]">
                {m.role === 'user' ? (
                  <div className="  ">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        py: 1.5,

                        px: 2,

                        width: '100%',
                        backgroundColor: '#1A0B11',
                      }}
                    >
                      <div className=" ">
                        <Avatar
                          alt="Remy Sharp"
                          src={user?.picture || '/Images/Customer.svg'}
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-medium ">
                        {m.content}
                      </div>
                    </Stack>
                  </div>
                ) : (
                  <div className=" ">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        px: 2,
                        py: 1.5,

                        width: '100%',

                        backgroundColor: '#140F11',
                      }}
                    >
                      <div className=" ">
                        <Avatar
                          alt="Remy Sharp"
                          src={'/Images/gptIcon.svg'}
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-medium">
                        {m.content}
                      </div>
                    </Stack>
                  </div>
                )}
              </div>
            ))}
          </Stack>

          {/* end two buttons  */}
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <form onSubmit={handleButtonSubmit}>
              <CssTextField
                id="outlined-basic"
                label="Prompt"
                maxRows={10}
                multiline
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <Button type="submit">
                        <SendIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

const ChatPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    </>
  )
}

export default function Page() {
  return (
    <>
      <ChatPage />
    </>
  )
}
