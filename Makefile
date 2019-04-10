.PHONY: test coverage

test:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/setup.js ./test/unit ./test/integration

test-bail:
	./node_modules/.bin/mocha --bail --recursive --timeout 60000 ./test/setup.js ./test/unit ./test/integration

test-integration:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/setup.js ./test/integration

test-unit:
	./node_modules/.bin/mocha --recursive ./test/setup.js ./test/unit/

coverage:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --recursive --timeout 60000 ./test/setup.js ./test/unit/ ./test/integration

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
