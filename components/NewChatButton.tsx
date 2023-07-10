import React, { useState } from 'react'
import { Button, Typography, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
interface NewChatButtonProps {
  url: string
}

interface Chat {
  id: string
  title: string
  messages: string[]
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ url }) => {
  //   const [chats, setChats] = useState<string[]>([])
  const [chats, setChats] = useState<Chat[]>([])
  const router = useRouter()

  //   const generateUniqueChatId = () => {
  //     const chatId = uuidv4()
  //     return chatId
  //   }

  const generateUniqueChatId = (): string => {
    return uuidv4()
  }

  //   const handleNewChat = () => {
  //     const newChatId = generateUniqueChatId() // Implement a function to generate a unique chat ID
  //     setChats([...chats, newChatId])

  //     router.push(`/SubPages/${url}/${newChatId}`)
  //   }

  //   const handleNewChat = (): void => {
  //     const newChatId = generateUniqueChatId()
  //     const newChat: Chat = {
  //       id: newChatId,
  //       title: `Chat ${newChatId}`,
  //       messages: [],
  //     }
  //     setChats([...chats, newChat])
  //     router.push(`/SubPages/${url}/${newChatId}`)
  //   }

  //   const handleNewChat2 = async (): Promise<void> => {
  //     try {
  //       const response = await fetch('/api/foo', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })

  //       if (!response.ok) {
  //         console.error('Error saving chats')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
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

    router.push(`/SubPages/${url}/${newChatId}`)
  }

  const handleRemoveChat = (chatId: string): void => {
    const updatedChats = chats.filter(chat => chat.id !== chatId)
    setChats(updatedChats)
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
      ))}

      {/* {chats.map(chatId => (
        <Button
          key={chatId}
          variant="outlined"
          color="primary"
          startIcon={<ChatBubbleOutlineOutlinedIcon />}
          endIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => router.push(`/SubPages/${url}/${chatId}`)}
          sx={{
            textTransform: 'capitalize',
            minWidth: '12rem',
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
            Chat Title {chatId}
          </Typography>
        </Button>
      ))} */}
    </>
  )
}

export { NewChatButton }
