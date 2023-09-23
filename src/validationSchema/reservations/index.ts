import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  room_number: yup.number().integer().required(),
  guest_count: yup.number().integer().required(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  hotel_id: yup.string().nullable().required(),
});
