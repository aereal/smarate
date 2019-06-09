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

export interface FighterDetailPageQuery_fighter {
  __typename: "Fighter";
  name: FighterDetailPageQuery_fighter_name;
}

export interface FighterDetailPageQuery {
  fighter: FighterDetailPageQuery_fighter | null;
}

export interface FighterDetailPageQueryVariables {
  fighterID: number;
}
