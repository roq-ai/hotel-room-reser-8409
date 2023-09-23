import * as yup from 'yup';

export const roomValidationSchema = yup.object().shape({
  room_number: yup.number().integer().required(),
  room_type: yup.string().required(),
  bed_count: yup.number().integer().required(),
  price_per_night: yup.number().integer().required(),
  is_available: yup.boolean().required(),
  hotel_id: yup.string().nullable().required(),
});
