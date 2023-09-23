import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface ServiceInterface {
  id?: string;
  service_name: string;
  service_description?: string;
  service_price: number;
  is_available: boolean;
  hotel_id: string;
  created_at?: any;
  updated_at?: any;

  hotel?: HotelInterface;
  _count?: {};
}

export interface ServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  service_name?: string;
  service_description?: string;
  hotel_id?: string;
}
