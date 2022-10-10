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
  NumberInput,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ConnectionHandler, useMutation } from 'react-relay';
import * as Yup from 'yup';
import { CreateReview } from './CreateReview';
import { CreateReviewMutation as MutationType } from './__generated__/CreateReviewMutation.graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  establishmentId: string | undefined;
  establishmentConnection: string;
}

export const ReviewModal = (props: Props) => {
  const [commit, isInFlight] = useMutation<MutationType>(CreateReview);
  const toast = useToast();

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

  const connectionID = ConnectionHandler.getConnectionID(
    props.establishmentConnection,
    'GetSingleEstablishmentQuery__reviews',
  );

  const onSubmit: SubmitHandler<Inputs> = data => {
    commit({
      variables: {
        rating: data.rating.toString(),
        comment: data.comment,
        establishment: props.establishmentId || '000',
        connections: [props.establishmentConnection],
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
