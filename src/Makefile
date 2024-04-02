.PHONY: all build pack clean test doc run profile help

all:
	@cd .. && npm i && cd src/ && make profile

build:
	@echo "build" # TODO: Implement

pack:
	@echo "Pack" # TODO: Implement

clean:
	@echo "Clean" # TODO: Implement

test:
	@cd .. && npm run test

doc:
	@cd .. && npm run generate-docs

run:
	@cd .. && npm start

profile: profiling.js ../profiling/profiling.c
	gcc ../profiling/profiling.c -o ./profiling

help:
	@echo "Run 'npm install' and then run 'npm start'"
