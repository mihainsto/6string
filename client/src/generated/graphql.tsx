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

export type ApproveSongInput = {
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

export type ChangeUserRoleInput = {
  role: Role
  userId: Scalars['String']
}

export type CreateSongInput = {
  artist: Scalars['String']
  difficulty: Difficulty
  style?: Maybe<GuitarStyle>
  tabUrl: Scalars['String']
  title: Scalars['String']
  tuning: Scalars['String']
}

export type DeleteSongInReviewInput = {
  songId: Scalars['ID']
}

export type DeleteUserInput = {
  userId: Scalars['String']
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
  approveSong: Song
  changePassword: User
  changeUserRole: User
  createSong: Song
  deleteSongInReview: Song
  deleteUser: User
  login: Auth
  refreshToken: Token
  removeSongFromFavorite: Song
  signup: Auth
  submitSongToReview: Song
  toggleNotificationSettings: User
  updatePlaygroundSettings: User
  updateUser: User
  updateUserAvatar: User
  updateUserEmail: User
  updateUserName: User
}

export type MutationAddSongToFavoriteArgs = {
  input: AddSongToFavoriteInput
}

export type MutationApproveSongArgs = {
  input: ApproveSongInput
}

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput
}

export type MutationChangeUserRoleArgs = {
  input: ChangeUserRoleInput
}

export type MutationCreateSongArgs = {
  input: CreateSongInput
}

