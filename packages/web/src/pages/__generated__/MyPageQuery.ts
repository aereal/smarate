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

export interface MyPageQuery_visitor_fightResults_nodes_myFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyPageQuery_visitor_fightResults_nodes_myFighter {
  __typename: "Fighter";
  name: MyPageQuery_visitor_fightResults_nodes_myFighter_name;
}

export interface MyPageQuery_visitor_fightResults_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyPageQuery_visitor_fightResults_nodes_rivalFighter {
  __typename: "Fighter";
  name: MyPageQuery_visitor_fightResults_nodes_rivalFighter_name;
}

export interface MyPageQuery_visitor_fightResults_nodes {
  __typename: "UserFightResult";
  myFighter: MyPageQuery_visitor_fightResults_nodes_myFighter;
  rivalFighter: MyPageQuery_visitor_fightResults_nodes_rivalFighter;
  won: boolean;
}

export interface MyPageQuery_visitor_fightResults {
  __typename: "UserFightResultConnection";
  nodes: MyPageQuery_visitor_fightResults_nodes[];
}

export interface MyPageQuery_visitor {
  __typename: "User";
  preference: MyPageQuery_visitor_preference;
  fightResults: MyPageQuery_visitor_fightResults;
}

export interface MyPageQuery {
  visitor: MyPageQuery_visitor | null;
}
