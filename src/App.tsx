import Home from '../src/pages/Home'
import Menu from '../src/pages/Menu'
import Categories from '../src/pages/Categories'
import Fauna from './pages/Fauna'
import Flora from './pages/Flora'
import Geral from './pages/Geral'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/quiz-fauna' element={<Fauna />} />
        <Route path='/quiz-flora' element={<Flora />} />
        <Route path='/quiz-geral' element={<Geral />} />
      </Routes>
    </Router>
  )
}

export default App
