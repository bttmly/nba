.PHONY: test coverage

test:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/unit ./test/integration

test-bail:
	./node_modules/.bin/mocha --bail --recursive --timeout 60000 ./test/unit ./test/integration

test-integration:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/integration

test-unit:
	./node_modules/.bin/mocha --recursive ./test/unit/

coverage:
	./node_modules/.bin/nyc ./node_modules/.bin/_mocha --timeout 60000 ./test/unit/ ./test/integration

lint:
	./node_modules/.bin/eslint ./src

update-players:
	node ./scripts/players.js

update-teams:
	node ./scripts/teams.js

preversion:
	@make update-players
	@make update-teams
	@make lint
	@make build
	# @make test
