.PHONY: clean bump-version build build-release start start-server

clean:
	deno task clean

bump-version:
	deno task bump-version

build:
	deno task build

build-release:
	deno task build:release

start:
	deno task start

start-server:
	deno task start-server
