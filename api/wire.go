//+build wireinject

package main

import (
	"github.com/aereal/smarate/api/web"
	"github.com/google/wire"
)

func InitializeWeb() (w *web.Web) {
	wire.Build(web.ProvideWeb)
	return
}
