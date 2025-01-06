// CoursesData | This component is used to store the data of the courses in the software technology degree
// Interface for the Course object
interface Course {
    id: string
    name: { da: string, en: string }
    semester: number
    ects: number
    completed: boolean // Indicates whether the course has been completed or not
  }
  
  // Array of Course objects representing the courses in the software technology degree
  export const coursesData: Course[] = [
      // 1. semester
      { id: 'SW1MSYS-01', name: { da: 'Microcontroller systemer', en: 'Microcontroller Systems' }, semester: 1, ects: 5, completed: true },
      { id: 'SW1OPRO-01', name: { da: 'Objektorienteret programmering', en: 'Object-Oriented Programming' }, semester: 1, ects: 5, completed: true },
      { id: 'SW1IDE-01', name: { da: 'Indledende digital elektronik', en: 'Introduction to Digital Electronics' }, semester: 1, ects: 5, completed: true },
      { id: 'SW1KLT-01', name: { da: 'Indledende kredsløbsteknik', en: 'Introduction to Circuit Technology' }, semester: 1, ects: 5, completed: true },
      { id: 'SW1MML5-01', name: { da: 'Matematik modellering af lineære systemer', en: 'Mathematical Modeling of Linear Systems' }, semester: 1, ects: 5, completed: true },
      { id: 'SW1PRJ1-01', name: { da: 'Projekt 1', en: 'Project 1' }, semester: 1, ects: 5, completed: true },
  
      // 2. semester
      { id: 'SW2ISE-01', name: { da: 'Indledende System Engineering', en: 'Introduction to System Engineering' }, semester: 2, ects: 5, completed: true },
      { id: 'SW2OOP-01', name: { da: 'Objektorienteret programmering', en: 'Object-Oriented Programming' }, semester: 2, ects: 5, completed: true },
      { id: 'SW2PLA-01', name: { da: 'Praktisk lineær algebra for softwareudviklere', en: 'Practical Linear Algebra for Software Developers' }, semester: 2, ects: 10, completed: true },
      { id: 'SW2FYS-01', name: { da: 'Grundmodeller til den fysiske verden', en: 'Basic Models of the Physical World' }, semester: 2, ects: 5, completed: true },
      { id: 'SW2PRJ2-01', name: { da: 'Semesterprojekt 2', en: 'Semester Project 2' }, semester: 2, ects: 5, completed: true },
  
      // 3. semester
      { id: 'SW3ISU-01', name: { da: 'Indlejret softwareudvikling', en: 'Embedded Software Development' }, semester: 3, ects: 5, completed: true },
      { id: 'SW3ALG-01', name: { da: 'Algoritmer og datastrukturer', en: 'Algorithms and Data Structures' }, semester: 3, ects: 5, completed: true },
      { id: 'SW3DSB-01', name: { da: 'Digital signalbehandling', en: 'Digital Signal Processing' }, semester: 3, ects: 5, completed: true },
      { id: 'SW3HAL-01', name: { da: 'Hardware abstraktioner', en: 'Hardware Abstractions' }, semester: 3, ects: 5, completed: true },
      { id: 'SW3NGK-01', name: { da: 'Netværksprogrammering og grundlæggende kommunikationsnetværk', en: 'Network Programming and Basic Communication Networks' }, semester: 3, ects: 5, completed: true },
      { id: 'SW3PRJ3-01', name: { da: 'Semesterprojekt 3', en: 'Semester Project 3' }, semester: 3, ects: 5, completed: true },
  
      // 4. semester
      { id: 'SW4BAD-01', name: { da: 'Back-end udvikling og databaser', en: 'Back-end Development and Databases' }, semester: 4, ects: 10, completed: true },
      { id: 'SW4FED-02', name: { da: 'Front-end udvikling', en: 'Front-end Development' }, semester: 4, ects: 5, completed: false },
      { id: 'SW4SWD-01', name: { da: 'Softwaredesign', en: 'Software Design' }, semester: 4, ects: 5, completed: false },
      { id: 'SW4SWT-01', name: { da: 'Softwaretest', en: 'Software Testing' }, semester: 4, ects: 5, completed: false },
      { id: 'SW4PRJ4-01', name: { da: 'Semesterprojekt 4', en: 'Semester Project 4' }, semester: 4, ects: 5, completed: false },
  
      // 5. semester
      { id: 'ESPRJ-01', name: { da: 'Ingeniørpraktik', en: 'Engineering Internship' }, semester: 5, ects: 30, completed: false },
  
      // 6. semester
      { id: 'VALGFRI', name: { da: 'Valgfrie kurser', en: 'Elective Courses' }, semester: 6, ects: 30, completed: false },
  
      // 7. semester
      { id: 'VALGFRI', name: { da: 'Valgfrie kurser', en: 'Elective Courses' }, semester: 7, ects: 10, completed: false },
      { id: 'SW7BAC-01', name: { da: 'Bachelorprojekt', en: 'Bachelor Project' }, semester: 7, ects: 20, completed: false },
  ];