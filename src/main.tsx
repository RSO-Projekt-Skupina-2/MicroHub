import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import ProfilePage from './pages/ProfilePage'
import CreatePost from './pages/CreatePost'
import CreateUser from './pages/CreateUser'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/newPost" element={<CreatePost/>}/>
          <Route path="/newUser" element={<CreateUser/>}/>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
