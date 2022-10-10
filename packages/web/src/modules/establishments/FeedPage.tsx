import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  graphql,
  loadQuery,
  useLazyLoadQuery,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate } from 'react-router-dom';
import EstablishmentCard from '../../components/EstablishmentCard';
import relayEnvironment from '../../relay/relayEnvironment';
import { useStore } from '../../store/useStore';
import { AuthMeQuery } from '../auth/AuthMeQuery';
import { AuthMeQuery as MeQueryType } from '../auth/__generated__/AuthMeQuery.graphql';
import { GetEstablishments } from './GetEstablishments';
import type { GetEstablishmentsQuery as QueryType } from './__generated__/GetEstablishmentsQuery.graphql';

const preloadedQuery = loadQuery<QueryType>(
  relayEnvironment,
  GetEstablishments,
  {},
);

export const FeedPage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { establishments } = usePreloadedQuery<QueryType>(
    GetEstablishments,
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
        <Button
          width={'full'}
          onClick={() => navigate('/establishments/create')}
        >
          Post a establishment
        </Button>
      )}
      <Flex gap={12} px={12} wrap={'wrap'} width="full" justify={'center'}>
        {establishments.edges.map((establishment, index) => (
          <EstablishmentCard
            key={index}
            //@ts-ignore
            establishment={establishment?.node}
          />
        ))}
      </Flex>
    </>
  );
};
