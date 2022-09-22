import { List, ListItem, Text } from '@chakra-ui/react';
import { useFragment } from 'react-relay';
import { ProductsGetReviewsFragment } from '../modules/products/ProductsGetReviewsFragment';
import { ProductsGetReviewsFragment$key } from '../modules/products/__generated__/ProductsGetReviewsFragment.graphql';

interface Props {
  product: ProductsGetReviewsFragment$key;
}

export const ReviewList = (props: Props) => {
  const data = useFragment<ProductsGetReviewsFragment$key>(
    ProductsGetReviewsFragment,
    props.product,
  );

  return (
    <List spacing={2}>
      <ListItem>
        <Text as={'span'} fontWeight={'bold'}>
          Between lugs:
        </Text>{' '}
        20 mm
      </ListItem>
    </List>
  );
};
