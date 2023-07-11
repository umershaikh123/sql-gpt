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
  FormGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { Children } from 'react'
import { ChatHistory } from '@/components/chatHistory'
import { ChatModel } from '@/components/chatModel'
import { useCompletion, useChat } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment'
import Image from 'next/image'

const mainPrimary = theme.palette.primary.main
const darkGreen = theme.palette.border.main

const CssTextField = styled(TextField)({
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.background.main,

  '& label': { color: theme.palette.border.main },
  '& helperText': { color: theme.palette.primary.main },
  '& .MuiInputBase-input': {
    color: theme.palette.primary.main,
    height: '3rem',
    width: '60rem',
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

const Chat = () => {
  // const { completion, input, handleInputChange, handleSubmit } = useCompletion()

  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const params = useParams()
  const chatId = params.chats

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
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
          >
            {messages.map(m => (
              <div key={m.id}>
                {m.role === 'user' ? (
                  <div className=" w-[68rem]">
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
                          src={'/Images/profile.jpg'}
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-medium ">
                        {m.content}
                      </div>
                    </Stack>
                  </div>
                ) : (
                  <div className=" w-[68rem]">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        px: 2,
                        py: 1.5,

                        width: '100%',
                        // backgroundColor: theme.palette.chatBackground.main,
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
            sx={{}}
          >
            <form onSubmit={handleSubmit}>
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
      {/* <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch border-2">
        {messages.map(m => (
          <div key={m.id}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <label>
            Say something...
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div> */}
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
{
  /* prompt */
}
{
  /* // color: theme.palette.primary.main, */
}
{
  /* <TextField
              id="outlined-basic"
              label="Prompt"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <SendIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{
                transition: 'all 0.3s ease-in-out',
                width: '65rem',

                '& .MuiTextField-root': {
                  m: 1,
                  width: '25ch',
                },

                '& label': {
                  color: theme.palette.border.main,
                },

                '& .MuiInputBase-input': {
                  color: theme.palette.primary.main,
                  height: '4rem',
                },

                '& label.Mui-focused': {
                  transition: 'all 0.3s ease-in-out',
                  borderColor: theme.palette.border.main,
                },
                '& .MuiInput-underline:after': {
                  transition: 'all 0.3s ease-in-out',
                  borderBottomColor: theme.palette.border.main,
                },

                '& fieldset': {
                  transition: 'all 0.3s ease-in-out',
                  borderColor: theme.palette.border.main,
                },

                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    transition: 'all 0.3s ease-in-out',
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    transition: 'all 0.3s ease-in-out',
                  },
                },
              }}
            /> */
}
