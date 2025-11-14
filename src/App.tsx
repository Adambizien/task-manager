import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Vite + React + TailwindCSS!</h1>
      <p className="text-lg mb-8">This is a simple setup to get you started.</p>
      <button
        className="px-4 py-2 bg-blue-500 text-red-500 rounded hover:bg-blue-600"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
