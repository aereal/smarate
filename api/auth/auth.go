package auth

import (
	"context"
	"log"
	"net/http"
	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

type contextKey struct {
	name string
}

var keyAuthToken = &contextKey{"auth-token"}

func GetToken(ctx context.Context) *auth.Token {
	token, _ := ctx.Value(keyAuthToken).(*auth.Token)
	return token
}

func ProvideMiddleware(app *firebase.App) *Middleware {
	return &Middleware{firebaseApp: app}
}

type Middleware struct {
	firebaseApp *firebase.App
}

func (mw *Middleware) Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authz := r.Header.Get("authorization")
		elms := strings.SplitN(authz, " ", 2)
		if len(elms) != 2 || elms[0] != "token" || elms[1] == "" {
			log.Printf("authorization not found")
			next.ServeHTTP(w, r)
			return
		}
		idToken := elms[1]

		ctx := r.Context()
		authClient, err := mw.firebaseApp.Auth(ctx)
		if err != nil {
			log.Printf("failed to create auth client: %s", err)
			next.ServeHTTP(w, r)
			return
		}
		token, err := authClient.VerifyIDToken(ctx, idToken)
		if err != nil {
			log.Printf("failed to authentication: %s", err)
			next.ServeHTTP(w, r)
			return
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, keyAuthToken, token)))
	})
}
