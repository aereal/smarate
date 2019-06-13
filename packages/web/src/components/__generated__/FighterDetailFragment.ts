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

export interface FighterDetailFragment_fightResults_mostWonFighters_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterDetailFragment_fightResults_mostWonFighters_nodes_rivalFighter {
  __typename: "Fighter";
  name: FighterDetailFragment_fightResults_mostWonFighters_nodes_rivalFighter_name;
  id: number;
}

export interface FighterDetailFragment_fightResults_mostWonFighters_nodes {
  __typename: "Matchup";
  rivalFighter: FighterDetailFragment_fightResults_mostWonFighters_nodes_rivalFighter;
}

export interface FighterDetailFragment_fightResults_mostWonFighters {
  __typename: "MatchupConnection";
  nodes: FighterDetailFragment_fightResults_mostWonFighters_nodes[];
}

export interface FighterDetailFragment_fightResults {
  __typename: "FighterFightResultConnection";
  winRatio: number;
  mostWonFighters: FighterDetailFragment_fightResults_mostWonFighters;
}

export interface FighterDetailFragment {
  __typename: "Fighter";
  name: FighterDetailFragment_name;
  fightResults: FighterDetailFragment_fightResults;
}
