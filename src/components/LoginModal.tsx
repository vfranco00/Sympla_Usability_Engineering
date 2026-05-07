import { X, Mail, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 transition-opacity">
      
      {/* Caixinha do Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[400px] p-8 relative animate-fade-in-up">
        
        {/* Botão de Fechar (Heurística #3: Controle e Liberdade) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Que bom ter você aqui!
        </h2>

        {/* Formulário de Login (Mock) */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="email" 
                defaultValue="victorfranco02@outlook.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-symplaBlue focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="password" 
                defaultValue="123456"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-symplaBlue focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-symplaBlue focus:ring-symplaBlue border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-600">Mantenha-me conectado</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-symplaBlue hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors"
          >
            ENTRAR
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Não possui uma conta? <a href="#" className="text-symplaBlue font-medium hover:underline">Cadastre-se</a>
        </div>

      </div>
    </div>
  );
}