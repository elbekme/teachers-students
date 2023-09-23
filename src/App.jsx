import { BrowserRouter,Routes , Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import StudentsPage from './pages/StudentsPage'
import TeacherPage from './pages/TeacherPage'

import './App.css'
import LoginPage from './pages/LoginPage'
import AdminLayout from './components/layout/AdminLayout'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<AdminLayout/>} >
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='teachers' element={<TeacherPage />} />
        <Route path='students' element={<StudentsPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
