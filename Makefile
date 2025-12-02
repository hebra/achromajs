.PHONY: clean build build:release start start-server

clean:
	npm run clean

build:
	npm run build

build:release:
	npm run build:release

start:
	npm run start

start-server:
	npm run start-server