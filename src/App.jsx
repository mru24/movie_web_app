import { useEffect } from "react"

function App() {

  useEffect(()=>{
    console.log('use effect');

  },[])

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
