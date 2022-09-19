async function fetchGraphQL(text: string, variables?: any) {
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${localStorage.getItem('CHALLENGE-TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGraphQL;
