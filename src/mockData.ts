import type { Event, Order, User } from './types';

export const mockUser: User = {
  id: 'u1',
  name: 'Victor Franco',
  email: 'victorfranco02@outlook.com'
};

export const mockEvents: Event[] = [
  {
    id: 'e1',
    eventType: 'show',
    title: 'Samba Prime Festival',
    date: '18 e 19 de Maio de 2026',
    location: 'Estádio Mineirão, Belo Horizonte - MG',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000',
    sectorMapImage: 'https://via.placeholder.com/800x600/00A5FF/ffffff?text=MAPA+MINEIRAO+-+SAMBA+PRIME',
    description: 'O maior festival de samba e pagode do mundo volta ao Gigante da Pampulha!',
    fullDescription: [
      "O Samba Prime chega à sua 10ª edição com uma estrutura nunca antes vista.",
      "Serão mais de 20 atrações divididas em dois palcos, áreas de descanso, praça de alimentação gourmet e ativações de marcas.",
      "Evento 100% à prova de chuva nas áreas cobertas do estádio."
    ],
    attractions: ['Ludmilla', 'Menos é Mais', 'Sorriso Maroto', 'Dilsinho', 'Ferrugem'],
    ticketRules: 'Classificação 18 anos. Obrigatória apresentação de documento original com foto.',
    categories: [
      { id: 'c1', name: 'Espaço Golden (Open Bar)', price: 350.00 },
      { id: 'c2', name: 'Lounge Vip', price: 220.00 },
      { id: 'c3', name: 'Pista Extra', price: 120.00 }
    ]
  },
  {
    id: 'e2',
    eventType: 'show',
    title: 'Rock in Rio 2026 - Edição Especial',
    date: '12 de Setembro às 14:00',
    location: 'Cidade do Rock, Rio de Janeiro - RJ',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000',
    description: 'A experiência definitiva do rock está de volta.',
    fullDescription: [
      "Prepare-se para o maior festival de música e entretenimento do mundo.",
      "Sinta a energia da Cidade do Rock com sete palcos e experiências imersivas."
    ],
    attractions: ['Imagine Dragons', 'Måneskin', 'The Offspring'],
    ticketRules: 'Ingressos limitados a 4 por CPF. Meia-entrada sujeita à comprovação.',
    categories: [
      { id: 'c4', name: 'Gramado - Inteira', price: 795.00 },
      { id: 'c5', name: 'Gramado - Meia', price: 397.50 },
      { id: 'c9', name: 'VIP Card', price: 2800.00 }
    ]
  },
  {
    id: 'e3',
    eventType: 'teatro',
    title: 'O Fantasma da Ópera',
    date: '15 de Novembro de 2026 às 20:00',
    location: 'Teatro Renault, São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=2000',
    description: 'A obra-prima de Andrew Lloyd Webber em curta temporada.',
    fullDescription: [
      "O musical mais longevo da Broadway em uma montagem épica no Brasil.",
      "Um espetáculo visual com figurinos originais e orquestra ao vivo."
    ],
    ticketRules: 'Não será permitida a entrada após o início do espetáculo. Menores de 12 anos acompanhados.',
    categories: [
      { id: 'c6', name: 'Plateia VIP', price: 250.00 },
      { id: 'c7', name: 'Plateia Comum', price: 150.00 },
      { id: 'c8', name: 'Balcão Premium', price: 90.00 }
    ]
  },
  {
    id: 'e4',
    eventType: 'teatro',
    title: 'Thiago Ventura - Modo Efetivo',
    date: '20 de Julho às 21:00',
    location: 'Cine Theatro Brasil Vallourec, Belo Horizonte - MG',
    imageUrl: 'https://images.unsplash.com/photo-1527224857813-fbd7dc7ca541?q=80&w=2000',
    description: 'O novo solo do fenômeno do stand-up nacional.',
    fullDescription: [
      "Neste novo show, Thiago Ventura fala sobre a vida na quebrada e a fama internacional.",
      "Garantia de risadas do início ao fim com um dos maiores nomes da comédia atual."
    ],
    ticketRules: 'Classificação 16 anos. Assentos numerados escolhidos no mapa.',
    categories: [
      { id: 'c10', name: 'Plateia I', price: 120.00 },
      { id: 'c11', name: 'Plateia II', price: 100.00 }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord1',
    userId: 'u1',
    eventId: 'e1',
    ticketCategoryId: 'c1',
    purchaseDate: '2026-04-10T14:30:00',
    status: 'Ativo',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SAMBA-PRIME-GOLDEN-VF'
  },
  {
    id: 'ord2',
    userId: 'u1',
    eventId: 'e3',
    ticketCategoryId: 'c6',
    purchaseDate: '2026-05-01T10:15:00',
    status: 'Ativo',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PHANTOM-OPERA-VIP-VF'
  },
  {
    id: 'ord3',
    userId: 'u1',
    eventId: 'e4',
    ticketCategoryId: 'c10',
    purchaseDate: '2026-04-20T11:00:00',
    status: 'Ativo',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=THIAGO-VENTURA-PLATEIA-VF'
  },
  {
    id: 'ord4',
    userId: 'u1',
    eventId: 'e2', // Rock in Rio (Simulando uma compra passada)
    ticketCategoryId: 'c4',
    purchaseDate: '2025-09-10T09:00:00',
    status: 'Encerrado',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RIR-2025-USED'
  }
];