.PHONY: clean bump-version build build-release start start-server

clean:
	npm run clean

bump-version:
	npx grunt bump-version

build:
	npm run build

build-release:
	npm run build:release

start:
	npm run start

start-server:
	npm run start-server