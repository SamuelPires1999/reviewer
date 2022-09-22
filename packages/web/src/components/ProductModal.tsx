import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
} from '@chakra-ui/react';
import { useLazyLoadQuery } from 'react-relay';
import { ProductsGetSingleQuery } from '../modules/products/ProductsGetSingleQuery';
import type { ProductsGetSingleQuery as QueryType } from '../modules/products/__generated__/ProductsGetSingleQuery.graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export const ProductModal = ({ isOpen, onClose, id }: Props) => {
  const { singleProductById } = useLazyLoadQuery<QueryType>(
    ProductsGetSingleQuery,
    { id: id },
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignItems={'center'} display="flex" gap={'6'}>
          <Avatar
            size={'md'}
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
          />
          {singleProductById?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{singleProductById?.description}</ModalBody>

        <ModalBody>{singleProductById?.category}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
