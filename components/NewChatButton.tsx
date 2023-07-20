import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { promises as fsPromises } from 'fs'
import anime from 'animejs/lib/anime.es.js'
import { motion } from 'framer-motion'
import PocketBase from 'pocketbase'
import { useUser } from '@auth0/nextjs-auth0/client'
import { log } from 'console'

interface NewChatButtonProps {
  url: string
}

interface Chat {
  id: string
  title: string
  messages: string[]
}

async function fetchConversations(user: any) {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const authData = await pb.admins.authWithPassword(
    process.env.email || 'umershaikh217@gmail.com',
    process.env.pass || 'umer123456'
  )

  const userResultList = await pb.collection('users').getFullList({
    filter: `authID = "${user?.sub}"`,
  })

  // console.log('userResultList', userResultList)

  let userId // Variable to store the user_id

  if (userResultList.length === 1) {
    // User with the specified Auth0 ID found in the 'users' collection
    // Get the user_id from the user's record
    userId = userResultList[0].id
  } else {
    // User with the specified Auth0 ID not found in the 'users' collection
    console.log('User not found or multiple users with the same Auth0 ID.')
  }

  console.log('userId', userId)

  const conversations = await pb.collection('conversation').getFullList({
    filter: `userID = "${userId}"`,
    // sort: '-created',
  })

  console.log('conversations', conversations)

  return conversations
}

async function SetConversation(user: any) {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const authData = await pb.admins.authWithPassword(
    process.env.email || 'umershaikh217@gmail.com',
    process.env.pass || 'umer123456'
  )

  const userResultList = await pb.collection('users').getFullList({
    filter: `authID = "${user?.sub}"`,
  })

  // console.log('userResultList', userResultList)

  let userId // Variable to store the user_id

  if (userResultList.length === 1) {
    // User with the specified Auth0 ID found in the 'users' collection
    // Get the user_id from the user's record
    userId = userResultList[0].id
  } else {
    // User with the specified Auth0 ID not found in the 'users' collection
    console.log('User not found or multiple users with the same Auth0 ID.')
  }

  if (userId) {
    // If the userId is defined (user found in the 'users' collection)
    // Create a new conversation in the 'conversation' table with the retrieved user_id
    const ID = await pb.collection('conversation').create({
      userID: userId,
      // Other conversation data here...
    })

    // console.log('Conversation Record', ID)
    // console.log('Conversation created', ID.id)
    return ID.id
  }
}

async function fetchNewChats(user: any, setTextERchats: any, TextERchats: any) {
  const result = await fetchConversations(user)
  const ids = result.map(record => record.id)
  console.log(ids)
  const updatedChats = [...TextERchats, ids]
  setTextERchats(updatedChats)
}

async function fetchDeletedChats(
  user: any,
  setTextERchats: any,
  TextERchats: any
) {
  const result = await fetchConversations(user)
  const ids = result.map(record => record.id)
  console.log(ids)
  setTextERchats(ids)
}

const TextER: React.FC<NewChatButtonProps> = ({ url }) => {
  const [TextERchats, setTextERchats] = useState<any>([])
  const { user } = useUser()

  const router = useRouter()

  const generateUniqueChatId = (): string => {
    return uuidv4()
  }

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const response = await fetch('/api/data/TEXT_ER', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         setTextERchats(data)
  //       } else {
  //         console.error('Failed to fetch chats')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchChats()
  // }, [])

  const Ref = useRef<any>(null)

  useEffect(() => {
    const element = Ref.current

    fetchNewChats(user, setTextERchats, TextERchats)
    if (element) {
      anime({
        targets: element,

        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutSine',
      })
    }
  }, [])

  const handleNewChat = async (): Promise<void> => {
    const ID = await SetConversation(user)
    console.log('ID new chat', ID)

    // setTextERchats(ID)
    const updatedChats = [...TextERchats, ID]
    setTextERchats(updatedChats)

    router.push(`/SubPages/${url}/${ID}`)
  }

  const handleRemoveChat = async (chatId: string) => {
    const pb = new PocketBase('http://127.0.0.1:8090')
    const authData = await pb.admins.authWithPassword(
      process.env.email || 'umershaikh217@gmail.com',
      process.env.pass || 'umer123456'
    )

    const result = await pb.collection('conversation').delete(chatId)
    console.log('result', result)

    // const updatedChats = [...TextERchats, ID]
    // setTextERchats(updatedChats)

    if (result == true) {
      router.push(`/SubPages/${url}`)
    }

    fetchDeletedChats(user, setTextERchats, TextERchats)
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddOutlinedIcon />}
        onClick={handleNewChat}
        sx={{
          fontSize: '14px',
          textTransform: 'capitalize',
          minWidth: '12rem',
        }}
      >
        New Chat
      </Button>

      {TextERchats.map((id: string) => (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div key={id}>
              <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ChatBubbleOutlineOutlinedIcon />}
                  onClick={() => router.push(`/SubPages/${url}/${id}`)}
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      maxWidth: '7rem',
                      width: { xs: 'auto', xl: '7rem' },
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {id}
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRemoveChat(id)}
                  sx={{ borderLeft: 'none', width: '0.5rem' }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </ButtonGroup>
            </div>
          </motion.div>
        </>
      ))}
    </>
  )
}

