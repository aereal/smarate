package repo

import (
	"context"

	"cloud.google.com/go/firestore"
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
