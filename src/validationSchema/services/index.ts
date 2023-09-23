import * as yup from 'yup';

export const serviceValidationSchema = yup.object().shape({
  service_name: yup.string().required(),
  service_description: yup.string().nullable(),
  service_price: yup.number().integer().required(),
  is_available: yup.boolean().required(),
  hotel_id: yup.string().nullable().required(),
});
