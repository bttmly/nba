.PHONY: test coverage

test:
	./node_modules/.bin/mocha --recursive --timeout 10000 --exit ./test/unit ./test/integration

test-bail:
	./node_modules/.bin/mocha --bail --recursive --timeout 10000 --exit ./test/unit ./test/integration

test-integration:
	./node_modules/.bin/mocha --recursive --timeout 10000 --exit ./test/integration

test-stats:
	./node_modules/.bin/mocha --timeout 10000 --exit ./test/integration/stats.js

test-data:
	./node_modules/.bin/mocha --timeout 60000 --exit --bail ./test/integration/data.js

test-synergy:
	./node_modules/.bin/mocha --timeout 10000 --exit --bail ./test/integration/synergy.js

test-unit:
	./node_modules/.bin/mocha --recursive ./test/unit/

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
