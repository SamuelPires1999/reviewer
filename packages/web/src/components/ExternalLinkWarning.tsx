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
  Text,
  Link,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  referenceLink: string;
}

export const ExternalLinkWarning = ({
  isOpen,
  onClose,
  referenceLink,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignItems={'center'} display="flex" gap={'6'}>
          <Text>Warning</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You are about to navigate to an external link that doesnt belong to
            our domain, atention is advised.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Link href={referenceLink} target="_blank">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Continue to external website
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
