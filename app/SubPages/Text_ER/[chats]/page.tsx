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
// import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { Children, useEffect } from 'react'
import { ChatHistory } from '@/components/chatHistory'
import { ChatModel } from '@/components/chatModel'
import { useCompletion, useChat } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment'
import Image from 'next/image'
import { useState } from 'react'
// import { Message } from 'ai/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { UserProvider } from '@auth0/nextjs-auth0/client'
// import SqlFormatter from 'sql-formatter'
const SqlFormatter = require('sql-formatter')

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco, monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { styled } from '@mui/material/styles'
import { codeStyle, codeStyle2 } from '@/utils/codeStyle'

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
    width: '74ch',
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

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat()
  // useChat({ api: '/api/completion' })
  const userStyle = {
    ...monokai,
    /* Add any custom CSS properties here */
    // For example, to change the background color:
    background: '#272822',
    // To change the text color:
    color: '#F8F8F2',
    // To change the color of specific elements, such as keywords:
    'span.keyword': {
      color: '#F92672',
    },
    // To change the color of comments:
    'span.comment': {
      color: '#75715E',
    },
    // Add more CSS properties as needed
  }

  // const AiStyle = {
  //   ...monokai,
  //   background: '#140F11',
  //   'code[class*="language-"]': {
  //     color: '#FF4081',
  //     background: '#140F11',
  //   },
  //   /* Add any custom CSS properties here */
  //   // For example, to change the background color:
  //   'pre[class*="language-"]': {
  //     color: '#FF4081',
  //     background: '#140F11',
  //     // border: '1px solid #0bff48',
  //     // boxShadow: '0px 4px 8px #0bff48',
  //     // textShadow: '0 1px rgba(0, 0, 0, 0.3)',
  //     fontFamily:
  //       "'Roboto Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
  //     fontSize: '14px',
  //     textAlign: 'left',
  //     whiteSpace: 'pre',
  //     wordSpacing: 'normal',
  //     wordBreak: 'normal',
  //     wordWrap: 'normal',
  //     lineHeight: '1.5',
  //     MozTabSize: '4',
  //     OTabSize: '4',
  //     tabSize: '4',
  //     WebkitHyphens: 'none',
  //     MozHyphens: 'none',
  //     msHyphens: 'none',
  //     hyphens: 'none',
  //     padding: '1em',
  //     margin: '.5em 0',
  //     overflow: 'none',
  //     borderRadius: '8px',
  //   },
  //   overflow: 'none',
  //   // To change the text color:
  //   color: '#FF4081',
  //   // To change the color of specific elements, such as keywords:
  //   'span.keyword': {
  //     color: '#F92672',
  //   },
  //   // To change the color of comments:
  //   'span.comment': {
  //     color: '#75715E',
  //   },
  //   // Add more CSS properties as needed
  // }

  const { user, error, isLoading } = useUser()
  const [loading, setLoading] = useState(false)
  const [AiMessage, setAiMessage] = useState(false)

  const [formattedSqlCode, setFormattedSqlCode] = useState('')
  const params = useParams()
  const chatId = params.chats

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch('/api/data/TEXT_ER/message')
        const chats = await response.json()
        const chat = chats.find(chat => chat.id === chatId)
        // const formattedSqlCode = SqlFormatter.format(chat.messages.Messages[chat.messages.Messages.length - 1].content)
        // console.log('formattedSqlCode', formattedSqlCode)
        // console.log(
        //   'chat.messages.Messages.length -1',
        //   chat.messages.Messages.length - 1
        // )

        console.log('chat.messages ', chat.messages.Messages)
        console.log('chat.content ', chat.messages.Messages[0].content)

        // const userMessage = chat.messages.Messages.find(
        //   message => message.role === 'user'
        // )
        // if (userMessage) {
        //   const userMessageContent = userMessage.content
        //   console.log(userMessageContent)
        // } else {
        //   console.log('No user message found in chat messages.')
        // }

        if (chat && chat.messages && chat.messages.Messages) {
          // const formattedSqlCode = SqlFormatter.format(chat.messages.Messages)
          // console.log('formattedSqlCode', formattedSqlCode)
          setMessages(chat.messages.Messages)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    loadMessages()
  }, [chatId])

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      handleButtonSubmit(event)
    }
  }

  const handleButtonSubmit = async (event: any) => {
    event.preventDefault()
    handleSubmit(event)

    setMessages(messages)
    await postMessage(chatId, messages)

    // await fetch('/api/format')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Set the formatted SQL code in the state
    //     setFormattedSqlCode(data.sqlCode)
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //     console.error(error)
    //   })
  }

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
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
            alignItems="start"
            spacing={3}
            sx={{ overflow: 'auto' }}
          >
            {messages.map(m => (
              <div
                key={m.id}
                className=" justify-start bg-[#1A0B11]  w-[75ch] "
              >
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
                      }}
                    >
                      <div className=" ">
                        <Avatar
                          alt="Remy Sharp"
                          // src={'/Images/profile.jpg'}
                          src={user?.picture || '/Images/Customer.svg'}
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>

                      <div className=" w-full   leading-relaxed text-sm   font-regular ">
                        {/* {m.content} */}
                        <SyntaxHighlighter
                          language="sql"
                          style={codeStyle2}
                          wrapLines={true}
                          wrapLongLines={true}
                        >
                          {m.content}
                        </SyntaxHighlighter>
                      </div>
                    </Stack>
                  </div>
                ) : (
                  <div className="  ">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        px: 2,
                        py: 1.5,

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
                        <SyntaxHighlighter
                          language="sql"
                          // style={monokai}
                          // style={AiStyle}
                          style={codeStyle}
                          wrapLines={true}
                          wrapLongLines={true}
                        >
                          {m.content}
                        </SyntaxHighlighter>
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

{
  /* <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch border-2">
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
      </div> */
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
