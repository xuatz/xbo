import axios from 'axios'

// @todo need to move this to a better place later
export type Push = unknown

const PB_API = axios.create({
  baseURL: 'https://api.pushbullet.com/v2/',
})

export type GET_PUSHES_RESULT = { pushes: Push[]; cursor?: string }

export type GET_PUSHES_PARAMS = {
  access_token: string
  active?: boolean
  cursor?: GET_PUSHES_RESULT['cursor']
  modified_after?: string
}

export const getPushes = async ({
  access_token,
  active = true,
  cursor,
  modified_after,
}: GET_PUSHES_PARAMS): Promise<GET_PUSHES_RESULT> => {
  try {
    const { data } = await PB_API.get<GET_PUSHES_RESULT>('/pushes', {
      headers: {
        'Access-Token': access_token,
      },
      params: {
        active,
        cursor,
        modified_after,
        limit: 500, // pb actually dont care about this lol.
      },
    })
    return data
  } catch {
    return {
      pushes: [],
    }
  }
}
