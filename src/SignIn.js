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
  isEmailValid,
} from '@soffos/ui';

const SignIn = ({ onSignIn, isLoading, submitErrors, showLabelInput }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const formRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleSignIn = (values) => {
    onSignIn(values);
  };

  return (
    <VStack
      id="signIn-form"
      spacing="5"
      as="form"
      onSubmit={handleSubmit(handleSignIn)}
      noValidate
      ref={formRef}
    >
      <FormControl
        id="signIn-username"
        isRequired
        isInvalid={!!formErrors.email}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>Email</FormLabel>}
        <Controller
          control={control}
          autoComplete="username"
          rules={{
            required: 'This field is required',
            validate: (value) => isEmailValid(value) || 'Enter valid email',
          }}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              variant="filled"
              placeholder="Email"
            />
          )}
        />
        <FormErrorMessage>{formErrors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="signIn-password"
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
          form="signIn-form"
          id="signIn-submit"
          type="submit"
          isLoading={isLoading}
        >
          Log In
        </Button>
      </HStack>
    </VStack>
  );
};

export default SignIn;
