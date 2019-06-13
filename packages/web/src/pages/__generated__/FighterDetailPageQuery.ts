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

export interface FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes_rivalFighter {
  __typename: "Fighter";
  name: FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes_rivalFighter_name;
  id: number;
}

export interface FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes {
  __typename: "Matchup";
  rivalFighter: FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes_rivalFighter;
}

export interface FighterDetailPageQuery_fighter_fightResults_mostWonFighters {
  __typename: "MatchupConnection";
  nodes: FighterDetailPageQuery_fighter_fightResults_mostWonFighters_nodes[];
}

export interface FighterDetailPageQuery_fighter_fightResults {
  __typename: "FighterFightResultConnection";
  winRatio: number;
  mostWonFighters: FighterDetailPageQuery_fighter_fightResults_mostWonFighters;
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
  fightResultsCount: number;
}
