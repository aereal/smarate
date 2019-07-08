package main

import (
	"context"
	"fmt"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"github.com/aereal/smarate/api/model"
	"google.golang.org/api/iterator"
)

func main() {
	ctx := context.Background()
	if err := run(ctx); err != nil {
		log.Printf("%s", err)
		os.Exit(1)
	}
}

func run(ctx context.Context) error {
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to initialize Firebase app: %s", err)
	}
	firestore, err := app.Firestore(ctx)
	if err != nil {
		return fmt.Errorf("failed to create firestore client: %s", err)
	}
	defer firestore.Close()

	users, err := firestore.Collection("user_preferences").Documents(ctx).GetAll()
	if err != nil {
		return err
	}
	if len(users) > 1 {
		return fmt.Errorf("unexpectedly user snapshot exists more than 1")
	}
	migratedUserID := users[0].Ref.ID

	log.Printf("migrated to user.ID=%q", migratedUserID)

	iter := firestore.Collection("user_results").Documents(ctx)
	defer iter.Stop()

	writeBatch := firestore.Batch()

	for {
		snapshot, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		var before model.UserFightResult
		if err := snapshot.DataTo(&before); err != nil {
			return err
		}

		fightResult := firestore.Collection("users").Doc(migratedUserID).Collection("fight_results").NewDoc()
		writeBatch.Create(fightResult, &before)
	}

	if _, err := writeBatch.Commit(ctx); err != nil {
		return err
	}

	return nil
}
