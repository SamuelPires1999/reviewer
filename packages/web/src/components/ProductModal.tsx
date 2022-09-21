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

type Product = {
  author: string;
  description: string;
  reviewCount: number;
  name: string;
  category: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productInfo: Product;
}

export const ProductModal = ({ isOpen, onClose, productInfo }: Props) => {
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
          {productInfo.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{productInfo.description}</ModalBody>

        <ModalBody>data here</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
