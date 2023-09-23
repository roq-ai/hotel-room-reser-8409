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

import { createRoom } from 'apiSdk/rooms';
import { roomValidationSchema } from 'validationSchema/rooms';
import { HotelInterface } from 'interfaces/hotel';
import { getHotels } from 'apiSdk/hotels';
import { RoomInterface } from 'interfaces/room';

function RoomCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RoomInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRoom(values);
      resetForm();
      router.push('/rooms');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RoomInterface>({
    initialValues: {
      room_number: 0,
      room_type: '',
      bed_count: 0,
      price_per_night: 0,
      is_available: false,
      hotel_id: (router.query.hotel_id as string) ?? null,
    },
    validationSchema: roomValidationSchema,
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
              label: 'Rooms',
              link: '/rooms',
            },
            {
              label: 'Create Room',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Room
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Room Number"
            formControlProps={{
              id: 'room_number',
              isInvalid: !!formik.errors?.room_number,
            }}
            name="room_number"
            error={formik.errors?.room_number}
            value={formik.values?.room_number}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('room_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.room_type}
            label={'Room Type'}
            props={{
              name: 'room_type',
              placeholder: 'Room Type',
              value: formik.values?.room_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Bed Count"
            formControlProps={{
              id: 'bed_count',
              isInvalid: !!formik.errors?.bed_count,
            }}
            name="bed_count"
            error={formik.errors?.bed_count}
            value={formik.values?.bed_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('bed_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Price Per Night"
            formControlProps={{
              id: 'price_per_night',
              isInvalid: !!formik.errors?.price_per_night,
            }}
            name="price_per_night"
            error={formik.errors?.price_per_night}
            value={formik.values?.price_per_night}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price_per_night', Number.isNaN(valueNumber) ? 0 : valueNumber)
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
              onClick={() => router.push('/rooms')}
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
    entity: 'room',
    operation: AccessOperationEnum.CREATE,
  }),
)(RoomCreatePage);
