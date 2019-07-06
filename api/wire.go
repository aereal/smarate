//+build wireinject

package main

import (
	"context"

	"github.com/aereal/smarate/api/gql"
	"github.com/aereal/smarate/api/gql/resolvers"
	"github.com/aereal/smarate/api/web"
	"github.com/aereal/smarate/api/auth"
	"github.com/aereal/smarate/api/repo"
	"github.com/google/wire"
)

func InitializeWeb(ctx context.Context) (w *web.Web, e error) {
	wire.Build(web.ProvideWeb, gql.ProvideExecutableSchema, resolvers.ProvideResolver, repo.ProvideRepo, ProvideFirebaseApp, ProvideFirestoreClient, auth.ProvideMiddleware)
	return
}
