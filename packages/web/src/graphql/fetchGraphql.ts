async function fetchGraphQL(text: string, variables?: any) {
  const response = await fetch(
    import.meta.env.PROD
      ? 'https://reviewer-graphql-api.herokuapp.com/graphql'
      : 'http://localhost:3000/graphql',
    {
      method: 'POST',
      headers: {
        authorization: `${localStorage.getItem('CHALLENGE-TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    },
  );

  return await response.json();
}

export default fetchGraphQL;
