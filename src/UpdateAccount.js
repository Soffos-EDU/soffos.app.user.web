import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Button,
  HStack,
  isEmailValid,
} from '@soffos/core';

const UpdateAccount = ({
  onUpdateAccount,
  isLoading,
  submitErrors,
  showLabelInput,
  userInfo,
}) => {
  const formRef = useRef(null);
  const {
    control,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm();

  const handleUpdateAccount = (values) => {
    const formValues = { ...values };

    onUpdateAccount(formValues);
  };

  return (
    <VStack
      id="account-form"
      spacing="3"
      as="form"
      onSubmit={handleSubmit(handleUpdateAccount)}
      noValidate
      ref={formRef}
    >
      <FormControl
        id="account-firstName"
        isRequired
        isInvalid={!!formErrors.first_name}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>First Name</FormLabel>}
        <Controller
          control={control}
          autoComplete="name"
          rules={{
            required: 'This field is required',
          }}
          type="text"
          name="first_name"
          defaultValue={userInfo.first_name}
          render={({ field }) => (
            <Input {...field} variant="filled" placeholder="First Name" />
          )}
        />
        <FormErrorMessage>{formErrors?.first_name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="account-lastName"
        isRequired
        isInvalid={!!formErrors.last_name}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>Last Name</FormLabel>}
        <Controller
          control={control}
          autoComplete="lastName"
          rules={{
            required: 'This field is required',
          }}
          type="text"
          name="last_name"
          defaultValue={userInfo.last_name}
          render={({ field }) => (
            <Input {...field} variant="filled" placeholder="Last Name" />
          )}
        />
        <FormErrorMessage>{formErrors?.last_name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="account-email"
        isRequired
        isInvalid={!!formErrors.email}
        isReadOnly
      >
        {showLabelInput && <FormLabel>Email</FormLabel>}
        <Controller
          control={control}
          autoComplete="email"
          rules={{
            required: 'This field is required',
            validate: (value) => isEmailValid(value) || 'Enter valid email',
          }}
          type="email"
          name="email"
          defaultValue={userInfo.email}
          render={({ field }) => (
            <Input {...field} variant="filled" placeholder="Email" />
          )}
        />
        <FormErrorMessage>{formErrors?.email?.message}</FormErrorMessage>
      </FormControl>

      {submitErrors && (
        <FormControl isInvalid={submitErrors}>
          <FormErrorMessage>{submitErrors}</FormErrorMessage>
        </FormControl>
      )}
      <HStack w="100%">
        <Button
          variant="outline"
          w={{ base: '100%', md: '148px' }}
          ml="auto"
          marginTop="5"
          form="account-form"
          id="account-submit"
          type="submit"
          isLoading={isLoading}
        >
          Update
        </Button>
      </HStack>
    </VStack>
  );
};

export default UpdateAccount;
