package web

import (
	"net/http"

	"github.com/dimfeld/httptreemux"
)

type Web struct {
}

func ProvideWeb() *Web {
	return &Web{}
}

func (w *Web) Handler() http.Handler {
	router := httptreemux.New()
	return router
}

func (w *Web) Close() error {
	return nil
}
