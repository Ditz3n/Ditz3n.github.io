// AnimatedText | This component is used to animate text when it changes on the website
// Importing the useEffect and useState hooks from React
import { useEffect, useState } from 'react'

// Interface for AnimatedText component
interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

// AnimatedText component
const AnimatedText = ({ children, className = '' }: AnimatedTextProps) => {
  const [content, setContent] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setContent(children)
      setIsAnimating(false)
    }, 150) // The duration of the animation (half of the css transition duration)

    return () => clearTimeout(timer)
  }, [children])

  return (
    <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${className}`}>
      {content}
    </div>
  )
}

export default AnimatedText 