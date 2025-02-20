import React from 'react'
import Chatbot from './components/Chatbot.jsx'
import Logo from './components/Logo.jsx'

const App = () => {
  return (
    <>
        <div className='w-full min-h-screen'>
            {/* <Logo/> */}
            <Chatbot/>
        </div>
    </>
  )
}

export default App