import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  HStack,
  ViewIcon,
  ViewOffIcon,
  isPasswordValid,
} from '@soffos/ui';

const ResetNewPassword = ({
  onResetNewPassword,
  isLoading,
  submitErrors,
  showLabelInput,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const formRef = useRef(null);
  const {
    control,
    formState: { errors: formErrors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const passwordValue = watch('password', '');

  const handleResetNewPassword = (values) => {
    onResetNewPassword(values);
  };

  return (
    <VStack
      id="resetNewPassword-form"
      spacing="3"
      as="form"
      onSubmit={handleSubmit(handleResetNewPassword)}
      noValidate
      ref={formRef}
    >
      <FormControl
        id="resetNewPassword-password"
        isRequired
        isInvalid={!!formErrors.password}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>Password</FormLabel>}
        <InputGroup>
          <Controller
            control={control}
            autoComplete="currentPassword"
            rules={{
              required: 'This field is required',
              minLength: {
                value: 8,
                message: `Your password must be at least 8 characters long. It can contain letters and numbers, and must contain at least one special character.`,
              },
              validate: (value) =>
                isPasswordValid(value) ||
                `Your password must be at least 8 characters long. It can contain letters and numbers, and must contain at least one special character.`,
            }}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                variant="filled"
                type={isPassVisible ? 'text' : 'password'}
                placeholder="Password"
              />
            )}
          />
          <InputRightElement>
            <IconButton
              variant="unstyled"
              onClick={() => {
                setIsPassVisible((current) => !current);
              }}
              icon={isPassVisible ? <ViewIcon /> : <ViewOffIcon />}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{formErrors?.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="resetNewPassword-confirmPassword"
        isRequired
        isInvalid={!!formErrors.confirmPassword}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>Confirm Password</FormLabel>}
        <InputGroup>
          <Controller
            control={control}
            autoComplete="currentPassword"
            rules={{
              required: 'This field is required',
              validate: (value) =>
                passwordValue === value ||
                'The two passwords provided do not match',
            }}
            name="confirmPassword"
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                variant="filled"
                type={isPassVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
            )}
          />
        </InputGroup>
        <FormErrorMessage>
          {formErrors?.confirmPassword?.message}
        </FormErrorMessage>
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
          form="resetNewPassword-form"
          id="resetNewPassword-submit"
          type="submit"
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </HStack>
    </VStack>
  );
};

export default ResetNewPassword;
