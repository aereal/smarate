package model

import "time"

type GlobalFightResult struct {
	LostFighter *Fighter
	WonFighter  *Fighter
	RecordedAt  time.Time
}

type UserFightResult struct {
	MyFighter    *Fighter
	RivalFighter *Fighter
	RecordedAt   time.Time
	Won          bool
}

type Fighter struct {
	ID int
}
