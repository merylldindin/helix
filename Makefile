clean: ## Clean the project
	rm -rf .nuxt/ .output/ dist dist/ node_modules/

setup: ## Install developper experience
	yarn setup

install: ## Install project dependencies
	yarn install

install-hard: ## Install project dependencies from scratch
	rm -rf node_modules/ yarn.lock
	yarn cache clean
	make install

start: ## Start the project
	yarn start

build: ## Build the project
	yarn build

serve: ## Serve the project
	yarn serve

unlighthouse: ## Run unlighthouse
	npx unlighthouse --site http://localhost:3000

deploy: ## Deploy the project
	poetry run sirtuin cloudfront-deploy .cloudfront -p personal

help: ## Description of the Makefile commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
