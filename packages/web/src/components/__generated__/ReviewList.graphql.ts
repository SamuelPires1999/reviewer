/**
 * @generated SignedSource<<ac4fcd345e7e2f2e7571e8c6d0c27bac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewList$data = {
  readonly reviews: {
    readonly count: number | null;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly _id: string;
        readonly comment: string | null;
        readonly establishment: {
          readonly _id: string;
          readonly name: string | null;
        } | null;
        readonly rating: number | null;
      } | null;
    } | null>;
  };
  readonly " $fragmentType": "ReviewList";
};
export type ReviewList$key = {
  readonly " $data"?: ReviewList$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReviewList">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewList",
  "selections": [
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
        },
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "comment",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "rating",
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    },
                    (v0/*: any*/)
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
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "6ffeea65cb2a7c6bd31d592d23aa3777";

export default node;
