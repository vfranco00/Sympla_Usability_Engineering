import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../mockData';
import { MapPin, Calendar, Info, Minus, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function EventDetail() {
    const { user, setIsLoginModalOpen } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const evento = mockEvents.find((e) => e.id === id);

    const [tickets, setTickets] = useState<Record<string, number>>({});
    const [assentosSelecionados, setAssentosSelecionados] = useState<number[]>([]);

    const assentosOcupados = [3, 7, 12, 18, 19];

    if (!evento) {
        return <div className="p-8 text-center text-2xl mt-10">Evento não encontrado.</div>;
    }

    const totalTickets = Object.values(tickets).reduce((acc, qtd) => acc + qtd, 0);

    const totalValue = evento.categories.reduce((acc, cat) => {
        const qtd = tickets[cat.id] || 0;
        return acc + (cat.price * qtd);
    }, 0);

    const updateTicketCount = (categoryId: string, delta: number) => {
        setTickets(prev => {
            const current = prev[categoryId] || 0;
            const newValue = Math.max(0, current + delta);

            const newTotalTickets = totalTickets + delta;
            if (evento.eventType === 'teatro' && assentosSelecionados.length > newTotalTickets) {
                setAssentosSelecionados(prevAssentos => prevAssentos.slice(0, newTotalTickets));
            }

            return { ...prev, [categoryId]: newValue };
        });
    };

    const toggleAssento = (numero: number) => {
        if (assentosSelecionados.includes(numero)) {
            setAssentosSelecionados(prev => prev.filter(n => n !== numero));
        } else {
            if (assentosSelecionados.length < totalTickets) {
                setAssentosSelecionados(prev => [...prev, numero]);
            } else {
                alert(`Você só selecionou ${totalTickets} ingresso(s). Aumente a quantidade ao lado para marcar mais lugares.`);
            }
        }
    };

    const canProceedToCheckout = () => {
        if (totalTickets === 0) return false;
        if (evento.eventType === 'teatro' && assentosSelecionados.length !== totalTickets) return false;
        return true;
    };

    // Configuração visual dos setores do Teatro
    const teatroSections = [
        { title: 'PLATEIA VIP (Frente)', start: 1, end: 10, bg: 'bg-amber-50', textColor: 'text-amber-700' },
        { title: 'PLATEIA COMUM (Meio)', start: 11, end: 20, bg: 'bg-blue-50', textColor: 'text-blue-700' },
        { title: 'BALCÃO (Fundo)', start: 21, end: 30, bg: 'bg-gray-100', textColor: 'text-gray-700' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-8 flex flex-col md:flex-row">
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <span className="bg-symplaBlue text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">
                        {evento.eventType}
                    </span>
                    <h1 className="text-4xl font-bold text-white mb-4">{evento.title}</h1>
                    <div className="flex items-center text-gray-300 mb-2">
                        <Calendar className="h-5 w-5 mr-2" /> <span>{evento.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                        <MapPin className="h-5 w-5 mr-2" /> <span>{evento.location}</span>
                    </div>
                </div>
                <div className="md:w-1/2 h-64 md:h-80">
                    <img src={evento.imageUrl} alt={evento.title} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Sobre o evento</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                            {evento.fullDescription?.map((paragrafo, index) => (
                                <p key={index}>{paragrafo}</p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            {evento.eventType === 'show' ? 'Mapa de Setores' : 'Escolha seus assentos'}
                        </h2>

                        {evento.eventType === 'show' && (
                            <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                                {evento.sectorMapImage ? (
                                    <img src={evento.sectorMapImage} alt="Mapa de setores" className="w-full" />
                                ) : (
                                    <div className="p-10 text-center text-gray-500 bg-gray-50">Mapa não disponível</div>
                                )}
                                <div className="p-4 bg-blue-50 text-blue-800 flex items-center text-sm">
                                    <Info className="w-5 h-5 mr-2 shrink-0" />
                                    Os setores não possuem numeração de assentos. A circulação é livre dentro do setor escolhido no momento da compra.
                                </div>
                            </div>
                        )}

                        {evento.eventType === 'teatro' && (
                            <>
                                {totalTickets === 0 && (
                                    <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-gray-200">
                                        <AlertCircle className="w-12 h-12 text-symplaBlue mb-3" />
                                        <p className="text-xl font-bold text-gray-800">Selecione os ingressos primeiro</p>
                                        <p className="text-gray-600 mt-2 text-center max-w-sm">
                                            Você precisa adicionar ingressos no painel ao lado antes de escolher suas cadeiras.
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex space-x-4 text-sm font-medium">
                                        <span className="flex items-center"><div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div> Livre</span>
                                        <span className="flex items-center"><div className="w-4 h-4 bg-symplaBlue rounded mr-2"></div> Selecionado</span>
                                        <span className="flex items-center"><div className="w-4 h-4 bg-red-400 rounded mr-2"></div> Ocupado</span>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-800 text-white text-center py-3 rounded-lg mb-8 font-bold tracking-widest shadow-md">
                                    PALCO PRINCIPAL
                                </div>

                                <div className="space-y-6">
                                    {/* Loop para renderizar os 3 setores que criamos */}
                                    {teatroSections.map((section) => (
                                        <div key={section.title} className={`${section.bg} p-4 rounded-lg border border-gray-200`}>
                                            <h3 className={`text-center text-xs font-bold mb-4 uppercase tracking-widest ${section.textColor}`}>
                                                {section.title}
                                            </h3>
                                            <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
                                                {Array.from({ length: section.end - section.start + 1 }, (_, i) => i + section.start).map((numero) => {
                                                    const isOcupado = assentosOcupados.includes(numero);
                                                    const isSelecionado = assentosSelecionados.includes(numero);

                                                    return (
                                                        <button
                                                            key={numero}
                                                            disabled={isOcupado || totalTickets === 0}
                                                            onClick={() => toggleAssento(numero)}
                                                            className={`h-10 w-full rounded font-bold transition-all text-sm border ${isOcupado
                                                                ? 'bg-red-400 border-red-500 text-white cursor-not-allowed opacity-50'
                                                                : isSelecionado
                                                                    ? 'bg-symplaBlue border-symplaBlue text-white shadow-lg scale-105'
                                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-symplaBlue'
                                                                }`}
                                                        >
                                                            {numero}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center text-sm font-medium text-gray-600 bg-gray-50 py-3 rounded-lg border border-gray-200">
                                    Assentos marcados: <span className="font-bold text-symplaBlue">{assentosSelecionados.length}</span> de {totalTickets}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 bg-gray-50 p-3 rounded text-center">
                        Ingressos
                    </h2>

                    <div className="space-y-4 mb-6">
                        {evento.categories.map((cat) => {
                            const qtd = tickets[cat.id] || 0;
                            return (
                                <div key={cat.id} className="border border-gray-200 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm">{cat.name}</h3>
                                            <p className="text-gray-900 font-bold mt-1">R$ {cat.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                onClick={() => updateTicketCount(cat.id, -1)}
                                                className="p-2 text-symplaBlue hover:bg-gray-100 disabled:opacity-50"
                                                disabled={qtd === 0}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-10 text-center font-medium text-gray-800">{qtd}</span>
                                            <button
                                                onClick={() => updateTicketCount(cat.id, 1)}
                                                className="p-2 text-symplaBlue hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600 font-medium">Total</span>
                            <span className="text-2xl font-bold text-gray-900">R$ {totalValue.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        disabled={!canProceedToCheckout()}
                        onClick={() => {
                            if (!user) {
                                setIsLoginModalOpen(true); // <--- AGORA ABRE O MODAL DIRETO!
                                return;
                            }
                            navigate(`/checkout/${evento.id}`, { state: { totalTickets } });
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center shadow-sm"
                    >
                        {evento.eventType === 'teatro' && totalTickets > 0 && assentosSelecionados.length < totalTickets
                            ? `Falta marcar ${totalTickets - assentosSelecionados.length} assento(s)`
                            : 'Comprar Ingressos'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}