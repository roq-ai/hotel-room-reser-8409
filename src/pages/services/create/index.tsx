import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createService } from 'apiSdk/services';
import { serviceValidationSchema } from 'validationSchema/services';
import { HotelInterface } from 'interfaces/hotel';
import { getHotels } from 'apiSdk/hotels';
import { ServiceInterface } from 'interfaces/service';

function ServiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ServiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createService(values);
      resetForm();
      router.push('/services');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ServiceInterface>({
    initialValues: {
      service_name: '',
      service_description: '',
      service_price: 0,
      is_available: false,
      hotel_id: (router.query.hotel_id as string) ?? null,
    },
    validationSchema: serviceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Services',
              link: '/services',
            },
            {
              label: 'Create Service',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Service
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.service_name}
            label={'Service Name'}
            props={{
              name: 'service_name',
              placeholder: 'Service Name',
              value: formik.values?.service_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.service_description}
            label={'Service Description'}
            props={{
              name: 'service_description',
              placeholder: 'Service Description',
              value: formik.values?.service_description,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Service Price"
            formControlProps={{
              id: 'service_price',
              isInvalid: !!formik.errors?.service_price,
            }}
            name="service_price"
            error={formik.errors?.service_price}
            value={formik.values?.service_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('service_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl
            id="is_available"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.is_available}
          >
            <FormLabel htmlFor="switch-is_available">Is Available</FormLabel>
            <Switch
              id="switch-is_available"
              name="is_available"
              onChange={formik.handleChange}
              value={formik.values?.is_available ? 1 : 0}
            />
            {formik.errors?.is_available && <FormErrorMessage>{formik.errors?.is_available}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<HotelInterface>
            formik={formik}
            name={'hotel_id'}
            label={'Select Hotel'}
            placeholder={'Select Hotel'}
            fetcher={getHotels}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/services')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'service',
    operation: AccessOperationEnum.CREATE,
  }),
)(ServiceCreatePage);