const CsvSQL: React.FC<NewChatButtonProps> = ({ url }) => {
  const [CSV_SQL_chats, setCSV_SQL_chats] = useState<Chat[]>([])

  const router = useRouter()

  const generateUniqueChatId = (): string => {
    return uuidv4()
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // const response = await fetch('/api/chats');
        const response = await fetch('/api/data/CSV_SQL', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const data = await response.json()
          setCSV_SQL_chats(data)
        } else {
          console.error('Failed to fetch chats')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchChats()
  }, [])

  const handleNewChat = async (): Promise<void> => {
    const newChatId = generateUniqueChatId()
    const newChat: Chat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      messages: [],
    }
    const updatedChats = [...CSV_SQL_chats, newChat]
    setCSV_SQL_chats(updatedChats)

    try {
      const response = await fetch('/api/data/CSV_SQL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChats),
      })

      if (!response.ok) {
        console.error('Error saving chats')
      }
    } catch (error) {
      console.error(error)
    }

    router.push(`/SubPages/${url}/${newChatId}`)
  }

  const handleRemoveChat = (chatId: string): void => {
    const updatedChats = CSV_SQL_chats.filter(chat => chat.id !== chatId)
    setCSV_SQL_chats(updatedChats)

    fetch(`/api/data/CSV_SQL/${chatId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to delete chat')
        }
        if (response.ok) {
          console.error('Success')
          router.push(`/SubPages/${url}`)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddOutlinedIcon />}
        onClick={handleNewChat}
        sx={{
          fontSize: '14px',
          textTransform: 'capitalize',
          minWidth: '12rem',
        }}
      >
        New Chat
      </Button>

      {CSV_SQL_chats.map(chat => (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div key={chat.id}>
              <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ChatBubbleOutlineOutlinedIcon />}
                  onClick={() => router.push(`/SubPages/${url}/${chat.id}`)}
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      maxWidth: '7rem',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {chat.id}
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRemoveChat(chat.id)}
                  sx={{ borderLeft: 'none', width: '0.5rem' }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </ButtonGroup>
            </div>
          </motion.div>
        </>
      ))}
    </>
  )
}

const ErSQL: React.FC<NewChatButtonProps> = ({ url }) => {
  const [ER_SQL_chats, setER_SQL_chats] = useState<Chat[]>([])

  const router = useRouter()

  const generateUniqueChatId = (): string => {
    return uuidv4()
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // const response = await fetch('/api/chats');
        const response = await fetch('/api/data/ER_SQL', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const data = await response.json()
          setER_SQL_chats(data)
        } else {
          console.error('Failed to fetch chats')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchChats()
  }, [])

  const handleNewChat = async (): Promise<void> => {
    const newChatId = generateUniqueChatId()
    const newChat: Chat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      messages: [],
    }
    const updatedChats = [...ER_SQL_chats, newChat]
    setER_SQL_chats(updatedChats)

    try {
      const response = await fetch('/api/data/ER_SQL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChats),
      })

      if (!response.ok) {
        console.error('Error saving chats')
      }
    } catch (error) {
      console.error(error)
    }

    router.push(`/SubPages/${url}/${newChatId}`)
  }

  const handleRemoveChat = (chatId: string): void => {
    const updatedChats = ER_SQL_chats.filter(chat => chat.id !== chatId)
    setER_SQL_chats(updatedChats)

    fetch(`/api/data/ER_SQL/${chatId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to delete chat')
        }
        if (response.ok) {
          console.error('Success')
          router.push(`/SubPages/${url}`)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddOutlinedIcon />}
        onClick={handleNewChat}
        sx={{
          fontSize: '14px',
          textTransform: 'capitalize',
          minWidth: '12rem',
        }}
      >
        New Chat
      </Button>

      {ER_SQL_chats.map(chat => (
        <>
          <div key={chat.id}>
            <ButtonGroup
              disableElevation
              variant="outlined"
              aria-label="Disabled elevation buttons"
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ChatBubbleOutlineOutlinedIcon />}
                onClick={() => router.push(`/SubPages/${url}/${chat.id}`)}
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    maxWidth: '7rem',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {chat.id}
                </Typography>
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleRemoveChat(chat.id)}
                sx={{ borderLeft: 'none', width: '0.5rem' }}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </ButtonGroup>
          </div>
        </>
      ))}
    </>
  )
}

export { TextER, CsvSQL, ErSQL }
