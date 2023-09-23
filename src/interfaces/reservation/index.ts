import { UserInterface } from 'interfaces/user';
import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  start_date: any;
  end_date: any;
  room_number: number;
  guest_count: number;
  status: string;
  user_id: string;
  hotel_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  hotel?: HotelInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  user_id?: string;
  hotel_id?: string;
}
