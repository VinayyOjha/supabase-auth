import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Verify from '../pages/Verify'
import { Routes, Route} from 'react-router-dom'
import Landing from '../pages/Landing'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element = { <Landing /> } />
        <Route path='/login' element = { <Login /> } />
        <Route path='/verify' element = { <Verify /> } />
        <Route path='/dashboard' element = { <Dashboard /> } />
    </Routes>
  )
}

export default AppRoutes