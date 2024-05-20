import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DiscoverRecipes from './pages/discover'
import Login from './pages/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DetailRecipe from './pages/detail'
import Register from './pages/auth/Register'
import CreateRecipe from './pages/create-recipe'
import Profile from './pages/profile'
import Logout from './pages/auth/logout'
import AuthProvider from './AuthProvider'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/logout" element={<Logout/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/discover-recipes" element={<DiscoverRecipes/>} />
          <Route path="/post-recipe" element={<CreateRecipe/>} />
          <Route path="/detail/:slug" element={<DetailRecipe/>} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  )
}

export default App
