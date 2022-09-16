async function fetchGraphQL(text: string, variables?: any) {

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
     // Authorization: `JWT jwt token here`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;