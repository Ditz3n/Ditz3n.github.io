// Education | This component is used to display the education section of the website
// Importing useState from the React library
import React, { useState, useRef, useEffect } from 'react'

// Importing the useLanguage hook to manage the language state
import { useLanguage } from '../../hooks/useLanguage'
import { coursesData } from '../CoursesData'

// Importing the CheckCircleIcon from Heroicons
import { CheckCircleIcon } from '@heroicons/react/24/solid'

// Importing the CSSTransition component from react-transition-group to manage the opening/closing animation of the semesters
import { CSSTransition } from 'react-transition-group'

const Education = () => {
  const { language } = useLanguage()

  // State to manage the open semesters
  const [openSemesters, setOpenSemesters] = useState<number[]>([])

  // Refs for each semester
  const nodeRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});

  // Calculating the total ECTS, completed ECTS, and progress percentage
  const totalECTS = coursesData.reduce((acc, course) => acc + course.ects, 0)
  const completedECTS = coursesData.reduce((acc, course) => course.completed ? acc + course.ects : acc, 0)
  const progressPercentage = (completedECTS / totalECTS) * 100

  // Grouping the courses by semester
  const groupedCourses = coursesData.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push({
      ...course,
      name: course.name[language]
    });
    return acc;
  }, {} as Record<number, { id: string; name: string; ects: number; completed: boolean }[]>);

  // Initialize refs for all semesters
  useEffect(() => {
    const semesters = Object.keys(groupedCourses).map(Number);
    semesters.forEach((semesterNum) => {
      if (!nodeRefs.current[semesterNum]) {
        nodeRefs.current[semesterNum] = React.createRef<HTMLDivElement>();
      }
    });
  }, [groupedCourses]);


  // Function to toggle the open semesters
  const toggleSemester = (semesterNum: number) => {
    setOpenSemesters(prev => 
      prev.includes(semesterNum) ? prev.filter(num => num !== semesterNum) : [...prev, semesterNum]
    );
  };

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {language === 'da' ? 'Uddannelse' : 'Education'}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
        {language === 'da' 
          ? 'Nedenfor kan du se min nuværende progression gennem min diplomingeniøruddannelse i softwareteknologi ved Aarhus Universitet. Grønne felter indikerer beståede kurser.'
          : 'Below you can see my current progress through my Bachelor of Engineering degree in Software Technology at Aarhus University. Green fields indicate completed courses.'}
      </p>
      
      {/* Mapping the courses */}
      <div className="overflow-x-auto transition-all duration-300">
        <div className="w-full max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300 space-y-4">
          {Object.entries(groupedCourses).map(([semester, semesterCourses]) => {
            const semesterNum = Number(semester)
            const isOpen = openSemesters.includes(semesterNum)

            return (
              <div key={semester} className="relative rounded-lg shadow overflow-hidden p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSemester(semesterNum)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left bg-gray-50 dark:bg-[#222222] hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {language === 'da' ? `Semester ${semesterNum}` : `Semester ${semesterNum}`}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        ({semesterCourses.reduce((acc, course) => acc + course.ects, 0)} ECTS)
                      </span>
                    </div>
                  </button>
                  
                  {/* CSSTransition for managing the opening/closing animation */}
                  <CSSTransition
                    in={isOpen}
                    timeout={300}
                    classNames="semester"
                    unmountOnExit
                    nodeRef={nodeRefs.current[semesterNum]}
                  >
                    <div ref={nodeRefs.current[semesterNum]} className="border-t border-gray-200/50 dark:border-gray-700/50">
                      { /* Table with the courses */}
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="py-2 sm:py-4 px-2 sm:px-4 text-left text-[10px] sm:text-sm text-gray-600 dark:text-gray-400">
                              {language === 'da' ? 'ID' : 'ID'}
                            </th>
                            <th className="py-2 sm:py-4 px-2 sm:px-4 text-left text-[10px] sm:text-sm text-gray-600 dark:text-gray-400">
                              {language === 'da' ? 'Navn' : 'Name'}
                            </th>
                            <th className="py-2 sm:py-4 px-2 sm:px-4 text-right text-[10px] sm:text-sm text-gray-600 dark:text-gray-400">ECTS</th>
                            <th className="py-2 sm:py-4 px-2 sm:px-4 text-center text-[10px] sm:text-sm text-gray-600 dark:text-gray-400">
                              {language === 'da' ? 'Status' : 'Status'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {semesterCourses.map((course) => (
                            <tr 
                              key={course.id}
                              className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-300
                                ${course.completed ? 'bg-green-100 dark:bg-green-900/20' : ''}`}
                            >
                              <td className="py-2 sm:py-4 px-2 sm:px-4 text-[10px] sm:text-sm text-gray-800 dark:text-gray-200">{course.id}</td>
                              <td className="py-2 sm:py-4 px-2 sm:px-4 text-[10px] sm:text-sm text-gray-800 dark:text-gray-200 break-words">{course.name}</td>
                              <td className="py-2 sm:py-4 px-2 sm:px-4 text-[10px] sm:text-sm text-right text-gray-800 dark:text-gray-200">{course.ects}</td>
                              <td className="py-2 sm:py-4 px-2 sm:px-4 text-center">
                                {course.completed && (
                                  <CheckCircleIcon className="w-3 h-3 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CSSTransition>
                </div>
              </div>
            )
          })}

          {/* Progress bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">
                {language === 'da' ? 'Samlet progression' : 'Total progress'}
              </span>
              <span>
                {completedECTS} / {totalECTS} ECTS ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education