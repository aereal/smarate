package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"contrib.go.opencensus.io/exporter/stackdriver"
	"contrib.go.opencensus.io/exporter/stackdriver/propagation"
	"go.opencensus.io/plugin/ochttp"
	"go.opencensus.io/trace"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%+v\n", err)
		os.Exit(1)
	}
}

func run() error {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	exporter, err := stackdriver.NewExporter(stackdriver.Options{Context: ctx})
	if err != nil {
		return err
	}
	defer exporter.Flush()
	trace.RegisterExporter(exporter)

	w, err := InitializeWeb(ctx)
	if err != nil {
		return err
	}
	server := &http.Server{
		Addr: fmt.Sprintf(":%s", port),
		Handler: &ochttp.Handler{
			Handler:     w.Handler(),
			Propagation: &propagation.HTTPFormat{},
		},
	}
	go graceful(ctx, server, 5*time.Second)

	log.Printf("starting server")
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		return fmt.Errorf("cannot start server: %s", err)
	}

	if err := w.Close(); err != nil {
		return fmt.Errorf("failed to close: %s", err)
	}

	return nil
}

func graceful(parent context.Context, server *http.Server, timeout time.Duration) {
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	sig := <-sigChan
	ctx, cancel := context.WithTimeout(parent, timeout)
	defer cancel()
	log.Printf("shutting down server signal=%q", sig)
	if err := server.Shutdown(ctx); err != nil {
		log.Printf("failed to shutdown: %s", err)
	}
}
