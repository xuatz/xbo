import {
  DefaultRequestBody,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  GraphQLRequest,
  GraphQLVariables,
} from 'msw'

export interface IRecordedResponse {
  name: string
  originalResponse: any
}

/**
 * create a request name based off msw RestRequest object.
 * e.g. if request is GET /users/123, then request name would be get-users-123
 * TODO: support wildcard e.g. /users/{id}
 */
export function parseRequestName(
  req:
    | RestRequest<DefaultRequestBody, PathParams>
    | GraphQLRequest<GraphQLVariables>,
) {
  const path = req.url.pathname
    .substring(1, req.url.pathname.length) // remove leading slash
    .split('/')
    .join('-')
  return `${req.method.toLowerCase()}-${path}`
}

export async function recordRestResponse(
  req: RestRequest<DefaultRequestBody, PathParams>,
  _res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext,
) {
  const originalResponse = await ctx.fetch(req)
  const originalResponseData = await originalResponse.json()
  const requestName = parseRequestName(req)
  window.parent?.postMessage(
    {
      event: 'bleublanc_response_update',
      data: {
        name: requestName,
        originalResponse: originalResponseData,
      },
    },
    '*',
  )
}
