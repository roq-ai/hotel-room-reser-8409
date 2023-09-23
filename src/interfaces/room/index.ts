import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface RoomInterface {
  id?: string;
  room_number: number;
  room_type: string;
  bed_count: number;
  price_per_night: number;
  is_available: boolean;
  hotel_id: string;
  created_at?: any;
  updated_at?: any;

  hotel?: HotelInterface;
  _count?: {};
}

export interface RoomGetQueryInterface extends GetQueryInterface {
  id?: string;
  room_type?: string;
  hotel_id?: string;
}
