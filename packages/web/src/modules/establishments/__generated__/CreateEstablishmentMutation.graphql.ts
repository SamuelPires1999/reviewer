/**
 * @generated SignedSource<<30896bc9efae842a1dda46cdaa0f6f4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EstablishmentCreateInput = {
  address: string;
  category?: string | null;
  clientMutationId?: string | null;
  description?: string | null;
  name: string;
  referenceLink?: string | null;
};
export type CreateEstablishmentMutation$variables = {
  connections: ReadonlyArray<string>;
  input: EstablishmentCreateInput;
};
export type CreateEstablishmentMutation$data = {
  readonly CreateEstablishmentMutation: {
    readonly EstablishmentEdge: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"EstablishmentCard_establishnment">;
      } | null;
    } | null;
    readonly error: string | null;
  } | null;
};
export type CreateEstablishmentMutation = {
  response: CreateEstablishmentMutation$data;
  variables: CreateEstablishmentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateEstablishmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EstablishmentCreatePayload",
        "kind": "LinkedField",
        "name": "CreateEstablishmentMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EstablishmentEdge",
            "kind": "LinkedField",
            "name": "EstablishmentEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Establishment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EstablishmentCard_establishnment"
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateEstablishmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EstablishmentCreatePayload",
        "kind": "LinkedField",
        "name": "CreateEstablishmentMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EstablishmentEdge",
            "kind": "LinkedField",
            "name": "EstablishmentEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Establishment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "referenceLink",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "address",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
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
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
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
            "name": "EstablishmentEdge",
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
    "cacheID": "3f19f586b328b7d9b131baefb8bbe8ab",
    "id": null,
    "metadata": {},
    "name": "CreateEstablishmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateEstablishmentMutation(\n  $input: EstablishmentCreateInput!\n) {\n  CreateEstablishmentMutation(input: $input) {\n    error\n    EstablishmentEdge {\n      node {\n        ...EstablishmentCard_establishnment\n        id\n      }\n    }\n  }\n}\n\nfragment EstablishmentCard_establishnment on Establishment {\n  _id\n  referenceLink\n  description\n  address\n  name\n  category\n  createdAt\n  reviews {\n    count\n  }\n  user {\n    _id\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e7c17d55c7e2610f500ce766dbcbdae";

export default node;
