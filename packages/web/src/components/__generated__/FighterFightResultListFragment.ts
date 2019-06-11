/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FighterFightResultListFragment
// ====================================================

export interface FighterFightResultListFragment_fightResults_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterFightResultListFragment_fightResults_nodes_rivalFighter {
  __typename: "Fighter";
  id: number;
  name: FighterFightResultListFragment_fightResults_nodes_rivalFighter_name;
}

export interface FighterFightResultListFragment_fightResults_nodes {
  __typename: "FighterFightResult";
  rivalFighter: FighterFightResultListFragment_fightResults_nodes_rivalFighter;
  won: boolean;
}

export interface FighterFightResultListFragment_fightResults {
  __typename: "FighterFightResultConnection";
  nodes: FighterFightResultListFragment_fightResults_nodes[];
}

export interface FighterFightResultListFragment {
  __typename: "Fighter";
  fightResults: FighterFightResultListFragment_fightResults;
}
