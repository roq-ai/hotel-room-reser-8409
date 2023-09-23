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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getHotelById, updateHotelById } from 'apiSdk/hotels';
import { hotelValidationSchema } from 'validationSchema/hotels';
import { HotelInterface } from 'interfaces/hotel';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function HotelEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const imageUploaderRef = useRef(null);
  const { data, error, isLoading, mutate } = useSWR<HotelInterface>(
    () => (id ? `/hotels/${id}` : null),
    () => getHotelById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: HotelInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      await imageUploaderRef.current.handleUpload();
      const updated = await updateHotelById(id, values);
      mutate(updated);
      resetForm();
      router.push('/hotels');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const handleImageChange = async (file: File | null) => {
    //
  };

  const formik = useFormik<HotelInterface>({
    initialValues: data,
    validationSchema: hotelValidationSchema,
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
              label: 'Hotels',
              link: '/hotels',
            },
            {
              label: 'Update Hotel',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Hotel
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper wrapperProps={{ mb: 3 }}>
          <ImagePicker ref={imageUploaderRef} onChange={handleImageChange} entity="hotel" entityId={id} />
        </FormWrapper>

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Total Rooms"
            formControlProps={{
              id: 'total_rooms',
              isInvalid: !!formik.errors?.total_rooms,
            }}
            name="total_rooms"
            error={formik.errors?.total_rooms}
            value={formik.values?.total_rooms}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_rooms', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Available Rooms"
            formControlProps={{
              id: 'available_rooms',
              isInvalid: !!formik.errors?.available_rooms,
            }}
            name="available_rooms"
            error={formik.errors?.available_rooms}
            value={formik.values?.available_rooms}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('available_rooms', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/hotels')}
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
    entity: 'hotel',
    operation: AccessOperationEnum.UPDATE,
  }),
)(HotelEditPage);
