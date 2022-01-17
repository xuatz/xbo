import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../actions/bookmarkActions'
import UrlAndNoteItem from './url-and-note'

const useBookmarks = () => {
  let bookmarks = []

  const bookmarkSublists = useSelector((state) => state.bookmarks.sublists)
  const bookmarkEntities = useSelector(
    (state) => state.bookmarks.bookmarks.entities,
  )

  if (bookmarkSublists) {
    const { link, note } = bookmarkSublists
    bookmarks = bookmarks.concat(link).concat(note)
    bookmarks = bookmarks
      .map((bookmarkId) => bookmarkEntities[bookmarkId])
      .sort((a, b) => b.data.modified - a.data.modified)
  }

  return bookmarks
}

const PushV2 = () => {
  const dispatch = useDispatch()
  const [listSize, setListSize] = useState(10)
  const [lastLoadTime, setLastLoadTime] = useState(Date.now())

  const bookmarks = useBookmarks()

  const sublist = bookmarks
    .filter((item) => {
      const pattern = filter
      if (!pattern || pattern === '') {
        return true
      }

      const { title = '', url = '', body = '' } = item.data

      return (
        title.toLowerCase().includes(pattern.toLowerCase()) ||
        url.toLowerCase().includes(pattern.toLowerCase()) ||
        body.toLowerCase().includes(pattern.toLowerCase())
      )
    })
    .slice(0, Math.min(listSize, bookmarks.length - 1))

  const onScroll = () => {
    const now = Date.now()
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 900 &&
      bookmarks.length &&
      now - lastLoadTime > 0.25 * 1000
    ) {
      setLastLoadTime(now)
      setListSize(listSize + 10)
    }
  }

  const handleOnDelete = (id) => {
    dispatch(actions.deleteBookmark(id))
  }

  const [filter, setFilter] = useState('')
  const handleFilterOnChange = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    dispatch(actions.fetchBookmarks())
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false)

    return () => {
      window.removeEventListener('scroll', onScroll, false)
    }
  }, [onScroll])

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <input
          style={{ padding: '5px' }}
          onChange={handleFilterOnChange}
          value={filter}
        />
      </div>
      <div>
        <ul>
          {sublist &&
            sublist.map((bk, index) => {
              return (
                <li key={index}>
                  <div
                    style={{
                      background: 'teal',
                      padding: '20px',
                      // width: "50%"
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        background: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        // justifyContent: "flex-start"
                      }}
                    >
                      <UrlAndNoteItem style={{ flex: '5' }} item={bk} />
                      <div
                        style={{
                          flex: '1',
                          // background: "red"
                        }}
                      >
                        <button
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                          }}
                          onClick={() => handleOnDelete(bk._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default PushV2
