package main

import (
	"fmt"
	"net/http"

	"contrib.go.opencensus.io/exporter/stackdriver/propagation"
	"github.com/aereal/smarate/api/web"
	"go.opencensus.io/plugin/ochttp"
)

func ProvideServer(port string, w *web.Web) *http.Server {
	handler := &ochttp.Handler{
		Handler:     w.Handler(),
		Propagation: &propagation.HTTPFormat{},
	}
	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: handler,
	}
	return server
}
