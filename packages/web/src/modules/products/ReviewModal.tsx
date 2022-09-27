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
  useToast,
  useNumberInput,
  HStack,
  Input,
  NumberInput,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import * as Yup from 'yup';
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
  const toast = useToast();

  const { getDecrementButtonProps, getIncrementButtonProps, getInputProps } =
    useNumberInput({
      step: 1,
      min: 0,
      max: 10,
    });

  const incrementRatingButton = getIncrementButtonProps();
  const ratingInput = getInputProps();
  const decrementRatingButton = getDecrementButtonProps();

  // const formikValue = useFormik({
  //   onSubmit: (values, actions) => {
  //     commit({
  //       variables: {
  //         input: {
  //           rating: values.rating,
  //           comment: values.comment,
  //           product: props.productId || '000',
  //         },
  //       },
  //       onCompleted: data => {
  //         props.onClose();
  //       },
  //     });
  //   },
  // });

  //const { isValid } = formikValue;

  type Inputs = {
    rating: number;
    comment: string;
  };

  const schema = Yup.object({
    rating: Yup.number()
      .min(0, 'The minimum is 0')
      .max(10, 'The maximum is 10')
      .typeError('The rating must be a number'),
    comment: Yup.string(),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    commit({
      variables: {
        input: {
          rating: data.rating.toString(),
          comment: data.comment,
          product: props.productId || '000',
        },
      },
      onCompleted: ({ CreateReviewMutation }) => {
        if (CreateReviewMutation?.error) {
          toast({
            title: 'Error',
            description: 'Something went wrong',
            status: 'error',
            duration: 1500,
          });

          return;
        }
        toast({
          title: 'Success',
          description: 'Review Created',
          status: 'success',
          duration: 1500,
        });
        props.onClose();
      },
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post your review</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
            <Stack spacing={4}>
              <FormControl id="rating">
                <FormLabel>Rating</FormLabel>
                <NumberInput defaultValue={0} min={0} max={10}>
                  <NumberInputField {...register('rating')} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id="comment">
                <FormLabel>Comment</FormLabel>
                <Textarea {...register('comment')} />
              </FormControl>
            </Stack>
          </Stack>
          <Button type="submit" colorScheme="blue" width={'full'}>
            Submit Review
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
