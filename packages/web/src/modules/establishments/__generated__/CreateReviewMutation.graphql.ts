/**
 * @generated SignedSource<<709f3239fbc0b20e0a56df2e2ed4443f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateReviewMutation$variables = {
  comment: string;
  connections: ReadonlyArray<string>;
  establishment: string;
  rating: string;
};
export type CreateReviewMutation$data = {
  readonly CreateReviewMutation: {
    readonly error: string | null;
    readonly reviewEdge: {
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
    } | null;
  } | null;
};
export type CreateReviewMutation = {
  response: CreateReviewMutation$data;
  variables: CreateReviewMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "comment"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "establishment"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "rating"
},
v4 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "comment",
        "variableName": "comment"
      },
      {
        "kind": "Variable",
        "name": "establishment",
        "variableName": "establishment"
      },
      {
        "kind": "Variable",
        "name": "rating",
        "variableName": "rating"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comment",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateReviewMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "CreateReviewMutationPayload",
        "kind": "LinkedField",
        "name": "CreateReviewMutation",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ReviewEdge",
            "kind": "LinkedField",
            "name": "reviewEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Review",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Establishment",
                    "kind": "LinkedField",
                    "name": "establishment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v10/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateReviewMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "CreateReviewMutationPayload",
        "kind": "LinkedField",
        "name": "CreateReviewMutation",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ReviewEdge",
            "kind": "LinkedField",
            "name": "reviewEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Review",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v9/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Establishment",
                    "kind": "LinkedField",
                    "name": "establishment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v10/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "reviewEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8838d6a986619c4c52c2b9b719e1b02e",
    "id": null,
    "metadata": {},
    "name": "CreateReviewMutation",
    "operationKind": "mutation",
    "text": "mutation CreateReviewMutation(\n  $rating: String!\n  $comment: String!\n  $establishment: String!\n) {\n  CreateReviewMutation(input: {rating: $rating, comment: $comment, establishment: $establishment}) {\n    error\n    reviewEdge {\n      node {\n        _id\n        comment\n        rating\n        user {\n          _id\n          name\n          id\n        }\n        establishment {\n          _id\n          description\n          name\n          address\n          category\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "026a1174d02eac8ee1a325e6a4e83f52";

export default node;
