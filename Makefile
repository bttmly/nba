.PHONY: test

build-browser-test:
	./node_modules/.bin/browserify ./test/integration/stats.js -t babelify -o ./test/browser/stats-browserified.js
	./node_modules/.bin/browserify ./test/integration/sport-vu.js -t babelify -o ./test/browser/sport-vu-browserified.js

browser-test:
	@make build-browser-test
	node -e 'require("openurl").open("http://localhost:8080/test/browser")'
	./node_modules/.bin/static

test:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/setup.js ./test/unit ./test/integration

test-integration:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/setup.js ./test/integration

test-unit:
	./node_modules/.bin/mocha --recursive ./test/setup.js ./test/unit/

coverage:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --recursive ./test/setup.js ./test/unit/

lint:
	./node_modules/.bin/eslint ./src

build:
	rm -rf ./lib
	./node_modules/.bin/babel src --out-dir lib --stage 0

update-players:
	./node_modules/.bin/babel-node ./scripts/players.js

update-teams:
	./node_modules/.bin/babel-node ./scripts/teams.js

preversion:
	@make update-players
	@make update-teams
	@make lint
	@make test
	@make build
	exit 1

demo-movement:
	./node_modules/.bin/babel-node ./src/apis/movement/index.js
