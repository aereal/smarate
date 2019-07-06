package resolvers

import (
	"context"
	"fmt"
	"time"

	"github.com/aereal/smarate/api/auth"
	"github.com/aereal/smarate/api/gql/dto"
	handler1 "github.com/aereal/smarate/api/gql/handler"
	"github.com/aereal/smarate/api/model"
	"github.com/aereal/smarate/api/repo"
)

func ProvideResolver(repo *repo.Repo) *Resolver {
	return &Resolver{repo: repo}
}

type Resolver struct {
	repo *repo.Repo
}

func (r *Resolver) Mutation() handler1.MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() handler1.QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) Fighter() handler1.FighterResolver {
	return &fighterResolver{r}
}
func (r *Resolver) FighterFightResult() handler1.FighterFightResultResolver {
	return &fighterFightResultResolver{r}
}
func (r *Resolver) GlobalFightResult() handler1.GlobalFightResultResolver {
	return &globalFightResultResolver{r}
}
func (r *Resolver) User() handler1.UserResolver {
	return &userResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) RecordResult(ctx context.Context, myFighterID int, rivalFighterID int, won bool) (bool, error) {
	token := auth.GetToken(ctx)
	if token == nil {
		return false, fmt.Errorf("authentication failed")
	}
	visitor, err := r.repo.FindUserFromToken(ctx, token)
	if err != nil {
		return false, err
	}
	myFighter := &model.Fighter{ID: myFighterID}
	rivalFighter := &model.Fighter{ID: rivalFighterID}
	return r.repo.RecordFightResult(ctx, visitor, myFighter, rivalFighter, won)
}

func (r *mutationResolver) SetPreference(ctx context.Context, defaultFighterID *int) (bool, error) {
	token := auth.GetToken(ctx)
	if token == nil {
		return false, fmt.Errorf("authentication failed")
	}
	visitor, err := r.repo.FindUserFromToken(ctx, token)
	if err != nil {
		return false, err
	}
	var pref *model.UserPreference
	if defaultFighterID != nil {
		pref = &model.UserPreference{DefaultFighterID: *defaultFighterID}
	}
	if err := r.repo.UpdateUserPreference(ctx, visitor, pref); err != nil {
		return false, err
	}
	return true, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) FightResults(ctx context.Context, first int) (*dto.GlobalFightResultConnection, error) {
	results, err := r.repo.FindGlobalFightResults(ctx, first)
	if err != nil {
		return nil, err
	}
	conn := &dto.GlobalFightResultConnection{
		Nodes: results,
	}
	return conn, nil
}

func (r *queryResolver) Fighter(ctx context.Context, id int) (*model.Fighter, error) {
	return &model.Fighter{ID: id}, nil
}

func (r *queryResolver) Visitor(ctx context.Context) (*model.User, error) {
	token := auth.GetToken(ctx)
	if token == nil {
		return nil, fmt.Errorf("authentication failed")
	}
	return r.repo.FindUserFromToken(ctx, token)
}

type fighterResolver struct{ *Resolver }

func (r *fighterResolver) Name(ctx context.Context, fighter *model.Fighter) (*model.LocalizedName, error) {
	return r.repo.FindFighterName(ctx, fighter.ID)
}

func (r *fighterResolver) FightResults(ctx context.Context, fighter *model.Fighter, first int) (*dto.FighterFightResultConnection, error) {
	results, err := r.repo.FindFighterFightResults(ctx, fighter.ID, first)
	if err != nil {
		return nil, err
	}
	conn := &dto.FighterFightResultConnection{Nodes: results}
	return conn, nil
}

type fighterFightResultResolver struct{ *Resolver }

func (r *fighterFightResultResolver) RecordedAt(ctx context.Context, result *model.FighterFightResult) (string, error) {
	return result.RecordedAt.Format(time.RFC3339Nano), nil
}

type globalFightResultResolver struct{ *Resolver }

func (r *globalFightResultResolver) RecordedAt(ctx context.Context, result *model.GlobalFightResult) (string, error) {
	return result.RecordedAt.Format(time.RFC3339Nano), nil
}

type userResolver struct{ *Resolver }

func (r *userResolver) Preference(ctx context.Context, user *model.User) (*model.UserPreference, error) {
	return r.repo.FindUserPreference(ctx, user.ID)
}

func (r *userResolver) FightResults(ctx context.Context, user *model.User, first int) (*dto.UserFightResultConnection, error) {
	conn := &dto.UserFightResultConnection{}
	return conn, nil // TODO
}
