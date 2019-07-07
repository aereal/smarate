package main

import (
	"fmt"
	"net/http"

	"contrib.go.opencensus.io/exporter/stackdriver/propagation"
	"github.com/aereal/smarate/api/web"
	"go.opencensus.io/plugin/ochttp"
)

func ProvideServer(port string, w *web.Web) *http.Server {
	host := "localhost"
	var handler http.Handler
	handler = w.Handler()

	if onGAE {
		host = ""
		handler = &ochttp.Handler{
			Handler:     w.Handler(),
			Propagation: &propagation.HTTPFormat{},
		}
	}

	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%s", host, port),
		Handler: handler,
	}
	return server
}
