import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { TextInputField, InputField } from '../../components/InputField';
import { ProductsMakeReviewMutation } from './ProductsMakeReviewMutation';
import { ProductsMakeReviewMutation as MutationType } from './__generated__/ProductsMakeReviewMutation.graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productId: string | undefined;
}

export const ReviewModal = (props: Props) => {
  const [commit, isInFlight] = useMutation<MutationType>(
    ProductsMakeReviewMutation,
  );

  const formikValue = useFormik({
    initialValues: { rating: '0', comment: '' },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      rating: Yup.number().min(0).max(10),
      comment: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      commit({
        variables: {
          input: {
            rating: values.rating,
            comment: values.comment,
            product: props.productId || '000',
          },
        },
        onCompleted: data => {
          props.onClose();
        },
      });
    },
  });

  const { isValid } = formikValue;

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post your review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormikProvider value={formikValue}>
            <Form>
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
                <Stack spacing={4}>
                  <FormControl id="rating">
                    <FormLabel>Rating</FormLabel>
                    <InputField id="rating" name="rating" shouldValidate />
                  </FormControl>
                  <FormControl id="comment">
                    <FormLabel>Comment</FormLabel>
                    <TextInputField
                      id="comment"
                      name="comment"
                      placeholder="This product is amazing, or is it..."
                    />
                  </FormControl>
                </Stack>
              </Stack>
              <Button
                disabled={!isValid}
                type="submit"
                colorScheme="blue"
                width={'full'}
              >
                Submit Review
              </Button>
            </Form>
          </FormikProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
