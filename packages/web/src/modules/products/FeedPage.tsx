import { loadQuery, usePreloadedQuery } from 'react-relay';
import ProductCard from '../../components/ProductCard';
import relayEnvironment from '../../relay/relayEnvironment';
import { ProductsGetAllQuery } from './ProductsGetAllQuery';
import type { ProductsGetAllQuery as QueryType } from './__generated__/ProductsGetAllQuery.graphql';

const preloadedQuery = loadQuery<QueryType>(
  relayEnvironment,
  ProductsGetAllQuery,
  {},
);

export const FeedPage = () => {
  const { products } = usePreloadedQuery<QueryType>(
    ProductsGetAllQuery,
    preloadedQuery,
  );

  return (
    <div>
      {products.edges.map((product, index) => (
        <ProductCard
          author={product?.node?.user?.name || 'Anon'}
          name={product?.node?.name || 'No name provided'}
          description={product?.node?.description || 'No description provided'}
          reviewCount={product?.node?.reviews.count || 0}
          key={index}
        />
      ))}
    </div>
  );
};
