import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { InputField } from '../../components/InputField';

export const CreateProduct = () => {
  const formikValue = useFormik({
    initialValues: {
      description: '',
      name: '',
      referenceLink: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      description: Yup.string(),
      name: Yup.string().required(),
      referenceLink: Yup.string(),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'5xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create a product
        </Heading>

        <FormikProvider value={formikValue}>
          <Form>
            <FormControl id="userName" isRequired>
              <FormLabel>Product name</FormLabel>
              <InputField
                placeholder="Product name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="name"
                shouldValidate
                mb={5}
              />
            </FormControl>
            <FormControl id="link">
              <FormLabel>Reference Link</FormLabel>
              <InputField
                placeholder="www.e-commerce-link.com/your-product"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="referenceLink"
                shouldValidate
                mb={5}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>description</FormLabel>
              <InputField
                placeholder="I'm think of buying this product"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="description"
                shouldValidate
                mb={5}
              />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Create
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Stack>
    </Flex>
  );
};
