import { ReservationInterface } from 'interfaces/reservation';
import { RoomInterface } from 'interfaces/room';
import { ServiceInterface } from 'interfaces/service';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HotelInterface {
  id?: string;
  description?: string;
  location?: string;
  total_rooms?: number;
  available_rooms?: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  reservation?: ReservationInterface[];
  room?: RoomInterface[];
  service?: ServiceInterface[];
  user?: UserInterface;
  _count?: {
    reservation?: number;
    room?: number;
    service?: number;
  };
}

export interface HotelGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
