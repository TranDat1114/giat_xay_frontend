import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '@/pages/home';
import AboutPage from './pages/about';
import Layout from './components/layout/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </Router>

  )
}

export default App
