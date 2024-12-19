import Home from '../src/pages/Home'
import AuthPage from'../src/pages/AuthPage'
import Menu from '../src/pages/Menu'
import Categories from '../src/pages/Categories'
import Fauna from './pages/Fauna'
import Flora from './pages/Flora'
import Geral from './pages/Geral'
import Score from './pages/ScorePage'
import Rewards from './pages/Rewards'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/quiz-fauna' element={<Fauna />} />
        <Route path='/quiz-flora' element={<Flora />} />
        <Route path='/quiz-geral' element={<Geral />} />
        <Route path='/score' element={<Score />} />
        <Route path='/rewards' element={<Rewards />} />
      </Routes>
    </Router>
  )
}

export default App
