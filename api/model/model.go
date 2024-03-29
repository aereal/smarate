package model

import (
	"context"
	"fmt"
	"time"
)

type GlobalFightResult struct {
	LostFighter *Fighter
	WonFighter  *Fighter
	RecordedAt  time.Time
}

func (r *GlobalFightResult) FighterFightResult(fighterID int) (*FighterFightResult, error) {
	if r.WonFighter.ID == fighterID {
		return &FighterFightResult{
			RecordedAt:   r.RecordedAt,
			Won:          true,
			MyFighter:    r.WonFighter,
			RivalFighter: r.LostFighter,
		}, nil
	}
	if r.LostFighter.ID == fighterID {
		return &FighterFightResult{
			RecordedAt:   r.RecordedAt,
			Won:          false,
			MyFighter:    r.LostFighter,
			RivalFighter: r.WonFighter,
		}, nil
	}
	return nil, fmt.Errorf("unknown fighterID on GlobalFightResult: fighterID=%d result=%#v", fighterID, r)
}

type UserFightResult struct {
	MyFighter    *Fighter
	RivalFighter *Fighter
	RecordedAt   time.Time
	Won          bool
}

type FighterFightResultConnection struct {
	Fighter *Fighter              `json:"-"`
	Nodes   []*FighterFightResult `json:"nodes"`
}

func (c *FighterFightResultConnection) WinRatio(ctx context.Context) float64 {
	total := float64(len(c.Nodes))
	wins := 0.0
	for _, result := range c.Nodes {
		if result.Won {
			wins++
		}
	}
	return wins / total
}

type FighterFightResult struct {
	MyFighter    *Fighter
	RivalFighter *Fighter
	RecordedAt   time.Time
	Won          bool
}

type Fighter struct {
	ID int
}

type LocalizedName struct {
	Ja string
}

type User struct {
	ID string
}

type UserPreference struct {
	DefaultFighterID int `json:"defaultFighterID"`
}

type Matchup struct {
	RivalFighterID int
	WinRatio       float64 `json:"winRatio"`
}
