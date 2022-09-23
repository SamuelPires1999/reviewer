import { Button, Flex } from '@chakra-ui/react';
import { loadQuery, usePreloadedQuery } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import relayEnvironment from '../../relay/relayEnvironment';
import { useStore } from '../../store/useStore';
import { ProductsGetAllQuery } from './ProductsGetAllQuery';
import type { ProductsGetAllQuery as QueryType } from './__generated__/ProductsGetAllQuery.graphql';

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
