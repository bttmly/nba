.PHONY: test

build-browser-test:
	./node_modules/.bin/browserify ./test/integration/stats.js -t babelify -o ./test/browser/stats.js
	./node_modules/.bin/browserify ./test/integration/sport-vu.js -t babelify -o ./test/browser/sport-vu.js

build:
	./node_modules/.bin/babel src --out-dir lib2 --stage 0

test:
	./node_modules/.bin/mocha --recursive --timeout 60000 ./test/setup.js ./test/integration ./test/unit