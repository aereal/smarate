/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecordResultQuery
// ====================================================

export interface RecordResultQuery_visitor_preference {
  __typename: "UserPreference";
  defaultFighterID: number;
}

export interface RecordResultQuery_visitor {
  __typename: "User";
  preference: RecordResultQuery_visitor_preference;
}

export interface RecordResultQuery {
  visitor: RecordResultQuery_visitor | null;
}
