import React, { useState, useEffect } from 'react'
import { Button, Typography, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { promises as fsPromises } from 'fs'

interface NewChatButtonProps {
  url: string
}

interface Chat {
  id: string
  title: string
  messages: string[]
}

// async function getchatHistory () {
//     const fileData = await fsPromises.readFile('chats.json', 'utf-8');
// }

const NewChatButton: React.FC<NewChatButtonProps> = ({ url }) => {
  const [chats, setChats] = useState<Chat[]>([])

  const router = useRouter()

  //   const getchatHistory = async (): Promise<void> => {
  //   const fileData = await fsPromises.readFile('chats.json', 'utf-8');

  //   }
  //    getchatHistory()

  const generateUniqueChatId = (): string => {
    return uuidv4()
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // const response = await fetch('/api/chats');
        const response = await fetch('/api/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const data = await response.json()
          setChats(data)
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
    const updatedChats = [...chats, newChat]
    setChats(updatedChats)

    try {
      const response = await fetch('/api/data', {
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

    // try {
    //   const response = await fetch('/api/data', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })

    //   if (response.ok) {
    //     const data = await response.json()
    //     setChats(data)
    //   }

    //   if (!response.ok) {
    //     console.error('Error getting saving chats')
    //   }
    // } catch (error) {
    //   console.error(error)
    // }

    router.push(`/SubPages/${url}/${newChatId}`)
  }

  const handleRemoveChat = (chatId: string): void => {
    const updatedChats = chats.filter(chat => chat.id !== chatId)
    setChats(updatedChats)

    // fetch(`/api/data/`, {
    //   method: 'DELETE',
    // })

    fetch(`/api/data/${chatId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Failed to delete chat')
        }
        if (response.ok) {
          console.error('Success')
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

      {chats.map(chat => (
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

export { NewChatButton }
