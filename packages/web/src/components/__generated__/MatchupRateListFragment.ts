/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MatchupRateListFragment
// ====================================================

export interface MatchupRateListFragment_mostWonFighters_nodes_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MatchupRateListFragment_mostWonFighters_nodes_rivalFighter {
  __typename: "Fighter";
  name: MatchupRateListFragment_mostWonFighters_nodes_rivalFighter_name;
  id: number;
}

export interface MatchupRateListFragment_mostWonFighters_nodes {
  __typename: "Matchup";
  rivalFighter: MatchupRateListFragment_mostWonFighters_nodes_rivalFighter;
}

export interface MatchupRateListFragment_mostWonFighters {
  __typename: "MatchupConnection";
  nodes: MatchupRateListFragment_mostWonFighters_nodes[];
}

export interface MatchupRateListFragment {
  __typename: "FighterFightResultConnection";
  mostWonFighters: MatchupRateListFragment_mostWonFighters;
}
