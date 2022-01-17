import React from 'react'

export const ArrowLeftIcon = (props) => {
  const { style, onClick } = props
  return (
    <svg
      onClick={onClick}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
  )
}

export const ArrowRightIcon = (props) => {
  const { style, onClick } = props
  return (
    <svg
      onClick={onClick}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
  )
}

export const CheckmarkIcon = (props) => {
  const { style, onClick } = props
  return (
    <svg
      onClick={onClick}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}
