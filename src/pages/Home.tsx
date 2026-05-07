import { mockEvents } from '../mockData';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-symplaBlue mb-8 text-center">
        Eventos Disponíveis 🎟️
      </h1>

      {/* Grid responsivo: 1 coluna no celular, 2 no tablet, 3 no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Aqui fazemos o loop no nosso vetor mockado */}
        {mockEvents.map((evento) => (
          <Link to={`/event/${evento.id}`} key={evento.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            
            {/* Imagem do Evento */}
            <img 
              src={evento.imageUrl} 
              alt={evento.title} 
              className="w-full h-48 object-cover" 
            />
            
            {/* Informações do Evento */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                {evento.title}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                📍 {evento.location}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                📅 {evento.date}
              </p>
              
              {/* Lista de Ingressos (Categorias) */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Opções de Ingressos:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {evento.categories.map((categoria) => (
                    <li key={categoria.id} className="flex justify-between">
                      <span>{categoria.name}</span>
                      <span className="font-medium text-symplaBlue">
                        R$ {categoria.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default Home;