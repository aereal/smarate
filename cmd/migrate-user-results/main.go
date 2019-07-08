package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

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
	migratedUser := users[0]

	log.Printf("migrated to user.ID=%q", migratedUser.Ref.ID)

	newUserRef := firestore.Collection("users").Doc(migratedUser.Ref.ID)
	if _, err := newUserRef.Set(ctx, migratedUser.Data()); err != nil {
		return fmt.Errorf("failed to migrate user_preferences -> users: %s", err)
	}

	time.Sleep(300 * time.Millisecond)

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

		fightResult := newUserRef.Collection("fight_results").NewDoc()
		writeBatch.Create(fightResult, &before)
	}

	if _, err := writeBatch.Commit(ctx); err != nil {
		return err
	}

	return nil
}
