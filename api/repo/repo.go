package repo

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"
	"github.com/aereal/smarate/api/model"
	"google.golang.org/api/iterator"
)

type Repo struct {
	firestore *firestore.Client
}

func ProvideRepo(firestore *firestore.Client) *Repo {
	return &Repo{firestore: firestore}
}

func (r *Repo) FindGlobalFightResults(ctx context.Context, first int) ([]*model.GlobalFightResult, error) {
	iter := r.firestore.Collection("global_results").Limit(first).OrderBy("recordedAt", firestore.Desc).Documents(ctx)
	results := []*model.GlobalFightResult{}
	for {
		snapshot, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var res model.GlobalFightResult
		if err := snapshot.DataTo(&res); err != nil {
			return nil, err
		}
		results = append(results, &res)
	}
	return results, nil
}

func (r *Repo) FindFighterFightResults(ctx context.Context, fighterID int, first int) ([]*model.FighterFightResult, error) {
	wonResults, err := r.findFighterFightResultByStatus(ctx, fighterID, first, true)
	if err != nil {
		return nil, err
	}
	lostResults, err := r.findFighterFightResultByStatus(ctx, fighterID, first, false)
	if err != nil {
		return nil, err
	}
	total := append(wonResults, lostResults...)
	// TODO: sort
	// TODO: limit
	return total, nil
}

func (r *Repo) findFighterFightResultByStatus(ctx context.Context, fighterID int, first int, won bool) ([]*model.FighterFightResult, error) {
	whereFieldPath := "wonFighter.id"
	if !won {
		whereFieldPath = "lostFighter.id"
	}
	iter := r.firestore.Collection("global_results").OrderBy("recordedAt", firestore.Desc).Limit(first).Where(whereFieldPath, "==", fighterID).Documents(ctx)
	results := []*model.FighterFightResult{}
	for {
		snapshot, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var res model.GlobalFightResult
		if err := snapshot.DataTo(&res); err != nil {
			return nil, err
		}

		fighterResult, err := res.FighterFightResult(fighterID)
		if err != nil {
			return nil, err
		}
		results = append(results, fighterResult)
	}
	return results, nil
}

func (r *Repo) FindUserFromToken(ctx context.Context, token *auth.Token) (*model.User, error) {
	return &model.User{ID: token.UID}, nil
}

func (r *Repo) FindUserPreference(ctx context.Context, userID string) (*model.UserPreference, error) {
	snapshot, err := r.firestore.Collection("user_preferences").Doc(userID).Get(ctx)
	if err != nil {
		return nil, err
	}
	var pref model.UserPreference
	if err := snapshot.DataTo(&pref); err != nil {
		return nil, err
	}
	return &pref, nil
}

func (r *Repo) UpdateUserPreference(ctx context.Context, user *model.User, pref *model.UserPreference) error {
	ref := r.firestore.Collection("user_preferences").Doc(user.ID)
	update := firestore.Update{Path: "defaultFighterID", Value: nil}
	if pref != nil {
		update.Value = pref.DefaultFighterID
	}
	_, err := ref.Update(ctx, []firestore.Update{update})
	if err != nil {
		return err
	}
	return nil
}

func (r *Repo) RecordFightResult(ctx context.Context, user *model.User, myFighter *model.Fighter, rivalFighter *model.Fighter, won bool) (bool, error) {
	wonFighter := myFighter
	lostFighter := rivalFighter
	if !won {
		wonFighter = rivalFighter
		lostFighter = myFighter
	}

	recordedAt := time.Now()
	batch := r.firestore.Batch()

	globalResultRef := r.firestore.Collection("global_results").NewDoc()
	globalResult := &model.GlobalFightResult{
		RecordedAt:  recordedAt,
		WonFighter:  wonFighter,
		LostFighter: lostFighter,
	}
	batch.Set(globalResultRef, globalResult)

	userResultRef := r.firestore.Collection("user_results").NewDoc()
	batch.Set(userResultRef, &model.UserFightResult{
		RecordedAt:   recordedAt,
		MyFighter:    myFighter,
		RivalFighter: rivalFighter,
	})

	_, err := batch.Commit(ctx)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *Repo) FindUserFightResults(ctx context.Context, user *model.User, first int) ([]*model.UserFightResult, error) {
	iter := r.firestore.Collection("user_results").OrderBy("recordedAt", firestore.Desc).Limit(first).Documents(ctx)
	results := []*model.UserFightResult{}
	for {
		snapshot, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var result model.UserFightResult
		if err := snapshot.DataTo(&result); err != nil {
			return nil, err
		}
		results = append(results, &result)
	}
	return results, nil
}

func (r *Repo) FindFighterName(ctx context.Context, fighterID int) (*model.LocalizedName, error) {
	v, ok := localizedNameByID[fighterID]
	if !ok {
		return nil, fmt.Errorf("not found")
	}
	return v, nil
}

type localizedName struct {
	Ja string
}

type fighter struct {
	ID   int
	Name *model.LocalizedName
}

type fighters []*fighter

var localizedNameByID map[int]*model.LocalizedName

func init() {
	f, err := os.Open("./api/model/fighters.json")
	if err != nil {
		panic(fmt.Errorf("failed to open file: %s", err))
	}
	var fighters fighters
	if err := json.NewDecoder(f).Decode(&fighters); err != nil {
		panic(fmt.Errorf("failed to decode: %s", err))
	}
	localizedNameByID = make(map[int]*model.LocalizedName)
	for _, fighter := range fighters {
		localizedNameByID[fighter.ID] = fighter.Name
	}
}
