/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FighterDetailPageQuery
// ====================================================

export interface FighterDetailPageQuery_fighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailPageQuery_fighter_fightResults_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailPageQuery_fighter_fightResults_nodes_rivalFighter {
  __typename: "Fighter";
  id: number;
  name: FighterDetailPageQuery_fighter_fightResults_nodes_rivalFighter_name;
}

export interface FighterDetailPageQuery_fighter_fightResults_nodes {
  __typename: "FighterFightResult";
  rivalFighter: FighterDetailPageQuery_fighter_fightResults_nodes_rivalFighter;
  won: boolean;
}

export interface FighterDetailPageQuery_fighter_fightResults {
  __typename: "FighterFightResultConnection";
  winRatio: number;
  nodes: FighterDetailPageQuery_fighter_fightResults_nodes[];
}

export interface FighterDetailPageQuery_fighter {
  __typename: "Fighter";
  name: FighterDetailPageQuery_fighter_name;
  fightResults: FighterDetailPageQuery_fighter_fightResults;
}

export interface FighterDetailPageQuery {
  fighter: FighterDetailPageQuery_fighter | null;
}

export interface FighterDetailPageQueryVariables {
  fighterID: number;
}
