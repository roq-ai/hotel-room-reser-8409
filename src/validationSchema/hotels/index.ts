import * as yup from 'yup';

export const hotelValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  total_rooms: yup.number().integer().nullable(),
  available_rooms: yup.number().integer().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
