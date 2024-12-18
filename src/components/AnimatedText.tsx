import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

const AnimatedText = ({ children, className = '' }: AnimatedTextProps) => {
  const [content, setContent] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setContent(children)
      setIsAnimating(false)
    }, 150) // Halvdelen af animationstiden

    return () => clearTimeout(timer)
  }, [children])

  return (
    <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${className}`}>
      {content}
    </div>
  )
}

export default AnimatedText 