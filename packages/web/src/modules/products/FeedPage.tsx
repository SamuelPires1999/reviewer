import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  loadQuery,
  useLazyLoadQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import relayEnvironment from '../../relay/relayEnvironment';
import { useStore } from '../../store/useStore';
import { ProductsGetAllQuery } from './ProductsGetAllQuery';
import type { ProductsGetAllQuery as QueryType } from './__generated__/ProductsGetAllQuery.graphql';
import { AuthMeQuery } from '../auth/AuthMeQuery';
import { AuthMeQuery as MeQueryType } from '../auth/__generated__/AuthMeQuery.graphql';

const preloadedQuery = loadQuery<QueryType>(
  relayEnvironment,
  ProductsGetAllQuery,
  {},
);

export const FeedPage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { products } = usePreloadedQuery<QueryType>(
    ProductsGetAllQuery,
    preloadedQuery,
  );
  const authData = useLazyLoadQuery<MeQueryType>(AuthMeQuery, {});

  useEffect(() => {
    if (!store.user && localStorage.getItem('CHALLENGE-TOKEN')) {
      store.setUser({
        _id: authData.me?._id || '000',
        email: authData.me?.email || '',
        name: authData.me?.name || '',
      });
    }
  }, []);

  return (
    <>
      {store.user && (
        <Button width={'full'} onClick={() => navigate('/products/create')}>
          Create a product
        </Button>
      )}
      <Flex gap={12} px={12} wrap={'wrap'} width="full" justify={'center'}>
        {products.edges.map((product, index) => (
          <ProductCard
            author={product?.node?.user?.name || 'Anon'}
            name={product?.node?.name || 'No name provided'}
            description={
              product?.node?.description || 'No description provided'
            }
            reviewCount={product?.node?.reviews.count || 0}
            category={product?.node?.category || 'No category'}
            id={product?.node?._id || '000'}
            key={index}
          />
        ))}
      </Flex>
    </>
  );
};
