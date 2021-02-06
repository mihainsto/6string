// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type Auth = {
  __typename?: 'Auth'
  /** JWT access token */
  accessToken: Scalars['String']
  /** JWT refresh token */
  refreshToken: Scalars['String']
  user: User
}

export type ChangePasswordInput = {
  newPassword: Scalars['String']
  oldPassword: Scalars['String']
}

export type CreateSongInput = {
  artist: Scalars['String']
  difficulty: Difficulty
  style?: Maybe<GuitarStyle>
  title: Scalars['String']
  tuning: Scalars['String']
}

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
}

export enum GuitarOrientation {
  LeftHanded = 'LEFT_HANDED',
  RightHanded = 'RIGHT_HANDED',
}

export enum GuitarStyle {
  Fingerpick = 'FINGERPICK',
  Strum = 'STRUM',
}

export enum GuitarType {
  Acoustic = 'ACOUSTIC',
  Classical = 'CLASSICAL',
  Electrical = 'ELECTRICAL',
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword: User
  createSong: Song
  login: Auth
  refreshToken: Token
  signup: Auth
  updateUser: User
}

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
}

export type MutationCreateSongArgs = {
  input: CreateSongInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRefreshTokenArgs = {
  token: Scalars['String']
}

export type MutationSignupArgs = {
  data: SignupInput
}

export type MutationUpdateUserArgs = {
  data: UpdateUserInput
}

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type PlaygroundSettings = {
  __typename?: 'PlaygroundSettings'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  guitarOrientation: GuitarOrientation
  guitarStyle: GuitarStyle
  guitarType: GuitarType
  id: Scalars['ID']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
}

export type Query = {
  __typename?: 'Query'
  hello: Scalars['String']
  helloWorld: Scalars['String']
  me: User
  song: Song
  songs: SongConnection
}

export type QueryHelloArgs = {
  name: Scalars['String']
}

export type QuerySongArgs = {
  id: Scalars['String']
}

export type QuerySongsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  filter?: Maybe<SongFilter>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SongOrder>
  query?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Int']>
}

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SignupInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type Song = {
  __typename?: 'Song'
  artist: Scalars['String']
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  difficulty: Difficulty
  id: Scalars['ID']
  postedBy: User
  style?: Maybe<GuitarStyle>
  tab: Tab
  title: Scalars['String']
  tuning?: Maybe<Scalars['String']>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
}

export type SongConnection = {
  __typename?: 'SongConnection'
  edges?: Maybe<Array<SongEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type SongEdge = {
  __typename?: 'SongEdge'
  cursor: Scalars['String']
  node: Song
}

export type SongFilter = {
  difficulty?: Maybe<Difficulty>
  style?: Maybe<GuitarStyle>
  tuning?: Maybe<Scalars['String']>
}

export type SongOrder = {
  direction: OrderDirection
  field: SongOrderField
}

/** Properties by which song connections can be ordered. */
export enum SongOrderField {
  Artist = 'artist',
  CreatedAt = 'createdAt',
  Difficulty = 'difficulty',
  Id = 'id',
  PostedBy = 'postedBy',
  Style = 'style',
  Title = 'title',
  Tuning = 'tuning',
}

export type Tab = {
  __typename?: 'Tab'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  id: Scalars['ID']
  tempo: Scalars['Int']
  tempoName: Scalars['String']
  tracks: Array<Track>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
}

export type Token = {
  __typename?: 'Token'
  /** JWT access token */
  accessToken: Scalars['String']
  /** JWT refresh token */
  refreshToken: Scalars['String']
}

export type Track = {
  __typename?: 'Track'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  id: Scalars['ID']
  measures: Scalars['JSON']
  offset: Scalars['Int']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
}

export type UpdatePlaygroundSettings = {
  guitarOrientation?: Maybe<GuitarOrientation>
  guitarStyle?: Maybe<GuitarStyle>
  guitarType?: Maybe<GuitarType>
}

export type UpdateUserInput = {
  avatarUrl?: Maybe<Scalars['String']>
  playgroundSettings?: Maybe<UpdatePlaygroundSettings>
  username?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']>
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  email: Scalars['String']
  id: Scalars['ID']
  playgroundSettings: PlaygroundSettings
  role: Role
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
  username: Scalars['String']
}

export type SongsQueryVariables = Exact<{
  first: Scalars['Int']
  after?: Maybe<Scalars['String']>
  query?: Maybe<Scalars['String']>
  filter?: Maybe<SongFilter>
  orderBy?: Maybe<SongOrder>
}>

export type SongsQuery = { __typename?: 'Query' } & {
  songs: { __typename?: 'SongConnection' } & Pick<
    SongConnection,
    'totalCount'
  > & {
      edges?: Maybe<
        Array<
          { __typename?: 'SongEdge' } & {
            node: { __typename?: 'Song' } & Pick<
              Song,
              | 'id'
              | 'title'
              | 'tuning'
              | 'style'
              | 'updatedAt'
              | 'createdAt'
              | 'difficulty'
              | 'artist'
            >
          }
        >
      >
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        'endCursor' | 'hasNextPage'
      >
    }
}

export type SongQueryVariables = Exact<{
  id: Scalars['String']
}>

export type SongQuery = { __typename?: 'Query' } & {
  song: { __typename?: 'Song' } & Pick<
    Song,
    'id' | 'title' | 'tuning' | 'style' | 'updatedAt' | 'difficulty' | 'artist'
  > & {
      tab: { __typename?: 'Tab' } & Pick<Tab, 'tempo' | 'tempoName'> & {
          tracks: Array<
            { __typename?: 'Track' } & Pick<Track, 'measures' | 'offset'>
          >
        }
    }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    User,
    'username' | 'email' | 'avatarUrl'
  > & {
      playgroundSettings: { __typename?: 'PlaygroundSettings' } & Pick<
        PlaygroundSettings,
        'guitarOrientation' | 'guitarStyle' | 'guitarType'
      >
    }
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'Auth' } & Pick<Auth, 'refreshToken'>
}

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type RegisterMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'Auth' } & Pick<Auth, 'refreshToken'>
}

