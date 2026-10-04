import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import StudentCard from './Components/Student-card'

function App() {
const a = "jeruselam"

const[count,setCount] = useState(0);

const logedinperson = true;

const students = [
  {
    id:1, name:"Arun"
  },
  {
    id:2, name:"Abcd"
  },
]
  return(
    <>
      <h1>hi</h1>
      <h1>hello</h1>
      <h1>{a}</h1>

      <StudentCard Name ="kanishka" department ="AIML"/>
      <StudentCard Name ="ANANTHA" department ="AIML"/>
     <h1>{count}</h1>
     <button onClick ={() => setCount(count+1)}>Increase</button>

{logedinperson ? (<h2>welcome kanishka</h2>):(<h2>please login</h2>)}

{students.map(student =>(<h1 key={student.id}>
  {student.name}
</h1>))}
      </>




      


  )
}

export default App









