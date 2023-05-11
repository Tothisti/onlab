import type React from 'react'
import { useEffect } from 'react'

interface Props {
  children: JSX.Element
  title: string
}

const Page = ({ children, title }: Props): JSX.Element => {
  useEffect(() => {
    document.title = title
  })
  return children
}

export default Page
