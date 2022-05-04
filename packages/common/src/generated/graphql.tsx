import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "providers" */
  delete_providers?: Maybe<Providers_Mutation_Response>;
  /** delete single row from the table: "providers" */
  delete_providers_by_pk?: Maybe<Providers>;
  /** delete data from the table: "pushbullets" */
  delete_pushbullets?: Maybe<Pushbullets_Mutation_Response>;
  /** delete single row from the table: "pushbullets" */
  delete_pushbullets_by_pk?: Maybe<Pushbullets>;
  /** delete data from the table: "userProviders" */
  delete_userProviders?: Maybe<UserProviders_Mutation_Response>;
  /** delete single row from the table: "userProviders" */
  delete_userProviders_by_pk?: Maybe<UserProviders>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "providers" */
  insert_providers?: Maybe<Providers_Mutation_Response>;
  /** insert a single row into the table: "providers" */
  insert_providers_one?: Maybe<Providers>;
  /** insert data into the table: "pushbullets" */
  insert_pushbullets?: Maybe<Pushbullets_Mutation_Response>;
  /** insert a single row into the table: "pushbullets" */
  insert_pushbullets_one?: Maybe<Pushbullets>;
  /** insert data into the table: "userProviders" */
  insert_userProviders?: Maybe<UserProviders_Mutation_Response>;
  /** insert a single row into the table: "userProviders" */
  insert_userProviders_one?: Maybe<UserProviders>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "providers" */
  update_providers?: Maybe<Providers_Mutation_Response>;
  /** update single row of the table: "providers" */
  update_providers_by_pk?: Maybe<Providers>;
  /** update data of the table: "pushbullets" */
  update_pushbullets?: Maybe<Pushbullets_Mutation_Response>;
  /** update single row of the table: "pushbullets" */
  update_pushbullets_by_pk?: Maybe<Pushbullets>;
  /** update data of the table: "userProviders" */
  update_userProviders?: Maybe<UserProviders_Mutation_Response>;
  /** update single row of the table: "userProviders" */
  update_userProviders_by_pk?: Maybe<UserProviders>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_ProvidersArgs = {
  where: Providers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Providers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PushbulletsArgs = {
  where: Pushbullets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pushbullets_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UserProvidersArgs = {
  where: UserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UserProviders_By_PkArgs = {
  providerId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ProvidersArgs = {
  objects: Array<Providers_Insert_Input>;
  on_conflict?: InputMaybe<Providers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Providers_OneArgs = {
  object: Providers_Insert_Input;
  on_conflict?: InputMaybe<Providers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PushbulletsArgs = {
  objects: Array<Pushbullets_Insert_Input>;
  on_conflict?: InputMaybe<Pushbullets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pushbullets_OneArgs = {
  object: Pushbullets_Insert_Input;
  on_conflict?: InputMaybe<Pushbullets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserProvidersArgs = {
  objects: Array<UserProviders_Insert_Input>;
  on_conflict?: InputMaybe<UserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserProviders_OneArgs = {
  object: UserProviders_Insert_Input;
  on_conflict?: InputMaybe<UserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ProvidersArgs = {
  _set?: InputMaybe<Providers_Set_Input>;
  where: Providers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Providers_By_PkArgs = {
  _set?: InputMaybe<Providers_Set_Input>;
  pk_columns: Providers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PushbulletsArgs = {
  _append?: InputMaybe<Pushbullets_Append_Input>;
  _delete_at_path?: InputMaybe<Pushbullets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Pushbullets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Pushbullets_Delete_Key_Input>;
  _prepend?: InputMaybe<Pushbullets_Prepend_Input>;
  _set?: InputMaybe<Pushbullets_Set_Input>;
  where: Pushbullets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pushbullets_By_PkArgs = {
  _append?: InputMaybe<Pushbullets_Append_Input>;
  _delete_at_path?: InputMaybe<Pushbullets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Pushbullets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Pushbullets_Delete_Key_Input>;
  _prepend?: InputMaybe<Pushbullets_Prepend_Input>;
  _set?: InputMaybe<Pushbullets_Set_Input>;
  pk_columns: Pushbullets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserProvidersArgs = {
  _set?: InputMaybe<UserProviders_Set_Input>;
  where: UserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserProviders_By_PkArgs = {
  _set?: InputMaybe<UserProviders_Set_Input>;
  pk_columns: UserProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "providers" */
export type Providers = {
  __typename?: 'providers';
  id: Scalars['uuid'];
  name: Scalars['String'];
};

/** aggregated selection of "providers" */
export type Providers_Aggregate = {
  __typename?: 'providers_aggregate';
  aggregate?: Maybe<Providers_Aggregate_Fields>;
  nodes: Array<Providers>;
};

/** aggregate fields of "providers" */
export type Providers_Aggregate_Fields = {
  __typename?: 'providers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Providers_Max_Fields>;
  min?: Maybe<Providers_Min_Fields>;
};


/** aggregate fields of "providers" */
export type Providers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Providers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "providers". All fields are combined with a logical 'AND'. */
export type Providers_Bool_Exp = {
  _and?: InputMaybe<Array<Providers_Bool_Exp>>;
  _not?: InputMaybe<Providers_Bool_Exp>;
  _or?: InputMaybe<Array<Providers_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "providers" */
export enum Providers_Constraint {
  /** unique or primary key constraint */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "providers" */
export type Providers_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Providers_Max_Fields = {
  __typename?: 'providers_max_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Providers_Min_Fields = {
  __typename?: 'providers_min_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "providers" */
export type Providers_Mutation_Response = {
  __typename?: 'providers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Providers>;
};

/** input type for inserting object relation for remote table "providers" */
export type Providers_Obj_Rel_Insert_Input = {
  data: Providers_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Providers_On_Conflict>;
};

/** on conflict condition type for table "providers" */
export type Providers_On_Conflict = {
  constraint: Providers_Constraint;
  update_columns?: Array<Providers_Update_Column>;
  where?: InputMaybe<Providers_Bool_Exp>;
};

/** Ordering options when selecting data from "providers". */
export type Providers_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: providers */
export type Providers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "providers" */
export enum Providers_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "providers" */
export type Providers_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "providers" */
export enum Providers_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "pushbullets" */
export type Pushbullets = {
  __typename?: 'pushbullets';
  created_at: Scalars['timestamptz'];
  id: Scalars['String'];
  lazyData?: Maybe<Scalars['jsonb']>;
  updated_at: Scalars['timestamptz'];
  userId: Scalars['String'];
};


/** columns and relationships of "pushbullets" */
export type PushbulletsLazyDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "pushbullets" */
export type Pushbullets_Aggregate = {
  __typename?: 'pushbullets_aggregate';
  aggregate?: Maybe<Pushbullets_Aggregate_Fields>;
  nodes: Array<Pushbullets>;
};

/** aggregate fields of "pushbullets" */
export type Pushbullets_Aggregate_Fields = {
  __typename?: 'pushbullets_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Pushbullets_Max_Fields>;
  min?: Maybe<Pushbullets_Min_Fields>;
};


/** aggregate fields of "pushbullets" */
export type Pushbullets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pushbullets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Pushbullets_Append_Input = {
  lazyData?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "pushbullets". All fields are combined with a logical 'AND'. */
export type Pushbullets_Bool_Exp = {
  _and?: InputMaybe<Array<Pushbullets_Bool_Exp>>;
  _not?: InputMaybe<Pushbullets_Bool_Exp>;
  _or?: InputMaybe<Array<Pushbullets_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lazyData?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "pushbullets" */
export enum Pushbullets_Constraint {
  /** unique or primary key constraint */
  PushbulletsPkey = 'pushbullets_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Pushbullets_Delete_At_Path_Input = {
  lazyData?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Pushbullets_Delete_Elem_Input = {
  lazyData?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Pushbullets_Delete_Key_Input = {
  lazyData?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "pushbullets" */
export type Pushbullets_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  lazyData?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Pushbullets_Max_Fields = {
  __typename?: 'pushbullets_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Pushbullets_Min_Fields = {
  __typename?: 'pushbullets_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "pushbullets" */
export type Pushbullets_Mutation_Response = {
  __typename?: 'pushbullets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pushbullets>;
};

/** on conflict condition type for table "pushbullets" */
export type Pushbullets_On_Conflict = {
  constraint: Pushbullets_Constraint;
  update_columns?: Array<Pushbullets_Update_Column>;
  where?: InputMaybe<Pushbullets_Bool_Exp>;
};

/** Ordering options when selecting data from "pushbullets". */
export type Pushbullets_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lazyData?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pushbullets */
export type Pushbullets_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Pushbullets_Prepend_Input = {
  lazyData?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "pushbullets" */
export enum Pushbullets_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LazyData = 'lazyData',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "pushbullets" */
export type Pushbullets_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  lazyData?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** update columns of table "pushbullets" */
export enum Pushbullets_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LazyData = 'lazyData',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'userId'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "providers" */
  providers: Array<Providers>;
  /** fetch aggregated fields from the table: "providers" */
  providers_aggregate: Providers_Aggregate;
  /** fetch data from the table: "providers" using primary key columns */
  providers_by_pk?: Maybe<Providers>;
  /** fetch data from the table: "pushbullets" */
  pushbullets: Array<Pushbullets>;
  /** fetch aggregated fields from the table: "pushbullets" */
  pushbullets_aggregate: Pushbullets_Aggregate;
  /** fetch data from the table: "pushbullets" using primary key columns */
  pushbullets_by_pk?: Maybe<Pushbullets>;
  /** fetch data from the table: "userProviders" */
  userProviders: Array<UserProviders>;
  /** fetch aggregated fields from the table: "userProviders" */
  userProviders_aggregate: UserProviders_Aggregate;
  /** fetch data from the table: "userProviders" using primary key columns */
  userProviders_by_pk?: Maybe<UserProviders>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootProvidersArgs = {
  distinct_on?: InputMaybe<Array<Providers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Providers_Order_By>>;
  where?: InputMaybe<Providers_Bool_Exp>;
};


export type Query_RootProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Providers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Providers_Order_By>>;
  where?: InputMaybe<Providers_Bool_Exp>;
};


export type Query_RootProviders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPushbulletsArgs = {
  distinct_on?: InputMaybe<Array<Pushbullets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pushbullets_Order_By>>;
  where?: InputMaybe<Pushbullets_Bool_Exp>;
};


export type Query_RootPushbullets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pushbullets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pushbullets_Order_By>>;
  where?: InputMaybe<Pushbullets_Bool_Exp>;
};


export type Query_RootPushbullets_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};


export type Query_RootUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};


export type Query_RootUserProviders_By_PkArgs = {
  providerId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "providers" */
  providers: Array<Providers>;
  /** fetch aggregated fields from the table: "providers" */
  providers_aggregate: Providers_Aggregate;
  /** fetch data from the table: "providers" using primary key columns */
  providers_by_pk?: Maybe<Providers>;
  /** fetch data from the table: "pushbullets" */
  pushbullets: Array<Pushbullets>;
  /** fetch aggregated fields from the table: "pushbullets" */
  pushbullets_aggregate: Pushbullets_Aggregate;
  /** fetch data from the table: "pushbullets" using primary key columns */
  pushbullets_by_pk?: Maybe<Pushbullets>;
  /** fetch data from the table: "userProviders" */
  userProviders: Array<UserProviders>;
  /** fetch aggregated fields from the table: "userProviders" */
  userProviders_aggregate: UserProviders_Aggregate;
  /** fetch data from the table: "userProviders" using primary key columns */
  userProviders_by_pk?: Maybe<UserProviders>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootProvidersArgs = {
  distinct_on?: InputMaybe<Array<Providers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Providers_Order_By>>;
  where?: InputMaybe<Providers_Bool_Exp>;
};


export type Subscription_RootProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Providers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Providers_Order_By>>;
  where?: InputMaybe<Providers_Bool_Exp>;
};


export type Subscription_RootProviders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPushbulletsArgs = {
  distinct_on?: InputMaybe<Array<Pushbullets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pushbullets_Order_By>>;
  where?: InputMaybe<Pushbullets_Bool_Exp>;
};


export type Subscription_RootPushbullets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pushbullets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pushbullets_Order_By>>;
  where?: InputMaybe<Pushbullets_Bool_Exp>;
};


export type Subscription_RootPushbullets_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};


export type Subscription_RootUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};


export type Subscription_RootUserProviders_By_PkArgs = {
  providerId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "userProviders" */
export type UserProviders = {
  __typename?: 'userProviders';
  /** An object relationship */
  provider: Providers;
  providerId: Scalars['uuid'];
  token: Scalars['String'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "userProviders" */
export type UserProviders_Aggregate = {
  __typename?: 'userProviders_aggregate';
  aggregate?: Maybe<UserProviders_Aggregate_Fields>;
  nodes: Array<UserProviders>;
};

/** aggregate fields of "userProviders" */
export type UserProviders_Aggregate_Fields = {
  __typename?: 'userProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<UserProviders_Max_Fields>;
  min?: Maybe<UserProviders_Min_Fields>;
};


/** aggregate fields of "userProviders" */
export type UserProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<UserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "userProviders" */
export type UserProviders_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<UserProviders_Max_Order_By>;
  min?: InputMaybe<UserProviders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "userProviders" */
export type UserProviders_Arr_Rel_Insert_Input = {
  data: Array<UserProviders_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<UserProviders_On_Conflict>;
};

/** Boolean expression to filter rows from the table "userProviders". All fields are combined with a logical 'AND'. */
export type UserProviders_Bool_Exp = {
  _and?: InputMaybe<Array<UserProviders_Bool_Exp>>;
  _not?: InputMaybe<UserProviders_Bool_Exp>;
  _or?: InputMaybe<Array<UserProviders_Bool_Exp>>;
  provider?: InputMaybe<Providers_Bool_Exp>;
  providerId?: InputMaybe<Uuid_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "userProviders" */
export enum UserProviders_Constraint {
  /** unique or primary key constraint */
  UserProvidersPkey = 'userProviders_pkey'
}

/** input type for inserting data into table "userProviders" */
export type UserProviders_Insert_Input = {
  provider?: InputMaybe<Providers_Obj_Rel_Insert_Input>;
  providerId?: InputMaybe<Scalars['uuid']>;
  token?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type UserProviders_Max_Fields = {
  __typename?: 'userProviders_max_fields';
  providerId?: Maybe<Scalars['uuid']>;
  token?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "userProviders" */
export type UserProviders_Max_Order_By = {
  providerId?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type UserProviders_Min_Fields = {
  __typename?: 'userProviders_min_fields';
  providerId?: Maybe<Scalars['uuid']>;
  token?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "userProviders" */
export type UserProviders_Min_Order_By = {
  providerId?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "userProviders" */
export type UserProviders_Mutation_Response = {
  __typename?: 'userProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserProviders>;
};

/** on conflict condition type for table "userProviders" */
export type UserProviders_On_Conflict = {
  constraint: UserProviders_Constraint;
  update_columns?: Array<UserProviders_Update_Column>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "userProviders". */
export type UserProviders_Order_By = {
  provider?: InputMaybe<Providers_Order_By>;
  providerId?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: userProviders */
export type UserProviders_Pk_Columns_Input = {
  providerId: Scalars['uuid'];
  userId: Scalars['uuid'];
};

/** select columns of table "userProviders" */
export enum UserProviders_Select_Column {
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "userProviders" */
export type UserProviders_Set_Input = {
  providerId?: InputMaybe<Scalars['uuid']>;
  token?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "userProviders" */
export enum UserProviders_Update_Column {
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  id: Scalars['uuid'];
  /** An array relationship */
  providers: Array<UserProviders>;
  /** An aggregate relationship */
  providers_aggregate: UserProviders_Aggregate;
};


/** columns and relationships of "users" */
export type UsersProvidersArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserProviders_Order_By>>;
  where?: InputMaybe<UserProviders_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  providers?: InputMaybe<UserProviders_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  providers?: InputMaybe<UserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  id?: InputMaybe<Order_By>;
  providers_aggregate?: InputMaybe<UserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'id'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type QueryUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type QueryUserQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, providers: Array<{ __typename?: 'userProviders', token: string, provider: { __typename?: 'providers', name: string } }> }> };

export type InsertUsersOneMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type InsertUsersOneMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', id: any } | null };

export type MutationInsertUserProvidersOneMutationVariables = Exact<{
  userId: Scalars['uuid'];
  token: Scalars['String'];
}>;


export type MutationInsertUserProvidersOneMutation = { __typename?: 'mutation_root', insert_userProviders_one?: { __typename?: 'userProviders', userId: any, providerId: any, token: string } | null };


export const QueryUserDocument = gql`
    query QueryUser($id: uuid) {
  users(where: {id: {_eq: $id}}) {
    id
    providers {
      provider {
        name
      }
      token
    }
  }
}
    `;

/**
 * __useQueryUserQuery__
 *
 * To run a query within a React component, call `useQueryUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryUserQuery(baseOptions?: Apollo.QueryHookOptions<QueryUserQuery, QueryUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryUserQuery, QueryUserQueryVariables>(QueryUserDocument, options);
      }
export function useQueryUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryUserQuery, QueryUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryUserQuery, QueryUserQueryVariables>(QueryUserDocument, options);
        }
export type QueryUserQueryHookResult = ReturnType<typeof useQueryUserQuery>;
export type QueryUserLazyQueryHookResult = ReturnType<typeof useQueryUserLazyQuery>;
export type QueryUserQueryResult = Apollo.QueryResult<QueryUserQuery, QueryUserQueryVariables>;
export const InsertUsersOneDocument = gql`
    mutation InsertUsersOne($id: uuid!) {
  insert_users_one(object: {id: $id}) {
    id
  }
}
    `;
export type InsertUsersOneMutationFn = Apollo.MutationFunction<InsertUsersOneMutation, InsertUsersOneMutationVariables>;

/**
 * __useInsertUsersOneMutation__
 *
 * To run a mutation, you first call `useInsertUsersOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUsersOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUsersOneMutation, { data, loading, error }] = useInsertUsersOneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInsertUsersOneMutation(baseOptions?: Apollo.MutationHookOptions<InsertUsersOneMutation, InsertUsersOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertUsersOneMutation, InsertUsersOneMutationVariables>(InsertUsersOneDocument, options);
      }
export type InsertUsersOneMutationHookResult = ReturnType<typeof useInsertUsersOneMutation>;
export type InsertUsersOneMutationResult = Apollo.MutationResult<InsertUsersOneMutation>;
export type InsertUsersOneMutationOptions = Apollo.BaseMutationOptions<InsertUsersOneMutation, InsertUsersOneMutationVariables>;
export const MutationInsertUserProvidersOneDocument = gql`
    mutation MutationInsertUserProvidersOne($userId: uuid!, $token: String!) {
  insert_userProviders_one(
    object: {userId: $userId, providerId: "7bc2a47c-d98c-44f1-98c6-a1a9e6469924", token: $token}
  ) {
    userId
    providerId
    token
  }
}
    `;
export type MutationInsertUserProvidersOneMutationFn = Apollo.MutationFunction<MutationInsertUserProvidersOneMutation, MutationInsertUserProvidersOneMutationVariables>;

/**
 * __useMutationInsertUserProvidersOneMutation__
 *
 * To run a mutation, you first call `useMutationInsertUserProvidersOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationInsertUserProvidersOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationInsertUserProvidersOneMutation, { data, loading, error }] = useMutationInsertUserProvidersOneMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useMutationInsertUserProvidersOneMutation(baseOptions?: Apollo.MutationHookOptions<MutationInsertUserProvidersOneMutation, MutationInsertUserProvidersOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationInsertUserProvidersOneMutation, MutationInsertUserProvidersOneMutationVariables>(MutationInsertUserProvidersOneDocument, options);
      }
export type MutationInsertUserProvidersOneMutationHookResult = ReturnType<typeof useMutationInsertUserProvidersOneMutation>;
export type MutationInsertUserProvidersOneMutationResult = Apollo.MutationResult<MutationInsertUserProvidersOneMutation>;
export type MutationInsertUserProvidersOneMutationOptions = Apollo.BaseMutationOptions<MutationInsertUserProvidersOneMutation, MutationInsertUserProvidersOneMutationVariables>;