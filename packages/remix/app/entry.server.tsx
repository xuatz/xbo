import type { EntryContext } from 'remix'
import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import inline from '@twind/with-remix/server'

const { server } = require('../bleublanc/mocks/node')
server.listen()

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  markup = inline(markup)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
