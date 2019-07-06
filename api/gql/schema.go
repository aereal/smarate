package gql

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/aereal/smarate/api/gql/handler"
	"github.com/aereal/smarate/api/gql/resolvers"
)

func ProvideExecutableSchema() graphql.ExecutableSchema {
	return handler.NewExecutableSchema(handler.Config{
		Resolvers: &resolvers.Resolver{},
	})
}
