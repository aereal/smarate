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
	"go.opencensus.io/trace"
)

var (
	onGAE bool
)

func init() {
	onGAE = os.Getenv("GAE_ENV") != ""
}

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

	if onGAE {
		exporter, err := stackdriver.NewExporter(stackdriver.Options{Context: ctx})
		if err != nil {
			return err
		}
		defer exporter.Flush()
		trace.RegisterExporter(exporter)
	}

	server, err := InitializeServer(ctx, port)
	if err != nil {
		return err
	}
	go graceful(ctx, server, 5*time.Second)

	log.Printf("starting server")
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		return fmt.Errorf("cannot start server: %s", err)
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
