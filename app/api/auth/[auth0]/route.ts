// import { handleAuth } from '@auth0/nextjs-auth0';

// export const GET = handleAuth();

import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  onError(req: Request, error: Error) {
    console.error(error);
  }
});




// const TextER: React.FC<NewChatButtonProps> = async ({ url }) => {
//   const { user } = useUser()
//   const pb = new PocketBase('http://127.0.0.1:8090')
//   const authData = await pb.admins.authWithPassword(
//     process.env.email || 'umershaikh217@gmail.com',
//     process.env.pass || 'umer123456'
//   )

//   const [TextERchats, setTextERchats] = useState([])

//   const router = useRouter()

 

//   // useEffect(() => {
//   //   const fetchChats = async () => {
//   //     try {
//   //       const response = await fetch('/api/data/TEXT_ER', {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //       })
//   //       if (response.ok) {
//   //         const data = await response.json()
//   //         setTextERchats(data)
//   //       } else {
//   //         console.error('Failed to fetch chats')
//   //       }
//   //     } catch (error) {
//   //       console.error(error)
//   //     }
//   //   }

//   //   fetchChats()
//   // }, [])

//   // await fetchChats(user)

//   const Ref = useRef<any>(null)

//   useEffect(() => {
//     const element = Ref.current

//     if (element) {
//       anime({
//         targets: element,

//         opacity: [0, 1],
//         duration: 700,
//         easing: 'easeOutSine',
//       })
//     }
//   }, [])

//   const handleNewChat = async (): Promise<void> => {
//     const ID = await SetConversation(user)
//     // setTextERchats(ID)

//     // const newChatId = generateUniqueChatId()
//     // const newChat: Chat = {
//     //   id: ID || 'No ID',
//     //   title: `Chat ${ID}`,
//     //   messages: [],
//     // }
//     // const updatedChats = [...TextERchats, newChat]
//     // setTextERchats(updatedChats)

//     // try {
//     //   const response = await fetch('/api/data/TEXT_ER', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(updatedChats),
//     //   })

//     //   if (!response.ok) {
//     //     console.error('Error saving chats')
//     //   }
//     // } catch (error) {
//     //   console.error(error)
//     // }

//     router.push(`/SubPages/${url}/${ID}`)
//   }

//   const handleRemoveChat = async (chatId: string) => {
//     const result = await pb.collection('conversation').delete(chatId)
//     console.log('result', result)

//     if (result == true) {
//       router.push(`/SubPages/${url}`)
//     }
 
//   }