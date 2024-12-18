import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { CSSTransition } from 'react-transition-group'

interface Course {
  id: string
  name: string
  semester: number
  ects: number
  completed: boolean
}

const Education = () => {
  const { language } = useLanguage()

  const courses: Course[] = [
    // 1. semester
    { id: 'SW1MSYS-01', name: language === 'da' ? 'Microcontroller systemer' : 'Microcontroller Systems', semester: 1, ects: 5, completed: true },
    { id: 'SW1OPRO-01', name: language === 'da' ? 'Objektorienteret programmering' : 'Object-Oriented Programming', semester: 1, ects: 5, completed: true },
    { id: 'SW1IDE-01', name: language === 'da' ? 'Indledende digital elektronik' : 'Introduction to Digital Electronics', semester: 1, ects: 5, completed: true },
    { id: 'SW1KLT-01', name: language === 'da' ? 'Indledende kredsløbsteknik' : 'Introduction to Circuit Technology', semester: 1, ects: 5, completed: true },
    { id: 'SW1MML5-01', name: language === 'da' ? 'Matematik modellering af lineære systemer' : 'Mathematical Modeling of Linear Systems', semester: 1, ects: 5, completed: true },
    { id: 'SW1PRJ1-01', name: language === 'da' ? 'Projekt 1' : 'Project 1', semester: 1, ects: 5, completed: true },

    // 2. semester
    { id: 'SW2ISE-01', name: language === 'da' ? 'Indledende System Engineering' : 'Introduction to System Engineering', semester: 2, ects: 5, completed: true },
    { id: 'SW2OOP-01', name: language === 'da' ? 'Objektorienteret programmering' : 'Object-Oriented Programming', semester: 2, ects: 5, completed: true },
    { id: 'SW2PLA-01', name: language === 'da' ? 'Praktisk lineær algebra for softwareudviklere' : 'Practical Linear Algebra for Software Developers', semester: 2, ects: 10, completed: true },
    { id: 'SW2FYS-01', name: language === 'da' ? 'Grundmodeller til den fysiske verden' : 'Basic Models of the Physical World', semester: 2, ects: 5, completed: true },
    { id: 'SW2PRJ2-01', name: language === 'da' ? 'Semesterprojekt 2' : 'Semester Project 2', semester: 2, ects: 5, completed: true },

    // 3. semester
    { id: 'SW3ISU-01', name: language === 'da' ? 'Indlejret softwareudvikling' : 'Embedded Software Development', semester: 3, ects: 5, completed: true },
    { id: 'SW3ALG-01', name: language === 'da' ? 'Algoritmer og datastrukturer' : 'Algorithms and Data Structures', semester: 3, ects: 5, completed: true },
    { id: 'SW3DSB-01', name: language === 'da' ? 'Digital signalbehandling' : 'Digital Signal Processing', semester: 3, ects: 5, completed: true },
    { id: 'SW3HAL-01', name: language === 'da' ? 'Hardware abstraktioner' : 'Hardware Abstractions', semester: 3, ects: 5, completed: true },
    { id: 'SW3NGK-01', name: language === 'da' ? 'Netværksprogrammering og grundlæggende kommunikationsnetværk' : 'Network Programming and Basic Communication Networks', semester: 3, ects: 5, completed: true },
    { id: 'SW3PRJ3-01', name: language === 'da' ? 'Semesterprojekt 3' : 'Semester Project 3', semester: 3, ects: 5, completed: true },

    // 4. semester (current)
    { id: 'SW4BAD-01', name: language === 'da' ? 'Back-end udvikling og databaser' : 'Back-end Development and Databases', semester: 4, ects: 10, completed: false },
    { id: 'SW4FED-02', name: language === 'da' ? 'Front-end udvikling' : 'Front-end Development', semester: 4, ects: 5, completed: false },
    { id: 'SW4SWD-01', name: language === 'da' ? 'Softwaredesign' : 'Software Design', semester: 4, ects: 5, completed: false },
    { id: 'SW4SWT-01', name: language === 'da' ? 'Softwaretest' : 'Software Testing', semester: 4, ects: 5, completed: false },
    { id: 'SW4PRJ4-01', name: language === 'da' ? 'Semesterprojekt 4' : 'Semester Project 4', semester: 4, ects: 5, completed: false },

    // 5. semester
    { id: 'ESPRJ-01', name: language === 'da' ? 'Ingeniørpraktik' : 'Engineering Internship', semester: 5, ects: 30, completed: false },

    // 6. semester
    { id: 'VALGFRI', name: language === 'da' ? 'Valgfrie kurser' : 'Elective Courses', semester: 6, ects: 30, completed: false },

    // 7. semester
    { id: 'VALGFRI', name: language === 'da' ? 'Valgfrie kurser' : 'Elective Courses', semester: 7, ects: 10, completed: false },
    { id: 'SW7BAC-01', name: language === 'da' ? 'Bachelorprojekt' : 'Bachelor Project', semester: 7, ects: 20, completed: false },
  ]

  const [openSemesters, setOpenSemesters] = useState<number[]>([])

  const totalECTS = courses.reduce((acc, course) => acc + course.ects, 0)
  const completedECTS = courses.reduce((acc, course) => course.completed ? acc + course.ects : acc, 0)
  const progressPercentage = (completedECTS / totalECTS) * 100

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  const toggleSemester = (semesterNum: number) => {
    setOpenSemesters(prev => 
      prev.includes(semesterNum)
        ? prev.filter(num => num !== semesterNum)
        : [...prev, semesterNum]
    )
  }

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
                  
                  <CSSTransition
                    in={isOpen}
                    timeout={300}
                    classNames="semester"
                    unmountOnExit
                  >
                    <div className="border-t border-gray-200/50 dark:border-gray-700/50">
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