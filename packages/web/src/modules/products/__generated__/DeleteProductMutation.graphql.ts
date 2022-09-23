/**
 * @generated SignedSource<<1de151eb231a8661b8a490ff881abf3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductDeleteInput = {
  clientMutationId?: string | null;
  product: string;
};
export type DeleteProductMutation$variables = {
  input: ProductDeleteInput;
};
export type DeleteProductMutation$data = {
  readonly DeleteProductMutation: {
    readonly error: string | null;
    readonly message: string | null;
    readonly success: string | null;
  } | null;
};
export type DeleteProductMutation = {
  response: DeleteProductMutation$data;
  variables: DeleteProductMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ProductDeletePayload",
    "kind": "LinkedField",
    "name": "DeleteProductMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
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
    "name": "DeleteProductMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteProductMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2804f2bd8d44030b20700a927f60301a",
    "id": null,
    "metadata": {},
    "name": "DeleteProductMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteProductMutation(\n  $input: ProductDeleteInput!\n) {\n  DeleteProductMutation(input: $input) {\n    message\n    error\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "f231f495646ec758129589f3d2889faf";

export default node;
