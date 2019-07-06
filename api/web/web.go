package web

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/handler"
	"github.com/dimfeld/httptreemux"
)

type Web struct {
	schema graphql.ExecutableSchema
}

func ProvideWeb(schema graphql.ExecutableSchema) *Web {
	return &Web{schema: schema}
}

func (w *Web) graphql() http.HandlerFunc {
	return handler.GraphQL(w.schema)
}

func (w *Web) Handler() http.Handler {
	router := httptreemux.New()
	router.UsingContext().GET("/graphql", w.graphql())
	router.UsingContext().POST("/graphql", w.graphql())
	router.UsingContext().OPTIONS("/graphql", w.graphql())
	return router
}

func (w *Web) Close() error {
	return nil
}
