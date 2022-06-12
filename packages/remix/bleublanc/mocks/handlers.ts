import { rest, graphql } from 'msw'
import { recordRestResponse } from './resolver'

export const handlers = [
  graphql.operation(async (req, _res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    window.parent?.postMessage(
      {
        event: 'bleublanc_response_graphql_update',
        data: {
          // @ts-ignore - operationName does exist, but is not typed
          name: `post-graphql-${req.body?.operationName}`,
          variables: req?.variables,
          originalResponse: originalResponseData,
        },
      },
      '*',
    )
  }),

  // rest.get(`http://localhost:9000/*`, recordRestResponse),
  // rest.post(`http://localhost:9000/*`, recordRestResponse),
  // rest.patch(`http://localhost:9000/*`, recordRestResponse),
  // rest.delete(`http://localhost:9000/*`, recordRestResponse),
]
