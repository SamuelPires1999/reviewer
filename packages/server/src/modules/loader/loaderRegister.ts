export interface DataLoaders {
  UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
  EstablishmentLoader: ReturnType<
    typeof import('../establishment/EstablishmentLoader').getLoader
  >;
  ReviewLoader: ReturnType<typeof import('../review/ReviewLoader').getLoader>;
}

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {} as any;

const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: () => DataLoaders[Name],
) => {
  loaders[key] = getLoader as any;
};

const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {},
  ) as any;

export { registerLoader, getDataloaders };
