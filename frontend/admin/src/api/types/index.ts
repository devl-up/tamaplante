/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Host.WebApi
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { customInstance } from "../mutator/custom-instance";
import type { ErrorType, BodyType } from "../mutator/custom-instance";
export type GetApiV1ProductsParams = {
  pageIndex: number;
  pageSize: number;
};

export interface ProblemDetails {
  /** @nullable */
  detail?: string | null;
  /** @nullable */
  instance?: string | null;
  /** @nullable */
  status?: number | null;
  /** @nullable */
  title?: string | null;
  /** @nullable */
  type?: string | null;
  [key: string]: unknown;
}

export interface CatalogProductsQueriesGetProductsDto {
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface CatalogProductsQueriesGetProductsResult {
  products: CatalogProductsQueriesGetProductsDto[];
  total: number;
}

export interface CatalogProductsAddProductCommand {
  description: string;
  id: string;
  name: string;
  price: number;
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const postApiV1Products = (
  catalogProductsAddProductCommand: BodyType<CatalogProductsAddProductCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/products`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: catalogProductsAddProductCommand,
    },
    options,
  );
};

export const getPostApiV1ProductsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsAddProductCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsAddProductCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1Products>>,
    { data: BodyType<CatalogProductsAddProductCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1Products(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1ProductsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1Products>>
>;
export type PostApiV1ProductsMutationBody =
  BodyType<CatalogProductsAddProductCommand>;
export type PostApiV1ProductsMutationError = ErrorType<ProblemDetails>;

export const usePostApiV1Products = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsAddProductCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsAddProductCommand> },
  TContext
> => {
  const mutationOptions = getPostApiV1ProductsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getApiV1Products = (
  params: GetApiV1ProductsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<CatalogProductsQueriesGetProductsResult>(
    { url: `/api/v1/products`, method: "GET", params, signal },
    options,
  );
};

export const getGetApiV1ProductsQueryKey = (params: GetApiV1ProductsParams) => {
  return [`/api/v1/products`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1ProductsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1Products>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1ProductsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Products>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiV1ProductsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiV1Products>>
  > = ({ signal }) => getApiV1Products(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1Products>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetApiV1ProductsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1Products>>
>;
export type GetApiV1ProductsQueryError = ErrorType<ProblemDetails>;

export function useGetApiV1Products<
  TData = Awaited<ReturnType<typeof getApiV1Products>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1ProductsParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Products>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Products>>,
          TError,
          TData
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetApiV1Products<
  TData = Awaited<ReturnType<typeof getApiV1Products>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1ProductsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Products>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Products>>,
          TError,
          TData
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetApiV1Products<
  TData = Awaited<ReturnType<typeof getApiV1Products>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1ProductsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Products>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useGetApiV1Products<
  TData = Awaited<ReturnType<typeof getApiV1Products>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1ProductsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiV1Products>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetApiV1ProductsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
