import ProductCard from "./components/ProductCard"
import Topbar from "./components/Topbar"
import {graphql, loadQuery, usePreloadedQuery} from 'react-relay'
import relayEnvironment from "./relay/relayEnvironment";


  const AllProductsQuery = graphql`
    query AppGetAllProductsQuery {
      products {
        count
        edges {
          node {
            description
            name
            _id
            reviews {
              edges {
                node {
                  comment
                  rating
                  user {
                    email
                    name
                  }
                }
              }
            }
            user {
              name
              email
            }
          }
        }
      }
    }
  `;

  const preloadedQuery = loadQuery(relayEnvironment, AllProductsQuery, {});

function App() {

  const data = usePreloadedQuery(AllProductsQuery, preloadedQuery)


  return (
    <div>
      <Topbar / >
      <ProductCard />
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  )
}

export default App
