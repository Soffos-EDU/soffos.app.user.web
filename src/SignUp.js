import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
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
  Checkbox,
  Link,
  Text,
  ViewIcon,
  ViewOffIcon,
  isEmailValid,
  isPasswordValid,
} from '@soffos/ui';

const SignUp = ({ onSignUp, isLoading, submitErrors, showLabelInput }) => {
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
  const dobValue = watch('birthdate', '');
  const passwordValue = watch('password', '');

  const handleAgeValue = (dob) => {
    const getDobYear = dob.split('/')[2];

    if (getDobYear) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - getDobYear;

      return age;
    } else {
      return null;
    }
  };

  const isResponsibleNeed = (dob) => {
    const age = handleAgeValue(dob);

    if (age && age >= 13 && age < 18) {
      return true;
    }
  };

  const isNotAllowed = (dob) => {
    const age = handleAgeValue(dob);

    if (age && age < 13) {
      return 'Sorry, you are not allowed by law to use the TestMe app until you are over 13 years old.';
    }
  };

  const formateDate = (dateValue) => {
    const splitDate = dateValue.split('/');
    const dateFormatted = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;

    return dateFormatted;
  };

  const handleSignUp = (values) => {
    const formValues = { ...values, birthdate: formateDate(dobValue) };

    onSignUp(formValues);
  };

  return (
    <VStack
      id="signUp-form"
      spacing="3"
      as="form"
      onSubmit={handleSubmit(handleSignUp)}
      noValidate
      ref={formRef}
    >
      <FormControl
        id="signUp-firstName"
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
          defaultValue=""
          render={({ field }) => (
            <Input {...field} variant="filled" placeholder="First Name" />
          )}
        />
        <FormErrorMessage>{formErrors?.first_name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="signUp-lastName"
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
          defaultValue=""
          render={({ field }) => (
            <Input {...field} variant="filled" placeholder="Last Name" />
          )}
        />
        <FormErrorMessage>{formErrors?.last_name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="signUp-dob"
        isRequired
        isInvalid={!!formErrors.birthdate}
        isReadOnly={isLoading}
      >
        {showLabelInput && <FormLabel>Birthday</FormLabel>}
        <Controller
          control={control}
          autoComplete="dob"
          rules={{
            required: 'This field is required',
            validate: (value) => isNotAllowed(value),
          }}
          type="date"
          name="birthdate"
          defaultValue=""
          render={({ field }) => (
            <InputMask {...field} mask="99/99/9999" maskChar="">
              {(inputProps) => (
                <Input
                  {...inputProps}
                  variant="filled"
                  type="tel"
                  placeholder="Birthday (MM/DD/YYYY)"
                />
              )}
            </InputMask>
          )}
        />
        <FormErrorMessage>{formErrors?.birthdate?.message}</FormErrorMessage>
      </FormControl>
      {isResponsibleNeed(dobValue) && (
        <>
          <Text>
            {`You can only use the TestMe app with permission and supervision from a parent or guardian. Please enter the name of your parent or guardian and give their email address below. We will send them an email to verify that person's permission.`}
          </Text>
          <FormControl
            id="signUp-responsibleEmail"
            isRequired
            isInvalid={!!formErrors.responsible}
            isReadOnly={isLoading}
          >
            {showLabelInput && <FormLabel>Responsible Email</FormLabel>}
            <Controller
              control={control}
              autoComplete="email"
              rules={{
                required: 'This field is required',
                validate: (value) => isEmailValid(value) || 'Enter valid email',
              }}
              name="responsible"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  variant="filled"
                  placeholder="Responsible Email"
                />
              )}
            />
            <FormErrorMessage>
              {formErrors?.responsible?.message}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
      <FormControl
        id="signUp-email"
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
        id="signUp-password"
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
        id="signUp-confirmPassword"
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
      <FormControl
        id="signUp-promotionalNotification"
        isRequired
        isInvalid={!!formErrors.allow_promotion_notifications}
      >
        <Controller
          control={control}
          name="allow_promotion_notifications"
          render={({ field }) => (
            <Checkbox
              mt="3"
              alignItems="baseline"
              isInvalid={!!formErrors.allow_promotion_notifications}
              {...field}
            >
              Allow promotional Notifications
            </Checkbox>
          )}
          defaultValue={false}
        />
        <FormErrorMessage ml={4}>
          {formErrors?.allow_promotion_notifications?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="signUp-termsAndPrivacy"
        isRequired
        isInvalid={!!formErrors.termsAndPrivacy}
      >
        <Controller
          control={control}
          name="termsAndPrivacy"
          rules={{ required: 'You need to agree to the terms and privacy' }}
          render={({ field }) => (
            <Checkbox
              alignItems="baseline"
              isInvalid={!!formErrors.termsAndPrivacy}
              {...field}
            >
              I agree to the{' '}
              <Link target="_blank" href="/terms-and-privacy">
                terms and privacy.
              </Link>
            </Checkbox>
          )}
          defaultValue={false}
        />
        <FormErrorMessage ml={4}>
          {formErrors?.termsAndPrivacy?.message}
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
          form="signUp-form"
          id="signUp-submit"
          type="submit"
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </HStack>
    </VStack>
  );
};

export default SignUp;
