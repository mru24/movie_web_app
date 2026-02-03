import { useState, useEffect } from "react"
import Header from "./components/Header";

function App() {

  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    console.log('use effect');

  }, [])

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header
          searchTerm={ searchTerm }
          setSearchTerm={ setSearchTerm } />
      </div>
    </main>
  )
}

export default App
