/**
 * @generated SignedSource<<0c45da7e1066629772332372e7120bb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EstablishmentCreateInput = {
  address: string;
  category?: string | null;
  clientMutationId?: string | null;
  description?: string | null;
  name: string;
  referenceLink?: string | null;
};
export type CreateEstablishmentMutation$variables = {
  input: EstablishmentCreateInput;
};
export type CreateEstablishmentMutation$data = {
  readonly CreateEstablishmentMutation: {
    readonly EstablishmentEdge: {
      readonly node: {
        readonly _id: string;
        readonly address: string | null;
        readonly category: string | null;
        readonly description: string | null;
        readonly name: string | null;
        readonly user: {
          readonly _id: string;
          readonly name: string | null;
        } | null;
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateEstablishmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EstablishmentCreatePayload",
        "kind": "LinkedField",
        "name": "CreateEstablishmentMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateEstablishmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EstablishmentCreatePayload",
        "kind": "LinkedField",
        "name": "CreateEstablishmentMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fdf52c9c0ae8589b06a5fdd8db1bdc25",
    "id": null,
    "metadata": {},
    "name": "CreateEstablishmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateEstablishmentMutation(\n  $input: EstablishmentCreateInput!\n) {\n  CreateEstablishmentMutation(input: $input) {\n    error\n    EstablishmentEdge {\n      node {\n        _id\n        description\n        address\n        name\n        category\n        user {\n          _id\n          name\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "239cdec12ee8d0a82f0b552004e49a98";

export default node;
