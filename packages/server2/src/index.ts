import PocketBase from 'pocketbase'
import axios, { AxiosInstance } from 'axios'

type PushBookmark = {
  source: 'pushbullet'
  body: Push
}

type RedditBookmark = {
  source: 'reddit'
  body: Saved
}

type Bookmark = PushBookmark | RedditBookmark

// Define the PocketBase schema
interface Push {
  iden: string
  active: boolean
  body: string
  created: number
  modified: number
  dismissed: boolean
  sender_email: string
  sender_iden: string
  sender_name: string
  title: string
  type: string
  url: string
}

interface Saved {
  // TODO
}

interface User {
  name: string
  email: string
  created: number
  modified: number
  active: boolean
  image_url: string
  iden: string
}

interface Schema {
  pushes: Push[]
  user: User
}

// Initialize the PocketBase client
const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://localhost:8090')

// Initialize the Axios instance for making HTTP requests
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.pushbullet.com/v2',
  headers: {
    'Access-Token': 'YOUR_ACCESS_TOKEN_HERE',
  },
})

// Define the Pushbullet API methods
const api = {
  getPushes: async (): Promise<Push[]> => {
    const response = await axiosInstance.get('/pushes')
    return response.data.pushes
  },
  getUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/users/me')
    return response.data
  },
}

const fetchAndSavePushes = async () => {
  try {
    const pushes = await api.getPushes()
    // TODO getUserId()

    await Promise.all(
      pushes.map(async (push) => {
        try {
          await pb.collection('bookmarks').create({
            source: 'pushbullet',
            body: push,
          })
        } catch (err) {
          if (err instanceof Error) {
            console.error(`Failed to save push to database: ${err.message}`)
          }
        }
      }),
    )
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Failed to fetch pushes from API: ${err.message}`)
    }
  }
}

fetchAndSavePushes().then(() => {
  console.log('Pushes fetched and saved to PocketBase')
})
