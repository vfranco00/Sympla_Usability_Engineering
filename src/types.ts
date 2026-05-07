export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  price: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  eventType: 'show' | 'teatro';
  sectorMapImage?: string;
  description: string;
  fullDescription?: string[];
  attractions?: string[];
  ticketRules?: string;
  categories: TicketCategory[];
}

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  ticketCategoryId: string;
  purchaseDate: string;
  status: 'Ativo' | 'Encerrado'; // Perfeito para a aba de Meus Ingressos
  qrCodeUrl: string;
}