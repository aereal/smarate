/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FighterDetailFragment
// ====================================================

export interface FighterDetailFragment_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailFragment_fightResults_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailFragment_fightResults_nodes_rivalFighter {
  __typename: "Fighter";
  id: number;
  name: FighterDetailFragment_fightResults_nodes_rivalFighter_name;
}

export interface FighterDetailFragment_fightResults_nodes {
  __typename: "FighterFightResult";
  rivalFighter: FighterDetailFragment_fightResults_nodes_rivalFighter;
  won: boolean;
}

export interface FighterDetailFragment_fightResults {
  __typename: "FighterFightResultConnection";
  winRatio: number;
  nodes: FighterDetailFragment_fightResults_nodes[];
}

export interface FighterDetailFragment {
  __typename: "Fighter";
  name: FighterDetailFragment_name;
  fightResults: FighterDetailFragment_fightResults;
}
