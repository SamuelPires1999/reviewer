import {
  FormControl,
  OutlinedInput as MyInput,
  InputProps,
} from '@mui/material';
import { ErrorMessage, useField } from 'formik';

type Props = InputProps & {
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
      <MyInput {...field} {...rest} />
      {shouldValidate && (
        <ErrorMessage name={name}>{error => error}</ErrorMessage>
      )}
    </FormControl>
  );
};