export type UpdateUserMutationVariables = Exact<{
  playgroundSettings?: Maybe<UpdatePlaygroundSettings>
  avatarUrl?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<User, 'id'>
}

export const SongsDocument = gql`
  query Songs(
    $first: Int!
    $after: String
    $query: String
    $filter: SongFilter
    $orderBy: SongOrder
  ) {
    songs(
      first: $first
      after: $after
      query: $query
      filter: $filter
      orderBy: $orderBy
    ) {
      edges {
        node {
          id
          title
          tuning
          style
          updatedAt
          createdAt
          difficulty
          artist
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`

/**
 * __useSongsQuery__
 *
 * To run a query within a React component, call `useSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      filter: // value for 'filter'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSongsQuery(
  baseOptions: Apollo.QueryHookOptions<SongsQuery, SongsQueryVariables>,
) {
  return Apollo.useQuery<SongsQuery, SongsQueryVariables>(
    SongsDocument,
    baseOptions,
  )
}
export function useSongsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SongsQuery, SongsQueryVariables>,
) {
  return Apollo.useLazyQuery<SongsQuery, SongsQueryVariables>(
    SongsDocument,
    baseOptions,
  )
}
export type SongsQueryHookResult = ReturnType<typeof useSongsQuery>
export type SongsLazyQueryHookResult = ReturnType<typeof useSongsLazyQuery>
export type SongsQueryResult = Apollo.QueryResult<
  SongsQuery,
  SongsQueryVariables
>
export const SongDocument = gql`
  query Song($id: String!) {
    song(id: $id) {
      id
      title
      tuning
      style
      updatedAt
      difficulty
      artist
      tab {
        tracks {
          measures
          offset
        }
        tempo
        tempoName
      }
    }
  }
`

/**
 * __useSongQuery__
 *
 * To run a query within a React component, call `useSongQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSongQuery(
  baseOptions: Apollo.QueryHookOptions<SongQuery, SongQueryVariables>,
) {
  return Apollo.useQuery<SongQuery, SongQueryVariables>(
    SongDocument,
    baseOptions,
  )
}
export function useSongLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SongQuery, SongQueryVariables>,
) {
  return Apollo.useLazyQuery<SongQuery, SongQueryVariables>(
    SongDocument,
    baseOptions,
  )
}
export type SongQueryHookResult = ReturnType<typeof useSongQuery>
export type SongLazyQueryHookResult = ReturnType<typeof useSongLazyQuery>
export type SongQueryResult = Apollo.QueryResult<SongQuery, SongQueryVariables>
export const MeDocument = gql`
  query me {
    me {
      username
      email
      avatarUrl
      playgroundSettings {
        guitarOrientation
        guitarStyle
        guitarType
      }
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      refreshToken
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    signup(data: { username: $username, email: $email, password: $password }) {
      refreshToken
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser(
    $playgroundSettings: UpdatePlaygroundSettings
    $avatarUrl: String
    $username: String
  ) {
    updateUser(
      data: {
        playgroundSettings: $playgroundSettings
        avatarUrl: $avatarUrl
        username: $username
      }
    ) {
      id
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      playgroundSettings: // value for 'playgroundSettings'
 *      avatarUrl: // value for 'avatarUrl'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    baseOptions,
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
