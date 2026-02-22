import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tool from './pages/Tool'
import Pricing from './pages/Pricing'
import SizesPage from './pages/SizesPage'
import Login from './pages/Login'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sizes/:platform" element={<SizesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
