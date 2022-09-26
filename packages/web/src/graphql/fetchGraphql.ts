async function fetchGraphQL(text: string, variables?: any) {
  let url;

  // using base url for requests in PROD environment and external API in DEV
  if (import.meta.env.PROD === true) {
    url = '/graphql';
  } else {
    url = 'http://localhost:3000/graphql';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `${localStorage.getItem('CHALLENGE-TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  const result = await response.json();

  if (result != null && Array.isArray(result.errors)) {
    if (result.errors[0].message === 'User not logged in') {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return result;
}

export default fetchGraphQL;
