/**
 * @generated SignedSource<<ecdde02c265e3d8b7036d3dccbaa476d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteEstablishmentMutation$variables = {
  establishment: string;
};
export type DeleteEstablishmentMutation$data = {
  readonly DeleteEstablishmentMutation: {
    readonly error: string | null;
    readonly message: string | null;
  } | null;
};
export type DeleteEstablishmentMutation = {
  response: DeleteEstablishmentMutation$data;
  variables: DeleteEstablishmentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "establishment"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "establishment",
            "variableName": "establishment"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "EstablishmentDeletePayload",
    "kind": "LinkedField",
    "name": "DeleteEstablishmentMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteEstablishmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteEstablishmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e94c5a738ba442bd3cdee78addad7a3",
    "id": null,
    "metadata": {},
    "name": "DeleteEstablishmentMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteEstablishmentMutation(\n  $establishment: String!\n) {\n  DeleteEstablishmentMutation(input: {establishment: $establishment}) {\n    error\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "8804475634d4d2655302c1d85be83246";

export default node;
