//+build wireinject

package main

import (
	"context"
	"net/http"

	"github.com/aereal/smarate/api/auth"
	"github.com/aereal/smarate/api/gql"
	"github.com/aereal/smarate/api/gql/resolvers"
	"github.com/aereal/smarate/api/repo"
	"github.com/aereal/smarate/api/web"
	"github.com/google/wire"
)

func InitializeServer(ctx context.Context, port string) (server *http.Server, e error) {
	wire.Build(ProvideServer, web.ProvideWeb, gql.ProvideExecutableSchema, resolvers.ProvideResolver, repo.ProvideRepo, ProvideFirebaseApp, ProvideFirestoreClient, auth.ProvideMiddleware)
	return
}
