package web

import (
	"encoding/json"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/handler"
	"github.com/dimfeld/httptreemux"
	"github.com/rs/cors"
)

type Web struct {
	schema          graphql.ExecutableSchema
	firestoreClient *firestore.Client
}

func ProvideWeb(schema graphql.ExecutableSchema, firestore *firestore.Client) *Web {
	return &Web{schema: schema, firestoreClient: firestore}
}

func (w *Web) graphql() http.HandlerFunc {
	return handler.GraphQL(w.schema)
}

func (w *Web) Handler() http.Handler {
	corwMW := cors.New(cors.Options{})
	router := httptreemux.New()
	dispatch := func(method, path string, h http.Handler) {
		router.UsingContext().Handler(method, path, corwMW.Handler(h))
	}
	dispatch(http.MethodGet, "/graphql", w.graphql())
	dispatch(http.MethodPost, "/graphql", w.graphql())
	dispatch(http.MethodOptions, "/graphql", w.graphql())
	return router
}

func (w *Web) Close() error {
	return nil
}
