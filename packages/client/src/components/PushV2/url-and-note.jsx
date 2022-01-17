import React, { useState } from 'react'
import { fromUnixTime } from 'date-fns'

const UrlAndNoteItem = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { item, style } = props
  const { title, url, type, body } = item.data
  const modifiedAt = fromUnixTime(Math.round(item.data.modified))

  return (
    <div style={style}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <p>{modifiedAt.toString()}</p>
        {type === 'note' ? (
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ) : (
          <div>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              {title || url}
            </a>
          </div>
        )}
      </div>
      {isOpen && <pre>{JSON.stringify(item.data, 0, 2)}</pre>}
    </div>
  )
}

export default UrlAndNoteItem
