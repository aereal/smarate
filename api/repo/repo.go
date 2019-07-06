package repo

import (
	"cloud.google.com/go/firestore"
)

type Repo struct {
	firestore *firestore.Client
}

func ProvideRepo(firestore *firestore.Client) *Repo {
	return &Repo{firestore: firestore}
}
