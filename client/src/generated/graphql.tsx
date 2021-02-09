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

export type AddSongToFavoriteInput = {
  songId: Scalars['ID']
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
  addSongToFavorite: Song
  changePassword: User
  createSong: Song
  login: Auth
  refreshToken: Token
  removeSongFromFavorite: Song
  signup: Auth
  updatePlaygroundSettings: User
  updateUser: User
  updateUserAvatar: User
  updateUserEmail: User
  updateUserName: User
}

export type MutationAddSongToFavoriteArgs = {
  input: AddSongToFavoriteInput
}

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput
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

export type MutationRemoveSongFromFavoriteArgs = {
  input: RemoveSongFromFavoriteInput
}

export type MutationSignupArgs = {
  data: SignupInput
}

export type MutationUpdatePlaygroundSettingsArgs = {
  input: UpdatePlaygroundSettingsInput
}

export type MutationUpdateUserArgs = {
  data: UpdateUserInput
}

export type MutationUpdateUserAvatarArgs = {
  input: UpdateUserAvatarInput
}

export type MutationUpdateUserEmailArgs = {
  input: UpdateUserEmailInput
}

export type MutationUpdateUserNameArgs = {
  input: UpdateUserNameInput
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
  favorite?: Maybe<Scalars['Boolean']>
  filter?: Maybe<SongFilter>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SongOrder>
  query?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Int']>
}

export type RemoveSongFromFavoriteInput = {
  songId: Scalars['ID']
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
  favorite: Scalars['Boolean']
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

export type UpdatePlaygroundSettingsInput = {
  playgroundSettings: UpdatePlaygroundSettings
}

export type UpdateUserAvatarInput = {
  avatarUrl: Scalars['String']
}

export type UpdateUserEmailInput = {
  email: Scalars['String']
}

export type UpdateUserInput = {
  avatarUrl?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  playgroundSettings?: Maybe<UpdatePlaygroundSettings>
  username?: Maybe<Scalars['String']>
}

export type UpdateUserNameInput = {
  username: Scalars['String']
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
  favorite?: Maybe<Scalars['Boolean']>
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
              | 'favorite'
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
    | 'id'
    | 'title'
    | 'tuning'
    | 'style'
    | 'updatedAt'
    | 'difficulty'
    | 'artist'
    | 'favorite'
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

export type UpdateUserNameMutationVariables = Exact<{
  input: UpdateUserNameInput
}>

export type UpdateUserNameMutation = { __typename?: 'Mutation' } & {
  updateUserName: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
}

export type UpdateUserAvatarMutationVariables = Exact<{
  input: UpdateUserAvatarInput
}>

export type UpdateUserAvatarMutation = { __typename?: 'Mutation' } & {
  updateUserAvatar: { __typename?: 'User' } & Pick<User, 'id' | 'avatarUrl'>
}

export type UpdateUserEmailMutationVariables = Exact<{
  input: UpdateUserEmailInput
}>

export type UpdateUserEmailMutation = { __typename?: 'Mutation' } & {
  updateUserEmail: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
}

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changePassword: { __typename?: 'User' } & Pick<User, 'id'>
}

export type UpdatePlaygroundSettingsMutationVariables = Exact<{
  input: UpdatePlaygroundSettingsInput
}>

export type UpdatePlaygroundSettingsMutation = { __typename?: 'Mutation' } & {
  updatePlaygroundSettings: { __typename?: 'User' } & Pick<User, 'id'> & {
      playgroundSettings: { __typename?: 'PlaygroundSettings' } & Pick<
        PlaygroundSettings,
        'id' | 'guitarOrientation' | 'guitarStyle' | 'guitarType'
      >
    }
}

export type AddSongToFavoriteMutationVariables = Exact<{
  input: AddSongToFavoriteInput
}>

export type AddSongToFavoriteMutation = { __typename?: 'Mutation' } & {
  addSongToFavorite: { __typename?: 'Song' } & Pick<Song, 'id' | 'favorite'>
}

export type RemoveSongFromFavoriteMutationVariables = Exact<{
  input: RemoveSongFromFavoriteInput
}>

export type RemoveSongFromFavoriteMutation = { __typename?: 'Mutation' } & {
  removeSongFromFavorite: { __typename?: 'Song' } & Pick<
    Song,
    'id' | 'favorite'
  >
}

export const SongsDocument = gql`
  query Songs(
    $first: Int!
    $after: String
    $query: String
    $filter: SongFilter
    $orderBy: SongOrder
    $favorite: Boolean
  ) {
    songs(
      first: $first
      after: $after
      query: $query
      filter: $filter
      orderBy: $orderBy
      favorite: $favorite
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
          favorite
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
 *      favorite: // value for 'favorite'
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
      favorite
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
export const UpdateUserNameDocument = gql`
  mutation updateUserName($input: UpdateUserNameInput!) {
    updateUserName(input: $input) {
      id
      username
    }
  }
`
export type UpdateUserNameMutationFn = Apollo.MutationFunction<
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables
>

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserNameMutation,
    UpdateUserNameMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateUserNameMutation,
    UpdateUserNameMutationVariables
  >(UpdateUserNameDocument, baseOptions)
}
export type UpdateUserNameMutationHookResult = ReturnType<
  typeof useUpdateUserNameMutation
>
export type UpdateUserNameMutationResult = Apollo.MutationResult<UpdateUserNameMutation>
export type UpdateUserNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables
>
export const UpdateUserAvatarDocument = gql`
  mutation updateUserAvatar($input: UpdateUserAvatarInput!) {
    updateUserAvatar(input: $input) {
      id
      avatarUrl
    }
  }
`
export type UpdateUserAvatarMutationFn = Apollo.MutationFunction<
  UpdateUserAvatarMutation,
  UpdateUserAvatarMutationVariables
>

/**
 * __useUpdateUserAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateUserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAvatarMutation, { data, loading, error }] = useUpdateUserAvatarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserAvatarMutation,
    UpdateUserAvatarMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateUserAvatarMutation,
    UpdateUserAvatarMutationVariables
  >(UpdateUserAvatarDocument, baseOptions)
}
export type UpdateUserAvatarMutationHookResult = ReturnType<
  typeof useUpdateUserAvatarMutation
>
export type UpdateUserAvatarMutationResult = Apollo.MutationResult<UpdateUserAvatarMutation>
export type UpdateUserAvatarMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserAvatarMutation,
  UpdateUserAvatarMutationVariables
>
export const UpdateUserEmailDocument = gql`
  mutation updateUserEmail($input: UpdateUserEmailInput!) {
    updateUserEmail(input: $input) {
      id
      email
    }
  }
`
export type UpdateUserEmailMutationFn = Apollo.MutationFunction<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>

/**
 * __useUpdateUserEmailMutation__
 *
 * To run a mutation, you first call `useUpdateUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserEmailMutation, { data, loading, error }] = useUpdateUserEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >(UpdateUserEmailDocument, baseOptions)
}
export type UpdateUserEmailMutationHookResult = ReturnType<
  typeof useUpdateUserEmailMutation
