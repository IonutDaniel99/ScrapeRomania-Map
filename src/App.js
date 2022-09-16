import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Protected from './components/Protected'
import { AuthContextProvider } from './context/AuthContext'

import Main from './pages/Main'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/main'
              element={
                <Protected>
                  <Main />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App
