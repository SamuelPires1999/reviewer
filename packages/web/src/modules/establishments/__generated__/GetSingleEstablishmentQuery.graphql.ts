/**
 * @generated SignedSource<<0a11233ea45702df8a9abddb070fbd76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type GetSingleEstablishmentQuery$variables = {
  id: string;
};
export type GetSingleEstablishmentQuery$data = {
  readonly singleEstablishmentBy: {
    readonly _id: string;
    readonly address: string | null;
    readonly category: string | null;
    readonly description: string | null;
    readonly name: string | null;
    readonly referenceLink: string | null;
    readonly reviews: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly _id: string;
          readonly comment: string | null;
          readonly establishment: {
            readonly _id: string;
            readonly address: string | null;
            readonly category: string | null;
            readonly description: string | null;
            readonly name: string | null;
          } | null;
          readonly rating: number | null;
          readonly user: {
            readonly _id: string;
            readonly name: string | null;
          } | null;
        } | null;
      } | null>;
    };
    readonly user: {
      readonly _id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type GetSingleEstablishmentQuery = {
  response: GetSingleEstablishmentQuery$data;
  variables: GetSingleEstablishmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "referenceLink",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comment",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPreviousPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v15/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetSingleEstablishmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Establishment",
        "kind": "LinkedField",
        "name": "singleEstablishmentBy",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": "reviews",
            "args": null,
            "concreteType": "ReviewConnection",
            "kind": "LinkedField",
            "name": "__GetSingleEstablishmentQuery__reviews_connection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ReviewEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Review",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Establishment",
                        "kind": "LinkedField",
                        "name": "establishment",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v6/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetSingleEstablishmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Establishment",
        "kind": "LinkedField",
        "name": "singleEstablishmentBy",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v16/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ReviewConnection",
            "kind": "LinkedField",
            "name": "reviews",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ReviewEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Review",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Establishment",
                        "kind": "LinkedField",
                        "name": "establishment",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v6/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "connection",
            "key": "GetSingleEstablishmentQuery__reviews",
            "kind": "LinkedHandle",
            "name": "reviews"
          },
          (v15/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2191300c87fbb294757c30263bc6d321",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "singleEstablishmentBy",
            "reviews"
          ]
        }
      ]
    },
    "name": "GetSingleEstablishmentQuery",
    "operationKind": "query",
    "text": "query GetSingleEstablishmentQuery(\n  $id: String!\n) {\n  singleEstablishmentBy(id: $id) {\n    _id\n    description\n    referenceLink\n    address\n    name\n    category\n    user {\n      _id\n      name\n      id\n    }\n    reviews {\n      edges {\n        node {\n          _id\n          comment\n          rating\n          user {\n            _id\n            name\n            id\n          }\n          establishment {\n            _id\n            description\n            name\n            address\n            category\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9f7c2d391e8a35b8c04268e212b3572d";

export default node;
