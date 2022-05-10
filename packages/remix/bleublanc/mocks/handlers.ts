import { rest, graphql } from 'msw'
import { parseRequestName, recordRestResponse } from './resolver'

export const handlers = [
  graphql.operation(async (req, _res, ctx) => {
    console.log('xz:hamtaro')
    // console.log('xz:req', req)

    // console.log('xz:req.body?.operationName', req.body?.operationName)
    // console.log('xz:req?.variables', req?.variables)

    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()
    const requestName = parseRequestName(req)

    window.parent?.postMessage(
      {
        event: 'bleublanc_response_graphql_update',
        data: {
          name: `post-graphql-${req.body?.operationName}`,
          variables: req?.variables,
          originalResponse: originalResponseData,
        },
      },
      '*',
    )
  }),

  rest.get(`http://localhost:9000/*`, recordRestResponse),
  rest.post(`http://localhost:9000/*`, recordRestResponse),
  rest.patch(`http://localhost:9000/*`, recordRestResponse),
  rest.delete(`http://localhost:9000/*`, recordRestResponse),
]
