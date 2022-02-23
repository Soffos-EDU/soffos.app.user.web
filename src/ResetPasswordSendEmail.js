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

const ResetPasswordSendEmail = ({
  onResetPasswordSendEmail,
  isLoading,
  submitErrors,
  showLabelInput,
}) => {
  const formRef = useRef(null);
  const {
    control,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const handleResetPasswordSendEmail = (values) => {
    onResetPasswordSendEmail(values);
  };

  return (
    <VStack
      id="resetPasswordSendEmail-form"
      spacing="3"
      as="form"
      onSubmit={handleSubmit(handleResetPasswordSendEmail)}
      noValidate
      ref={formRef}
    >
      <FormControl
        id="resetPasswordSendEmail-email"
        isRequired
        isInvalid={!!formErrors.email}
        isReadOnly={isLoading}
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
          defaultValue=""
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
          w="100%"
          marginTop="5"
          form="resetPasswordSendEmail-form"
          id="resetPasswordSendEmail-submit"
          type="submit"
          isLoading={isLoading}
        >
          Send Reset Password Link
        </Button>
      </HStack>
    </VStack>
  );
};

export default ResetPasswordSendEmail;
