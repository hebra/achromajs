.PHONY: clean bump-version build build-release start start-server lint fmt check bundle build-achromajs build-achromafox build-achromeatic

clean:
	deno task clean

bump-version:
	deno task bump-version

build:
	deno task build

build-release:
	deno task build:release

build-achromajs:
	deno task build:achromajs

build-achromafox:
	deno task build:achromafox

build-achromeatic:
	deno task build:achromeatic

bundle:
	deno task bundle

start:
	deno task start

start-server:
	deno task start-server

lint:
	deno task lint

fmt:
	deno task fmt

check:
	deno task check