export type MutationDeleteSongInReviewArgs = {
  input: DeleteSongInReviewInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
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

export type MutationSubmitSongToReviewArgs = {
  input: SubmitSongToReviewInput
}

export type MutationToggleNotificationSettingsArgs = {
  input: ToggleNotificationSettingsInput
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
  chordWidget: Scalars['Boolean']
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
  songInReview: Song
  songs: SongConnection
  songsInReview: SongConnection
  user: User
  users: UserConnection
}

export type QueryHelloArgs = {
  name: Scalars['String']
}

export type QuerySongArgs = {
  id: Scalars['String']
}

export type QuerySongInReviewArgs = {
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

export type QuerySongsInReviewArgs = {
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

export type QueryUserArgs = {
  id: Scalars['String']
}

export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  orderBy?: Maybe<UserOrder>
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
  archived: Scalars['Boolean']
  artist: Scalars['String']
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  difficulty: Difficulty
  favorite: Scalars['Boolean']
  id: Scalars['ID']
  inReview: Scalars['Boolean']
  postedBy: User
  style?: Maybe<GuitarStyle>
  submittedToReview: Scalars['Boolean']
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

export type SubmitSongToReviewInput = {
  songId: Scalars['ID']
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

export type ToggleNotificationSettingsInput = {
  notificationAdminReview?: Maybe<Scalars['Boolean']>
  notificationEnabled?: Maybe<Scalars['Boolean']>
  notificationRecommended?: Maybe<Scalars['Boolean']>
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
  chordWidget?: Maybe<Scalars['Boolean']>
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
  userSettings: UserSettings
  username: Scalars['String']
}

export type UserConnection = {
  __typename?: 'UserConnection'
  edges?: Maybe<Array<UserEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['String']
  node: User
}

export type UserOrder = {
  direction: OrderDirection
  field: UserOrderField
}

/** Properties by which user connections can be ordered. */
export enum UserOrderField {
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Role = 'role',
  Username = 'username',
}

export type UserSettings = {
  __typename?: 'UserSettings'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date']
  id: Scalars['ID']
  notificationAdminReview: Scalars['Boolean']
  notificationEnabled: Scalars['Boolean']
  notificationRecommended: Scalars['Boolean']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date']
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
              | 'submittedToReview'
              | 'inReview'
              | 'archived'
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

export type SongsInReviewQueryVariables = Exact<{
  first: Scalars['Int']
  after?: Maybe<Scalars['String']>
  query?: Maybe<Scalars['String']>
  filter?: Maybe<SongFilter>
  orderBy?: Maybe<SongOrder>
  favorite?: Maybe<Scalars['Boolean']>
}>

export type SongsInReviewQuery = { __typename?: 'Query' } & {
  songsInReview: { __typename?: 'SongConnection' } & Pick<
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
              | 'submittedToReview'
              | 'inReview'
              | 'archived'
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
    | 'submittedToReview'
    | 'inReview'
    | 'archived'
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
    'username' | 'email' | 'avatarUrl' | 'role'
  > & {
      playgroundSettings: { __typename?: 'PlaygroundSettings' } & Pick<
        PlaygroundSettings,
        | 'id'
        | 'guitarOrientation'
        | 'guitarStyle'
        | 'guitarType'
        | 'chordWidget'
      >
      userSettings: { __typename?: 'UserSettings' } & Pick<
        UserSettings,
        | 'id'
        | 'notificationEnabled'
        | 'notificationRecommended'
        | 'notificationAdminReview'
      >
    }
}

export type UsersQueryVariables = Exact<{
  first: Scalars['Int']
  after?: Maybe<Scalars['String']>
  query?: Maybe<Scalars['String']>
  orderBy?: Maybe<UserOrder>
}>

export type UsersQuery = { __typename?: 'Query' } & {
  users: { __typename?: 'UserConnection' } & Pick<
    UserConnection,
    'totalCount'
  > & {
      edges?: Maybe<
        Array<
          { __typename?: 'UserEdge' } & {
            node: { __typename?: 'User' } & Pick<
              User,
              'id' | 'updatedAt' | 'createdAt' | 'username' | 'email' | 'role'
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

export type ToggleNotificationSettingsMutationVariables = Exact<{
  input: ToggleNotificationSettingsInput
}>

export type ToggleNotificationSettingsMutation = { __typename?: 'Mutation' } & {
  toggleNotificationSettings: { __typename?: 'User' } & Pick<User, 'id'> & {
      userSettings: { __typename?: 'UserSettings' } & Pick<
        UserSettings,
        | 'id'
        | 'notificationAdminReview'
        | 'notificationEnabled'
        | 'notificationRecommended'
      >
    }
}

export type UpdatePlaygroundSettingsMutationVariables = Exact<{
  input: UpdatePlaygroundSettingsInput
}>

export type UpdatePlaygroundSettingsMutation = { __typename?: 'Mutation' } & {
  updatePlaygroundSettings: { __typename?: 'User' } & Pick<User, 'id'> & {
      playgroundSettings: { __typename?: 'PlaygroundSettings' } & Pick<
        PlaygroundSettings,
        | 'id'
        | 'guitarOrientation'
        | 'guitarStyle'
        | 'guitarType'
        | 'chordWidget'
      >
    }
}

export type ChangeUserRoleMutationVariables = Exact<{
  input: ChangeUserRoleInput
}>

export type ChangeUserRoleMutation = { __typename?: 'Mutation' } & {
  changeUserRole: { __typename?: 'User' } & Pick<User, 'id' | 'role'>
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: { __typename?: 'User' } & Pick<User, 'id' | 'role'>
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

export type DeleteSongInReviewMutationVariables = Exact<{
  input: DeleteSongInReviewInput
}>

export type DeleteSongInReviewMutation = { __typename?: 'Mutation' } & {
  deleteSongInReview: { __typename?: 'Song' } & Pick<
    Song,
    'id' | 'submittedToReview' | 'inReview' | 'archived'
  >
}

export type SubmitSongToReviewMutationVariables = Exact<{
  input: SubmitSongToReviewInput
}>

export type SubmitSongToReviewMutation = { __typename?: 'Mutation' } & {
  submitSongToReview: { __typename?: 'Song' } & Pick<
    Song,
    'id' | 'submittedToReview' | 'inReview'
  >
}

export type ApproveSongMutationVariables = Exact<{
  input: ApproveSongInput
}>

export type ApproveSongMutation = { __typename?: 'Mutation' } & {
  approveSong: { __typename?: 'Song' } & Pick<
    Song,
    'id' | 'submittedToReview' | 'inReview'
  >
}

export type CreateSongMutationVariables = Exact<{
  input: CreateSongInput
}>

export type CreateSongMutation = { __typename?: 'Mutation' } & {
  createSong: { __typename?: 'Song' } & Pick<Song, 'id'>
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
          submittedToReview
          inReview
          archived
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
export const SongsInReviewDocument = gql`
  query SongsInReview(
    $first: Int!
    $after: String
    $query: String
    $filter: SongFilter
    $orderBy: SongOrder
    $favorite: Boolean
  ) {
    songsInReview(
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
          submittedToReview
          inReview
          archived
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
 * __useSongsInReviewQuery__
 *
 * To run a query within a React component, call `useSongsInReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsInReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsInReviewQuery({
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
export function useSongsInReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    SongsInReviewQuery,
    SongsInReviewQueryVariables
  >,
) {
  return Apollo.useQuery<SongsInReviewQuery, SongsInReviewQueryVariables>(
    SongsInReviewDocument,
    baseOptions,
  )
}
export function useSongsInReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SongsInReviewQuery,
    SongsInReviewQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SongsInReviewQuery, SongsInReviewQueryVariables>(
    SongsInReviewDocument,
    baseOptions,
  )
}
export type SongsInReviewQueryHookResult = ReturnType<
  typeof useSongsInReviewQuery
>
export type SongsInReviewLazyQueryHookResult = ReturnType<
  typeof useSongsInReviewLazyQuery
>
export type SongsInReviewQueryResult = Apollo.QueryResult<
  SongsInReviewQuery,
  SongsInReviewQueryVariables
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
      submittedToReview
      inReview
      archived
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
      role
      playgroundSettings {
        id
        guitarOrientation
        guitarStyle
        guitarType
        chordWidget
      }
      userSettings {
        id
        notificationEnabled
        notificationRecommended
        notificationAdminReview
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
export const UsersDocument = gql`
  query Users(
    $first: Int!
    $after: String
    $query: String
    $orderBy: UserOrder
  ) {
    users(first: $first, after: $after, query: $query, orderBy: $orderBy) {
      edges {
        node {
          id
          updatedAt
          createdAt
          username
          email
          role
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
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions,
  )
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions,
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
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
  mutation UpdateUserName($input: UpdateUserNameInput!) {
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
  mutation UpdateUserAvatar($input: UpdateUserAvatarInput!) {
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
  mutation UpdateUserEmail($input: UpdateUserEmailInput!) {
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
  mutation ChangePassword($input: ChangePasswordInput!) {
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
export const ToggleNotificationSettingsDocument = gql`
  mutation ToggleNotificationSettings(
    $input: ToggleNotificationSettingsInput!
  ) {
    toggleNotificationSettings(input: $input) {
      id
      userSettings {
        id
        notificationAdminReview
        notificationEnabled
        notificationRecommended
      }
    }
  }
`
export type ToggleNotificationSettingsMutationFn = Apollo.MutationFunction<
  ToggleNotificationSettingsMutation,
  ToggleNotificationSettingsMutationVariables
>

/**
 * __useToggleNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useToggleNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleNotificationSettingsMutation, { data, loading, error }] = useToggleNotificationSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleNotificationSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleNotificationSettingsMutation,
    ToggleNotificationSettingsMutationVariables
  >,
) {
  return Apollo.useMutation<
    ToggleNotificationSettingsMutation,
    ToggleNotificationSettingsMutationVariables
  >(ToggleNotificationSettingsDocument, baseOptions)
}
export type ToggleNotificationSettingsMutationHookResult = ReturnType<
  typeof useToggleNotificationSettingsMutation
>
export type ToggleNotificationSettingsMutationResult = Apollo.MutationResult<ToggleNotificationSettingsMutation>
export type ToggleNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<
  ToggleNotificationSettingsMutation,
  ToggleNotificationSettingsMutationVariables
>
export const UpdatePlaygroundSettingsDocument = gql`
  mutation UpdatePlaygroundSettings($input: UpdatePlaygroundSettingsInput!) {
    updatePlaygroundSettings(input: $input) {
      id
      playgroundSettings {
        id
        guitarOrientation
        guitarStyle
        guitarType
        chordWidget
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
export const ChangeUserRoleDocument = gql`
  mutation ChangeUserRole($input: ChangeUserRoleInput!) {
    changeUserRole(input: $input) {
      id
      role
    }
  }
`
export type ChangeUserRoleMutationFn = Apollo.MutationFunction<
  ChangeUserRoleMutation,
  ChangeUserRoleMutationVariables
>

/**
 * __useChangeUserRoleMutation__
 *
 * To run a mutation, you first call `useChangeUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserRoleMutation, { data, loading, error }] = useChangeUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeUserRoleMutation,
    ChangeUserRoleMutationVariables
  >,
) {
  return Apollo.useMutation<
    ChangeUserRoleMutation,
    ChangeUserRoleMutationVariables
  >(ChangeUserRoleDocument, baseOptions)
}
export type ChangeUserRoleMutationHookResult = ReturnType<
  typeof useChangeUserRoleMutation
>
export type ChangeUserRoleMutationResult = Apollo.MutationResult<ChangeUserRoleMutation>
export type ChangeUserRoleMutationOptions = Apollo.BaseMutationOptions<
  ChangeUserRoleMutation,
  ChangeUserRoleMutationVariables
>
export const DeleteUserDocument = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      role
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    baseOptions,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const AddSongToFavoriteDocument = gql`
  mutation AddSongToFavorite($input: AddSongToFavoriteInput!) {
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
  mutation RemoveSongFromFavorite($input: RemoveSongFromFavoriteInput!) {
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
export const DeleteSongInReviewDocument = gql`
  mutation DeleteSongInReview($input: DeleteSongInReviewInput!) {
    deleteSongInReview(input: $input) {
      id
      submittedToReview
      inReview
      archived
    }
  }
`
export type DeleteSongInReviewMutationFn = Apollo.MutationFunction<
  DeleteSongInReviewMutation,
  DeleteSongInReviewMutationVariables
>

/**
 * __useDeleteSongInReviewMutation__
 *
 * To run a mutation, you first call `useDeleteSongInReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSongInReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSongInReviewMutation, { data, loading, error }] = useDeleteSongInReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSongInReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSongInReviewMutation,
    DeleteSongInReviewMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeleteSongInReviewMutation,
    DeleteSongInReviewMutationVariables
  >(DeleteSongInReviewDocument, baseOptions)
}
export type DeleteSongInReviewMutationHookResult = ReturnType<
  typeof useDeleteSongInReviewMutation
>
export type DeleteSongInReviewMutationResult = Apollo.MutationResult<DeleteSongInReviewMutation>
export type DeleteSongInReviewMutationOptions = Apollo.BaseMutationOptions<
  DeleteSongInReviewMutation,
  DeleteSongInReviewMutationVariables
>
export const SubmitSongToReviewDocument = gql`
  mutation SubmitSongToReview($input: SubmitSongToReviewInput!) {
    submitSongToReview(input: $input) {
      id
      submittedToReview
      inReview
    }
  }
`
export type SubmitSongToReviewMutationFn = Apollo.MutationFunction<
  SubmitSongToReviewMutation,
  SubmitSongToReviewMutationVariables
>

/**
 * __useSubmitSongToReviewMutation__
 *
 * To run a mutation, you first call `useSubmitSongToReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSongToReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSongToReviewMutation, { data, loading, error }] = useSubmitSongToReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitSongToReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitSongToReviewMutation,
    SubmitSongToReviewMutationVariables
  >,
) {
  return Apollo.useMutation<
    SubmitSongToReviewMutation,
    SubmitSongToReviewMutationVariables
  >(SubmitSongToReviewDocument, baseOptions)
}
export type SubmitSongToReviewMutationHookResult = ReturnType<
  typeof useSubmitSongToReviewMutation
>
export type SubmitSongToReviewMutationResult = Apollo.MutationResult<SubmitSongToReviewMutation>
export type SubmitSongToReviewMutationOptions = Apollo.BaseMutationOptions<
  SubmitSongToReviewMutation,
  SubmitSongToReviewMutationVariables
>
export const ApproveSongDocument = gql`
  mutation ApproveSong($input: ApproveSongInput!) {
    approveSong(input: $input) {
      id
      submittedToReview
      inReview
    }
  }
`
export type ApproveSongMutationFn = Apollo.MutationFunction<
  ApproveSongMutation,
  ApproveSongMutationVariables
>

/**
 * __useApproveSongMutation__
 *
 * To run a mutation, you first call `useApproveSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveSongMutation, { data, loading, error }] = useApproveSongMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveSongMutation,
    ApproveSongMutationVariables
  >,
) {
  return Apollo.useMutation<ApproveSongMutation, ApproveSongMutationVariables>(
    ApproveSongDocument,
    baseOptions,
  )
}
export type ApproveSongMutationHookResult = ReturnType<
  typeof useApproveSongMutation
>
export type ApproveSongMutationResult = Apollo.MutationResult<ApproveSongMutation>
export type ApproveSongMutationOptions = Apollo.BaseMutationOptions<
  ApproveSongMutation,
  ApproveSongMutationVariables
>
export const CreateSongDocument = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      id
    }
  }
`
export type CreateSongMutationFn = Apollo.MutationFunction<
  CreateSongMutation,
  CreateSongMutationVariables
>

/**
 * __useCreateSongMutation__
 *
 * To run a mutation, you first call `useCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSongMutation, { data, loading, error }] = useCreateSongMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSongMutation,
    CreateSongMutationVariables
  >,
) {
  return Apollo.useMutation<CreateSongMutation, CreateSongMutationVariables>(
    CreateSongDocument,
    baseOptions,
  )
}
export type CreateSongMutationHookResult = ReturnType<
  typeof useCreateSongMutation
>
export type CreateSongMutationResult = Apollo.MutationResult<CreateSongMutation>
export type CreateSongMutationOptions = Apollo.BaseMutationOptions<
  CreateSongMutation,
  CreateSongMutationVariables
>
