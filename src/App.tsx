import Home from '../src/pages/Home'
import Menu from '../src/pages/Menu'
import Categories from '../src/pages/Categories'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </Router>
  )
}

export default App
