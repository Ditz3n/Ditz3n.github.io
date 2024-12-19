// useActiveSection | This custom hook is used to determine which section is currently active on the website

// Importing the useState and useEffect hooks from React
import { useState, useEffect } from 'react'

// Exporting the useActiveSection custom hook
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  // useEffect to observe the sections and update the active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Triggers when section is in middle of viewport
        threshold: 0
      }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
} 