/**
 * @generated SignedSource<<82b85ff9ccaceabca772fbb76d3f2cae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductsGetReviewsFragment$data = {
  readonly reviews: {
    readonly count: number | null;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly comment: string | null;
        readonly rating: number | null;
        readonly user: {
          readonly _id: string;
          readonly name: string | null;
        } | null;
      } | null;
    } | null>;
  };
  readonly " $fragmentType": "ProductsGetReviewsFragment";
};
export type ProductsGetReviewsFragment$key = {
  readonly " $data"?: ProductsGetReviewsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductsGetReviewsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductsGetReviewsFragment",
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
              "concreteType": "Comment",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "user",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "_id",
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
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "0e8d569081cbf28db653cd0ae57e1b32";

export default node;
