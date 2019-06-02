/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyPageQuery
// ====================================================

export interface MyPageQuery_visitor_preference {
  __typename: "UserPreference";
  defaultFighterID: number;
}

export interface MyPageQuery_visitor {
  __typename: "User";
  preference: MyPageQuery_visitor_preference;
}

export interface MyPageQuery {
  visitor: MyPageQuery_visitor | null;
}
