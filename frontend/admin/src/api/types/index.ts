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
export type GetApiV1TagsParams = {
  pageIndex: number;
  pageSize: number;
};

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

export interface CatalogTagsQueriesGetTagsDto {
  id: string;
  name: string;
}

export interface CatalogTagsQueriesGetTagsResult {
  tags: CatalogTagsQueriesGetTagsDto[];
  total: number;
}

export interface CatalogTagsEditTagCommand {
  id: string;
  name: string;
}

export interface CatalogTagsDeleteTagsCommand {
  tagIds: string[];
}

export interface CatalogTagsAddTagCommand {
  id: string;
  name: string;
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

export interface CatalogProductsEditProductCommand {
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface CatalogProductsDeleteProductsCommand {
  productIds: string[];
}

export interface CatalogProductsAddProductCommand {
  description: string;
  id: string;
  name: string;
  price: number;
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

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

export const putApiV1Products = (
  catalogProductsEditProductCommand: BodyType<CatalogProductsEditProductCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/products`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: catalogProductsEditProductCommand,
    },
    options,
  );
};

export const getPutApiV1ProductsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsEditProductCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsEditProductCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putApiV1Products>>,
    { data: BodyType<CatalogProductsEditProductCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return putApiV1Products(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutApiV1ProductsMutationResult = NonNullable<
  Awaited<ReturnType<typeof putApiV1Products>>
>;
export type PutApiV1ProductsMutationBody =
  BodyType<CatalogProductsEditProductCommand>;
export type PutApiV1ProductsMutationError = ErrorType<ProblemDetails>;

export const usePutApiV1Products = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsEditProductCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof putApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsEditProductCommand> },
  TContext
> => {
  const mutationOptions = getPutApiV1ProductsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const deleteApiV1Products = (
  catalogProductsDeleteProductsCommand: BodyType<CatalogProductsDeleteProductsCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/products`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: catalogProductsDeleteProductsCommand,
    },
    options,
  );
};

export const getDeleteApiV1ProductsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsDeleteProductsCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsDeleteProductsCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1Products>>,
    { data: BodyType<CatalogProductsDeleteProductsCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return deleteApiV1Products(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1ProductsMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1Products>>
>;
export type DeleteApiV1ProductsMutationBody =
  BodyType<CatalogProductsDeleteProductsCommand>;
export type DeleteApiV1ProductsMutationError = ErrorType<ProblemDetails>;

export const useDeleteApiV1Products = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1Products>>,
    TError,
    { data: BodyType<CatalogProductsDeleteProductsCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1Products>>,
  TError,
  { data: BodyType<CatalogProductsDeleteProductsCommand> },
  TContext
> => {
  const mutationOptions = getDeleteApiV1ProductsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getApiV1Tags = (
  params: GetApiV1TagsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<CatalogTagsQueriesGetTagsResult>(
    { url: `/api/v1/tags`, method: "GET", params, signal },
    options,
  );
};

export const getGetApiV1TagsQueryKey = (params: GetApiV1TagsParams) => {
  return [`/api/v1/tags`, ...(params ? [params] : [])] as const;
};

export const getGetApiV1TagsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiV1Tags>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1TagsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiV1Tags>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiV1TagsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV1Tags>>> = ({
    signal,
  }) => getApiV1Tags(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiV1Tags>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetApiV1TagsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiV1Tags>>
>;
export type GetApiV1TagsQueryError = ErrorType<ProblemDetails>;

export function useGetApiV1Tags<
  TData = Awaited<ReturnType<typeof getApiV1Tags>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1TagsParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiV1Tags>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Tags>>,
          TError,
          TData
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetApiV1Tags<
  TData = Awaited<ReturnType<typeof getApiV1Tags>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1TagsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiV1Tags>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV1Tags>>,
          TError,
          TData
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useGetApiV1Tags<
  TData = Awaited<ReturnType<typeof getApiV1Tags>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1TagsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiV1Tags>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useGetApiV1Tags<
  TData = Awaited<ReturnType<typeof getApiV1Tags>>,
  TError = ErrorType<ProblemDetails>,
>(
  params: GetApiV1TagsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiV1Tags>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetApiV1TagsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const postApiV1Tags = (
  catalogTagsAddTagCommand: BodyType<CatalogTagsAddTagCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/tags`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: catalogTagsAddTagCommand,
    },
    options,
  );
};

export const getPostApiV1TagsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsAddTagCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsAddTagCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiV1Tags>>,
    { data: BodyType<CatalogTagsAddTagCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiV1Tags(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiV1TagsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiV1Tags>>
>;
export type PostApiV1TagsMutationBody = BodyType<CatalogTagsAddTagCommand>;
export type PostApiV1TagsMutationError = ErrorType<ProblemDetails>;

export const usePostApiV1Tags = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsAddTagCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsAddTagCommand> },
  TContext
> => {
  const mutationOptions = getPostApiV1TagsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const putApiV1Tags = (
  catalogTagsEditTagCommand: BodyType<CatalogTagsEditTagCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/tags`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: catalogTagsEditTagCommand,
    },
    options,
  );
};

export const getPutApiV1TagsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsEditTagCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsEditTagCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putApiV1Tags>>,
    { data: BodyType<CatalogTagsEditTagCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return putApiV1Tags(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutApiV1TagsMutationResult = NonNullable<
  Awaited<ReturnType<typeof putApiV1Tags>>
>;
export type PutApiV1TagsMutationBody = BodyType<CatalogTagsEditTagCommand>;
export type PutApiV1TagsMutationError = ErrorType<ProblemDetails>;

export const usePutApiV1Tags = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsEditTagCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof putApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsEditTagCommand> },
  TContext
> => {
  const mutationOptions = getPutApiV1TagsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const deleteApiV1Tags = (
  catalogTagsDeleteTagsCommand: BodyType<CatalogTagsDeleteTagsCommand>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    {
      url: `/api/v1/tags`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: catalogTagsDeleteTagsCommand,
    },
    options,
  );
};

export const getDeleteApiV1TagsMutationOptions = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsDeleteTagsCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsDeleteTagsCommand> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiV1Tags>>,
    { data: BodyType<CatalogTagsDeleteTagsCommand> }
  > = (props) => {
    const { data } = props ?? {};

    return deleteApiV1Tags(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiV1TagsMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiV1Tags>>
>;
export type DeleteApiV1TagsMutationBody =
  BodyType<CatalogTagsDeleteTagsCommand>;
export type DeleteApiV1TagsMutationError = ErrorType<ProblemDetails>;

export const useDeleteApiV1Tags = <
  TError = ErrorType<ProblemDetails>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiV1Tags>>,
    TError,
    { data: BodyType<CatalogTagsDeleteTagsCommand> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiV1Tags>>,
  TError,
  { data: BodyType<CatalogTagsDeleteTagsCommand> },
  TContext
> => {
  const mutationOptions = getDeleteApiV1TagsMutationOptions(options);

  return useMutation(mutationOptions);
};
