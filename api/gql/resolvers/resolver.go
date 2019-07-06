package resolvers

import (
	"context"

	"github.com/aereal/smarate/api/gql/dto"
	handler1 "github.com/aereal/smarate/api/gql/handler"
)

type Resolver struct{}

func (r *Resolver) Mutation() handler1.MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() handler1.QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) RecordResult(ctx context.Context, a int, b int, c bool) (bool, error) {
	return true, nil // TODO
}

func (r *mutationResolver) SetPreference(ctx context.Context, defaultFighterID *int) (bool, error) {
	return true, nil // TODO
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) FightResults(ctx context.Context, a int) (*dto.GlobalFightResultConnection, error) {
	return nil, nil // TODO
}

func (r *queryResolver) Fighter(ctx context.Context, a int) (*dto.Fighter, error) {
	return nil, nil // TODO
}

func (r *queryResolver) Visitor(ctx context.Context) (*dto.User, error) {
	return nil, nil
}
