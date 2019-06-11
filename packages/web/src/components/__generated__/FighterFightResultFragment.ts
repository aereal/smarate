/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FighterFightResultFragment
// ====================================================

export interface FighterFightResultFragment_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface FighterFightResultFragment_rivalFighter {
  __typename: "Fighter";
  id: number;
  name: FighterFightResultFragment_rivalFighter_name;
}

export interface FighterFightResultFragment {
  __typename: "FighterFightResult";
  rivalFighter: FighterFightResultFragment_rivalFighter;
  won: boolean;
}
