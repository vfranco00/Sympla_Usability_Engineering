import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Home from './pages/Home';
import { EventDetail } from './pages/EventDetail';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
// 1. IMPORTAR O PROVIDER
import { AuthProvider } from './contexts/AuthContext'; 

function App() {
  return (
    // 2. ENVOLVER TUDO COM O AUTH PROVIDER
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50"> 
          <Header /> 
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Ajustei para /event/:id para bater com o Link do Profile */}
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/perfil" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;