default:
	npm install

.PHONY: clean
clean:
	rm -rf node_modules

node_modules:
	npm install

.PHONY: test
test:
	./node_modules/.bin/mocha --ui $(shell pwd)/index
