import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  Textarea,
  InputProps,
  TextareaProps,
  NumberInput,
  NumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

type Props = InputProps & {
  name: string;
  shouldValidate?: boolean;
};

type TextAreaProps = TextareaProps & {
  name: string;
  shouldValidate?: boolean;
};

type CustomNumberInputProps = NumberInputProps & {
  name: string;
  shouldValidate?: boolean;
};

export const InputField = ({
  name,
  shouldValidate = false,
  ...rest
}: Props) => {
  const [field, meta] = useField(name);

  const hasAnErrorAndHasBeenTouched = !!meta.error && meta.touched;

  const propsWhenShouldValidateProps = {
    isInvalid: hasAnErrorAndHasBeenTouched,
  };

  return (
    <FormControl {...(shouldValidate ? propsWhenShouldValidateProps : {})}>
      <ChakraInput {...field} {...rest} />
      {shouldValidate && (
        <ErrorMessage name={name}>
          {error => (
            <FormErrorMessage
              data-testid={`error-message-${name}`}
              fontSize="xs"
              pt={1}
            >
              {error}
            </FormErrorMessage>
          )}
        </ErrorMessage>
      )}
    </FormControl>
  );
};

export const TextInputField = ({
  name,
  shouldValidate = false,
  ...rest
}: TextAreaProps) => {
  const [field, meta] = useField(name);

  const hasAnErrorAndHasBeenTouched = !!meta.error && meta.touched;

  const propsWhenShouldValidateProps = {
    isInvalid: hasAnErrorAndHasBeenTouched,
  };

  return (
    <FormControl {...(shouldValidate ? propsWhenShouldValidateProps : {})}>
      <Textarea {...field} {...rest} />
      {shouldValidate && (
        <ErrorMessage name={name}>
          {error => (
            <FormErrorMessage
              data-testid={`error-message-${name}`}
              fontSize="xs"
              pt={1}
            >
              {error}
            </FormErrorMessage>
          )}
        </ErrorMessage>
      )}
    </FormControl>
  );
};
