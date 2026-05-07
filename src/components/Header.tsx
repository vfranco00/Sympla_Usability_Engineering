import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, User, PlusCircle, Calendar,   LogOut, Ticket, X } from 'lucide-react';

export function Header() {
  // Agora puxamos o isLoginModalOpen direto do Contexto Global
  const { user, login, logout, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-6 sticky top-0 z-40">
        
        <div className="flex items-center">
          <Link to="/" className="text-[28px] font-bold text-[#00A5FF] tracking-tighter mr-8">
            Symplä
          </Link>
        </div>

        <div className="flex items-center space-x-8 text-gray-600 font-medium text-[15px]">
          <Link to="/" className="hidden md:flex items-center hover:text-[#00A5FF] transition-colors">
            <PlusCircle className="w-5 h-5 mr-2" /> Criar evento
          </Link>
          <Link to="/" className="hidden md:flex items-center hover:text-[#00A5FF] transition-colors">
            <Calendar className="w-5 h-5 mr-2" /> Meus eventos
          </Link>
          <Link to="/perfil" className="hidden md:flex items-center hover:text-[#00A5FF] transition-colors">
            <Ticket className="w-5 h-5 mr-2 transform -rotate-45" /> Meus ingressos
          </Link>

          <div className="relative">
            <button 
              onClick={() => user ? setIsDropdownOpen(!isDropdownOpen) : setIsLoginModalOpen(true)}
              className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1.5 hover:shadow-md transition-shadow"
            >
              <Menu className="w-5 h-5 text-gray-500 mr-2" />
              {user ? (
                <div className="w-[30px] h-[30px] bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 text-sm tracking-tighter">
                  VF
                </div>
              ) : (
                <div className="w-[30px] h-[30px] bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </button>

            {user && isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-[320px] bg-white border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 text-lg mr-4 shrink-0">VF</div>
                  <div className="overflow-hidden">
                    <p className="text-gray-800 font-bold truncate text-[17px]">{user.name}</p>
                    <p className="text-gray-500 text-sm truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col text-[15px] text-gray-700 mt-2">
                  <Link to="/perfil" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <User className="w-5 h-5 mr-4 text-[#00A5FF]" /> Minha conta
                  </Link>
                  <Link to="/perfil" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 mr-4 text-[#00A5FF]" /> Meus ingressos
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="flex items-center px-6 py-3.5 hover:bg-gray-50 transition-colors w-full text-left">
                    <LogOut className="w-5 h-5 mr-4 text-[#00A5FF]" /> Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* POPUP DE LOGIN */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up">
            
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#00A5FF] tracking-tighter mb-2">Symplä</h2>
              <p className="text-gray-600 font-medium">Acesse sua conta para continuar</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                <input 
                  type="email" 
                  defaultValue="victorfranco02@outlook.com" // <- PRÉ PREENCHIDO
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A5FF] outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                <input 
                  type="password" 
                  defaultValue="123456" // <- PRÉ PREENCHIDO
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A5FF] outline-none transition-all"
                />
              </div>

              <button 
                onClick={login}
                className="w-full bg-[#00A5FF] hover:bg-[#008AE6] text-white font-bold py-3.5 rounded-lg transition-colors mt-2"
              >
                Entrar
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Não tem uma conta? <button className="text-[#00A5FF] font-bold hover:underline">Cadastre-se</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}