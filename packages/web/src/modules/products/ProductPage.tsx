import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const params = useParams();

  return <div>single product page here, product id: {params.id}</div>;
};
