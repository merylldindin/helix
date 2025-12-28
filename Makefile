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

deploy: ## Deploy the project
	@uv run sirtuin cloudfront-deploy .cloudfront -p personal

invalidate-fonts: ## Invalidate fonts
	@aws cloudfront create-invalidation --distribution-id E3SZTVEZV1G0WQ --paths '/fonts/*' --region eu-west-3 --profile personal

help: ## Description of the Makefile commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
