/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyFightResultListFragment
// ====================================================

export interface MyFightResultListFragment_fightResults_nodes_myFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyFightResultListFragment_fightResults_nodes_myFighter {
  __typename: "Fighter";
  id: number;
  name: MyFightResultListFragment_fightResults_nodes_myFighter_name;
}

export interface MyFightResultListFragment_fightResults_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyFightResultListFragment_fightResults_nodes_rivalFighter {
  __typename: "Fighter";
  id: number;
  name: MyFightResultListFragment_fightResults_nodes_rivalFighter_name;
}

export interface MyFightResultListFragment_fightResults_nodes {
  __typename: "UserFightResult";
  myFighter: MyFightResultListFragment_fightResults_nodes_myFighter;
  rivalFighter: MyFightResultListFragment_fightResults_nodes_rivalFighter;
  won: boolean;
}

export interface MyFightResultListFragment_fightResults {
  __typename: "UserFightResultConnection";
  nodes: MyFightResultListFragment_fightResults_nodes[];
}

export interface MyFightResultListFragment {
  __typename: "User";
  fightResults: MyFightResultListFragment_fightResults;
}
