package main

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

func ProvideFirebaseApp(ctx context.Context) (*firebase.App, error) {
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Firebase app: %s", err)
	}
	return app, nil
}

func ProvideFirestoreClient(ctx context.Context, app *firebase.App) (*firestore.Client, error) {
	firestore, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create firestore client: %s", err)
	}
	return firestore, nil
}
