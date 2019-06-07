/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyFightResultFragment
// ====================================================

export interface MyFightResultFragment_myFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyFightResultFragment_myFighter {
  __typename: "Fighter";
  name: MyFightResultFragment_myFighter_name;
}

export interface MyFightResultFragment_rivalFighter_name {
  __typename: "LocalizedName";
  ja: string;
}

export interface MyFightResultFragment_rivalFighter {
  __typename: "Fighter";
  name: MyFightResultFragment_rivalFighter_name;
}

export interface MyFightResultFragment {
  __typename: "UserFightResult";
  myFighter: MyFightResultFragment_myFighter;
  rivalFighter: MyFightResultFragment_rivalFighter;
  won: boolean;
}
