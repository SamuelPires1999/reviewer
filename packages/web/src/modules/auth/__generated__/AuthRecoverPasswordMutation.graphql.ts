/**
 * @generated SignedSource<<a1924180f4c1814412d80e08146f9fe7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthRecoverPasswordMutation$variables = {
  email: string;
  newPassword: string;
};
export type AuthRecoverPasswordMutation$data = {
  readonly RecoverPasswordMutation: {
    readonly error: string | null;
    readonly success: string | null;
  } | null;
};
export type AuthRecoverPasswordMutation = {
  response: AuthRecoverPasswordMutation$data;
  variables: AuthRecoverPasswordMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "newPassword"
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
            "name": "email",
            "variableName": "email"
          },
          {
            "kind": "Variable",
            "name": "newPassword",
            "variableName": "newPassword"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RecoverPasswordPayload",
    "kind": "LinkedField",
    "name": "RecoverPasswordMutation",
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
        "name": "success",
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
    "name": "AuthRecoverPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthRecoverPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "25ebabe60ba95b78b884f6c507dd9e09",
    "id": null,
    "metadata": {},
    "name": "AuthRecoverPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation AuthRecoverPasswordMutation(\n  $email: String!\n  $newPassword: String!\n) {\n  RecoverPasswordMutation(input: {email: $email, newPassword: $newPassword}) {\n    error\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "9071c36fea947ff6b6f39d9d06f526aa";

export default node;
