package web

import (
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/handler"
	"github.com/aereal/smarate/api/auth"
	"github.com/dimfeld/httptreemux"
	"github.com/rs/cors"
)

type Web struct {
	schema          graphql.ExecutableSchema
	firestoreClient *firestore.Client
	authMW          *auth.Middleware
}

func ProvideWeb(schema graphql.ExecutableSchema, firestore *firestore.Client, authMW *auth.Middleware) *Web {
	return &Web{schema: schema, firestoreClient: firestore, authMW: authMW}
}

func (w *Web) graphql() http.HandlerFunc {
	return handler.GraphQL(w.schema)
}

func (w *Web) Handler() http.Handler {
	corwMW := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})
	router := httptreemux.New()
	dispatch := func(method, path string, h http.Handler) {
		router.UsingContext().Handler(method, path, corwMW.Handler(h))
	}
	dispatch(http.MethodGet, "/graphql", w.authMW.Handler(w.graphql()))
	dispatch(http.MethodPost, "/graphql", w.authMW.Handler(w.graphql()))
	dispatch(http.MethodOptions, "/graphql", w.authMW.Handler(w.graphql()))
	return router
}

func (w *Web) Close() error {
	return w.firestoreClient.Close()
}
