/**
 * @generated SignedSource<<29ee3089930f0aae20d31a0dfbbbb1b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteReviewMutationInput = {
  clientMutationId?: string | null;
  review: string;
};
export type DeleteReviewMutation$variables = {
  input: DeleteReviewMutationInput;
};
export type DeleteReviewMutation$data = {
  readonly DeleteReviewMutation: {
    readonly error: string | null;
    readonly success: string | null;
  } | null;
};
export type DeleteReviewMutation = {
  response: DeleteReviewMutation$data;
  variables: DeleteReviewMutation$variables;
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
    "concreteType": "DeleteReviewMutationPayload",
    "kind": "LinkedField",
    "name": "DeleteReviewMutation",
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
    "name": "DeleteReviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteReviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c4810ac1357066fd56a06e25c7013b45",
    "id": null,
    "metadata": {},
    "name": "DeleteReviewMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteReviewMutation(\n  $input: DeleteReviewMutationInput!\n) {\n  DeleteReviewMutation(input: $input) {\n    error\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "dffe0ef739284ba69efee9795a5d3d86";

export default node;
