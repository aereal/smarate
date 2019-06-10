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

export interface FighterDetailFragment_fightResults {
  __typename: "FighterFightResultConnection";
  winRatio: number;
}

export interface FighterDetailFragment {
  __typename: "Fighter";
  name: FighterDetailFragment_name;
  fightResults: FighterDetailFragment_fightResults;
}
