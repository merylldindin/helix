clean: ## Clean the project
	yarn clean
	yarn prepare

setup: ## Install developer experience
	yarn setup
	uv sync --group devops

install: ## Install project dependencies
	@yarn install

install-hard: ## Install project dependencies from scratch
	rm -rf .venv/
	uv lock
	rm -rf node_modules/ yarn.lock
	yarn cache clean
	make install

start: ## Start the project
	@yarn start

build: ## Build the project
	@NUXT_ENVIRONMENT=production yarn build

serve: ## Serve the project
	@yarn serve

check: ## Run all linters and type checks
	@yarn checks

types: ## Type check the project
	@yarn types

lint: ## Lint the project
	@yarn eslint

lint-fix: ## Lint and fix the project
	@yarn eslint:fix

test: ## Run unit tests
	@yarn test

test-watch: ## Run unit tests in watch mode
	@yarn test:watch

coverage: ## Run unit tests with coverage
	@yarn coverage

e2e: ## Run end-to-end tests
	@yarn e2e

deploy: ## Deploy the project
	@uv run --group devops sirtuin cloudfront-deploy .cloudfront -p personal

invalidate-fonts: ## Invalidate fonts
	@aws cloudfront create-invalidation --distribution-id E3SZTVEZV1G0WQ --paths '/fonts/*' --region eu-west-3 --profile personal

help: ## Description of the Makefile commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