>
export type UpdateUserEmailMutationResult = Apollo.MutationResult<UpdateUserEmailMutation>
export type UpdateUserEmailMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>
export const ChangePasswordDocument = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
    }
  }
`
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions)
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export const UpdatePlaygroundSettingsDocument = gql`
  mutation updatePlaygroundSettings($input: UpdatePlaygroundSettingsInput!) {
    updatePlaygroundSettings(input: $input) {
      id
      playgroundSettings {
        id
        guitarOrientation
        guitarStyle
        guitarType
      }
    }
  }
`
export type UpdatePlaygroundSettingsMutationFn = Apollo.MutationFunction<
  UpdatePlaygroundSettingsMutation,
  UpdatePlaygroundSettingsMutationVariables
>

/**
 * __useUpdatePlaygroundSettingsMutation__
 *
 * To run a mutation, you first call `useUpdatePlaygroundSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaygroundSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaygroundSettingsMutation, { data, loading, error }] = useUpdatePlaygroundSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlaygroundSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePlaygroundSettingsMutation,
    UpdatePlaygroundSettingsMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdatePlaygroundSettingsMutation,
    UpdatePlaygroundSettingsMutationVariables
  >(UpdatePlaygroundSettingsDocument, baseOptions)
}
export type UpdatePlaygroundSettingsMutationHookResult = ReturnType<
  typeof useUpdatePlaygroundSettingsMutation
>
export type UpdatePlaygroundSettingsMutationResult = Apollo.MutationResult<UpdatePlaygroundSettingsMutation>
export type UpdatePlaygroundSettingsMutationOptions = Apollo.BaseMutationOptions<
  UpdatePlaygroundSettingsMutation,
  UpdatePlaygroundSettingsMutationVariables
>
export const AddSongToFavoriteDocument = gql`
  mutation addSongToFavorite($input: AddSongToFavoriteInput!) {
    addSongToFavorite(input: $input) {
      id
      favorite
    }
  }
`
export type AddSongToFavoriteMutationFn = Apollo.MutationFunction<
  AddSongToFavoriteMutation,
  AddSongToFavoriteMutationVariables
>

/**
 * __useAddSongToFavoriteMutation__
 *
 * To run a mutation, you first call `useAddSongToFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSongToFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSongToFavoriteMutation, { data, loading, error }] = useAddSongToFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSongToFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSongToFavoriteMutation,
    AddSongToFavoriteMutationVariables
  >,
) {
  return Apollo.useMutation<
    AddSongToFavoriteMutation,
    AddSongToFavoriteMutationVariables
  >(AddSongToFavoriteDocument, baseOptions)
}
export type AddSongToFavoriteMutationHookResult = ReturnType<
  typeof useAddSongToFavoriteMutation
>
export type AddSongToFavoriteMutationResult = Apollo.MutationResult<AddSongToFavoriteMutation>
export type AddSongToFavoriteMutationOptions = Apollo.BaseMutationOptions<
  AddSongToFavoriteMutation,
  AddSongToFavoriteMutationVariables
>
export const RemoveSongFromFavoriteDocument = gql`
  mutation removeSongFromFavorite($input: RemoveSongFromFavoriteInput!) {
    removeSongFromFavorite(input: $input) {
      id
      favorite
    }
  }
`
export type RemoveSongFromFavoriteMutationFn = Apollo.MutationFunction<
  RemoveSongFromFavoriteMutation,
  RemoveSongFromFavoriteMutationVariables
>

/**
 * __useRemoveSongFromFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveSongFromFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSongFromFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSongFromFavoriteMutation, { data, loading, error }] = useRemoveSongFromFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveSongFromFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveSongFromFavoriteMutation,
    RemoveSongFromFavoriteMutationVariables
  >,
) {
  return Apollo.useMutation<
    RemoveSongFromFavoriteMutation,
    RemoveSongFromFavoriteMutationVariables
  >(RemoveSongFromFavoriteDocument, baseOptions)
}
export type RemoveSongFromFavoriteMutationHookResult = ReturnType<
  typeof useRemoveSongFromFavoriteMutation
>
export type RemoveSongFromFavoriteMutationResult = Apollo.MutationResult<RemoveSongFromFavoriteMutation>
export type RemoveSongFromFavoriteMutationOptions = Apollo.BaseMutationOptions<
  RemoveSongFromFavoriteMutation,
  RemoveSongFromFavoriteMutationVariables
>
