import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockEvents, mockUser } from '../mockData';
import { CheckCircle2, CreditCard, QrCode, Clock, MapPin } from 'lucide-react';

export function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const evento = mockEvents.find((e) => e.id === id);

  const quantidadeIngressos = location.state?.totalTickets || 1;

  const [activeStep, setActiveStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(900);

  const [comprador, setComprador] = useState({
    nome: mockUser.name,
    email: mockUser.email,
    confirmaEmail: mockUser.email
  });

  const [titulares, setTitulares] = useState<Record<number, { nome: string, email: string, confirmaEmail: string }>>({
    0: { nome: mockUser.name, email: mockUser.email, confirmaEmail: mockUser.email }
  });

  const [metodoPagamento, setMetodoPagamento] = useState('cartao');

  const [compradorErros, setCompradorErros] = useState({ nome: '', email: '', confirmaEmail: '' });
  const [titularesErros, setTitularesErros] = useState<Record<number, { nome: '', email: '', confirmaEmail: '' }>>({});

  const ticketSimulado = evento?.categories[0];
  const valorUnitario = ticketSimulado?.price || 0;
  const valorTotalIngressos = valorUnitario * quantidadeIngressos;
  const taxa = 4.00 * quantidadeIngressos;
  const valorTotal = valorTotalIngressos + taxa;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!evento) return <div className="p-8 text-center text-xl">Evento não encontrado.</div>;

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNomeValid = (nome: string) => nome.trim().split(' ').length >= 2;

  // Modificamos as funções de validação para aceitar os dados diretamente
  // Isso permite validar o valor *antes* do estado ser atualizado no React
  const validarPasso1EmTempoReal = (novoComprador: typeof comprador) => {
    const erros = { nome: '', email: '', confirmaEmail: '' };
    let temErro = false;

    if (!isNomeValid(novoComprador.nome)) { erros.nome = 'Digite nome e sobrenome.'; temErro = true; }
    if (!isEmailValid(novoComprador.email)) { erros.email = 'E-mail inválido.'; temErro = true; }
    if (novoComprador.email !== novoComprador.confirmaEmail) { erros.confirmaEmail = 'Os e-mails não conferem.'; temErro = true; }

    setCompradorErros(erros);
    return !temErro;
  };

  const validarPasso2EmTempoReal = (novosTitulares: typeof titulares) => {
    const novosErros: any = {};
    let temErro = false;

    for (let i = 0; i < quantidadeIngressos; i++) {
      const t = novosTitulares[i] || { nome: '', email: '', confirmaEmail: '' };
      novosErros[i] = { nome: '', email: '', confirmaEmail: '' };

      if (!isNomeValid(t.nome)) { novosErros[i].nome = 'Digite nome e sobrenome.'; temErro = true; }
      if (!isEmailValid(t.email)) { novosErros[i].email = 'E-mail inválido.'; temErro = true; }
      if (t.email !== t.confirmaEmail) { novosErros[i].confirmaEmail = 'Os e-mails não conferem.'; temErro = true; }
    }

    setTitularesErros(novosErros);
    return !temErro;
  };

  const handleNextStep = (currentStep: number) => {
    if (currentStep === 1 && validarPasso1EmTempoReal(comprador)) setActiveStep(2);
    if (currentStep === 2 && validarPasso2EmTempoReal(titulares)) setActiveStep(3);
  };

  const handleFinalizarCompra = () => {
    alert("Pagamento aprovado! Ingressos enviados para os e-mails informados.");
    navigate('/perfil');
  };

  const getInputClass = (valor: string | undefined, erro: string) => {
    const val = valor || '';
    const base = "w-full p-2.5 border rounded outline-none transition-colors ";
    if (erro) return base + "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500";
    if (val.length > 3 && !erro) return base + "border-green-500 focus:ring-1 focus:ring-green-500";
    return base + "border-gray-300 focus:ring-1 focus:ring-blue-500";
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-16 absolute top-0 left-0 w-full z-50">
      
      <header className="bg-[#1a1f26] h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="w-24"></div> 
        <div className="text-2xl font-bold text-white tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Symplä</div>
        <div className="flex items-center text-white border border-gray-600 rounded-full px-3 py-1 bg-gray-800/50">
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-mono text-sm tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-6">
        
        <div className="w-full lg:w-2/3 space-y-4">
          
          {/* PASSO 1 */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 flex items-center justify-between bg-white cursor-pointer" onClick={() => activeStep > 1 && setActiveStep(1)}>
              <div>
                <h2 className="text-lg font-bold text-gray-700 flex items-center">
                  {activeStep > 1 ? <CheckCircle2 className="text-green-500 mr-3 h-6 w-6" /> : <span className="border-2 border-blue-500 text-blue-500 rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">1</span>}
                  Recebimento do ingresso
                </h2>
                {activeStep > 1 && <p className="text-sm text-gray-500 ml-10 mt-1">{comprador.email}</p>}
              </div>
              {activeStep > 1 && <span className="text-blue-500 text-sm font-semibold hover:underline">Editar</span>}
            </div>

            {activeStep === 1 && (
              <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-gray-100 mt-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Nome completo <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={comprador.nome} 
                      onChange={(e) => { 
                        const novo = {...comprador, nome: e.target.value};
                        setComprador(novo); 
                        validarPasso1EmTempoReal(novo); // Valida a cada tecla
                      }} 
                      className={getInputClass(comprador.nome, compradorErros.nome)} 
                    />
                    {compradorErros.nome && <p className="text-red-500 text-xs mt-1">{compradorErros.nome}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={comprador.email} 
                      onChange={(e) => { 
                        const novo = {...comprador, email: e.target.value};
                        setComprador(novo); 
                        validarPasso1EmTempoReal(novo); // Valida a cada tecla
                      }} 
                      className={getInputClass(comprador.email, compradorErros.email)} 
                    />
                    {compradorErros.email && <p className="text-red-500 text-xs mt-1">{compradorErros.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Confirmação de e-mail <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={comprador.confirmaEmail} 
                      onChange={(e) => { 
                        const novo = {...comprador, confirmaEmail: e.target.value};
                        setComprador(novo); 
                        validarPasso1EmTempoReal(novo); // Valida a cada tecla
                      }} 
                      className={getInputClass(comprador.confirmaEmail, compradorErros.confirmaEmail)} 
                    />
                    {compradorErros.confirmaEmail && <p className="text-red-500 text-xs mt-1">{compradorErros.confirmaEmail}</p>}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button onClick={() => handleNextStep(1)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded transition-colors">Próximo &gt;</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PASSO 2 */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 flex items-center justify-between bg-white cursor-pointer" onClick={() => activeStep > 2 && setActiveStep(2)}>
              <div>
                <h2 className={`text-lg font-bold flex items-center ${activeStep >= 2 ? 'text-gray-700' : 'text-gray-400'}`}>
                  {activeStep > 2 ? <CheckCircle2 className="text-green-500 mr-3 h-6 w-6" /> : <span className={`border-2 rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3 ${activeStep === 2 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}>2</span>}
                  Informações dos ingressos
                </h2>
                {activeStep > 2 && <p className="text-sm text-gray-500 ml-10 mt-1">{quantidadeIngressos} participante(s) preenchido(s)</p>}
              </div>
              {activeStep > 2 && <span className="text-blue-500 text-sm font-semibold hover:underline">Editar</span>}
            </div>

            {activeStep === 2 && (
              <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-gray-100 mt-2">
                <p className="text-sm text-gray-600 mb-6">Preencha os dados de quem vai utilizar cada ingresso para o envio do QR Code.</p>
                <div className="space-y-6">
                  {Array.from({ length: quantidadeIngressos }).map((_, index) => {
                    const titular = titulares[index] || { nome: '', email: '', confirmaEmail: '' };
                    const erros = titularesErros[index] || { nome: '', email: '', confirmaEmail: '' };
                    return (
                      <div key={index} className="border border-gray-200 rounded-md p-5 bg-gray-50/30">
                        <h3 className="text-sm font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Ingresso {index + 1} - {ticketSimulado?.name}</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Nome e Sobrenome <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={titular.nome}
                              onChange={(e) => {
                                const novo = {...titulares, [index]: {...titular, nome: e.target.value}};
                                setTitulares(novo);
                                validarPasso2EmTempoReal(novo);
                              }}
                              className={getInputClass(titular.nome, erros.nome)}
                            />
                            {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                            <input 
                              type="email" 
                              value={titular.email}
                              onChange={(e) => {
                                const novo = {...titulares, [index]: {...titular, email: e.target.value}};
                                setTitulares(novo);
                                validarPasso2EmTempoReal(novo);
                              }}
                              className={getInputClass(titular.email, erros.email)}
                            />
                            {erros.email && <p className="text-red-500 text-xs mt-1">{erros.email}</p>}
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Confirmação de e-mail <span className="text-red-500">*</span></label>
                            <input 
                              type="email" 
                              value={titular.confirmaEmail}
                              onChange={(e) => {
                                const novo = {...titulares, [index]: {...titular, confirmaEmail: e.target.value}};
                                setTitulares(novo);
                                validarPasso2EmTempoReal(novo);
                              }}
                              className={getInputClass(titular.confirmaEmail, erros.confirmaEmail)}
                            />
                            {erros.confirmaEmail && <p className="text-red-500 text-xs mt-1">{erros.confirmaEmail}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => handleNextStep(2)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded transition-colors">Próximo &gt;</button>
                </div>
              </div>
            )}
          </div>

          {/* PASSO 3 - Mantido igual... */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 flex items-center bg-white">
              <h2 className={`text-lg font-bold flex items-center ${activeStep === 3 ? 'text-gray-700' : 'text-gray-400'}`}>
                <span className={`border-2 rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3 ${activeStep === 3 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}>3</span>
                Pagamento
              </h2>
            </div>
            {activeStep === 3 && (
              <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-gray-100 mt-2">
                <div className="flex gap-4 mb-6">
                  <label className={`flex-1 flex flex-col items-center justify-center p-4 border rounded cursor-pointer transition-colors ${metodoPagamento === 'cartao' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="pag" className="hidden" checked={metodoPagamento === 'cartao'} onChange={() => setMetodoPagamento('cartao')} />
                    <CreditCard className={`h-6 w-6 mb-2 ${metodoPagamento === 'cartao' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${metodoPagamento === 'cartao' ? 'text-blue-600' : 'text-gray-600'}`}>Cartão de Crédito</span>
                  </label>
                  <label className={`flex-1 flex flex-col items-center justify-center p-4 border rounded cursor-pointer transition-colors ${metodoPagamento === 'pix' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="pag" className="hidden" checked={metodoPagamento === 'pix'} onChange={() => setMetodoPagamento('pix')} />
                    <QrCode className={`h-6 w-6 mb-2 ${metodoPagamento === 'pix' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${metodoPagamento === 'pix' ? 'text-blue-600' : 'text-gray-600'}`}>PIX</span>
                  </label>
                </div>
                <button onClick={handleFinalizarCompra} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded shadow-sm transition-colors text-lg mt-4">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Coluna Direita: Resumo - Mantido igual... */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-200 flex flex-col items-start gap-3">
              <div className="flex gap-3">
                <img src={evento.imageUrl} alt={evento.title} className="w-20 h-14 object-cover rounded shadow-sm" />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{evento.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center"><MapPin className="h-3 w-3 mr-1" /> {evento.location}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 mb-4">Resumo do Pedido</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-extrabold text-gray-800">R$ {valorTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}