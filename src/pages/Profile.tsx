import { useState } from 'react';
import { mockOrders, mockEvents } from '../mockData';
import { Calendar, MapPin, Download, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Profile() {
  const [abaAtiva, setAbaAtiva] = useState<'Ativo' | 'Encerrado'>('Ativo');

  const ingressosFiltrados = mockOrders
    .filter(order => order.status === abaAtiva)
    .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Ingressos</h1>
        <p className="text-gray-600">Acesse seus ingressos para eventos futuros ou veja seu histórico.</p>
      </div>

      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setAbaAtiva('Ativo')}
          className={`pb-4 px-6 font-semibold text-sm transition-colors relative ${abaAtiva === 'Ativo' ? 'text-symplaBlue' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Próximos Eventos
          {abaAtiva === 'Ativo' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-symplaBlue rounded-t-md"></div>}
        </button>
        <button
          onClick={() => setAbaAtiva('Encerrado')}
          className={`pb-4 px-6 font-semibold text-sm transition-colors relative ${abaAtiva === 'Encerrado' ? 'text-symplaBlue' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Eventos Passados
          {abaAtiva === 'Encerrado' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-symplaBlue rounded-t-md"></div>}
        </button>
      </div>

      <div className="space-y-6">
        {ingressosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-medium">Você não possui ingressos {abaAtiva.toLowerCase()}.</p>
          </div>
        ) : (
          ingressosFiltrados.map((order) => {
            const evento = mockEvents.find(e => e.id === order.eventId);
            if (!evento) return null;

            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md">
                
                <Link to={`/event/${evento.id}`} className="w-full md:w-48 h-48 md:h-auto relative shrink-0 block hover:opacity-90 transition-opacity">
                  <img src={evento.imageUrl} alt={evento.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white ${abaAtiva === 'Ativo' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {abaAtiva === 'Ativo' ? 'Válido' : 'Utilizado'}
                  </div>
                </Link>

                <div className="p-6 flex-grow border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
                  <div>
                    <p className="text-symplaBlue font-bold text-sm mb-1 uppercase tracking-wider">{evento.eventType}</p>
                    <Link to={`/event/${evento.id}`} className="hover:underline">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">{evento.title}</h2>
                    </Link>
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {evento.date}</p>
                      <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {evento.location}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:w-64 flex flex-col items-center justify-center bg-gray-50 shrink-0">
                  <div className={`bg-white p-3 rounded-xl shadow-sm border ${abaAtiva === 'Ativo' ? 'border-symplaBlue' : 'border-gray-200 opacity-50'}`}>
                    <img src={order.qrCodeUrl} alt="QR Code do Ingresso" className="w-32 h-32" />
                  </div>
                  <p className="text-xs text-gray-500 mt-4 text-center font-mono">ID: {order.id.toUpperCase()}</p>
                  
                  {abaAtiva === 'Ativo' && (
                    <button className="mt-4 w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg flex items-center justify-center transition-colors text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}