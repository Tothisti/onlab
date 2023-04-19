import type React from 'react'
import { useEffect } from 'react'

interface Props {
  children: JSX.Element
  title: string
}

const Page: React.FC<Props> = ({ children, title }): JSX.Element => {
  useEffect(() => {
    document.title = title
  })
  return children
}

export default Page
