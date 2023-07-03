clean: ## Clean the project
	yarn clean
	yarn prepare

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
	NUXT_ENVIRONMENT=production yarn build

serve: ## Serve the project
	yarn serve

deploy: ## Deploy the project
	aws s3 sync ./dist/_nuxt/ s3://meryll-us-east-1/_nuxt/ --cache-control 'max-age=31536000,public,immutable' --delete --profile personal --region us-east-1
	aws s3 sync ./dist/ s3://meryll-us-east-1/ --exclude '_nuxt/*' --cache-control 'max-age=0,public,must-revalidate' --delete --profile personal --region us-east-1
	poetry run sirtuin cloudfront-invalidate .cloudfront -p personal

invalidate-fonts: ## Invalidate fonts
	aws cloudfront create-invalidation --distribution-id E3SZTVEZV1G0WQ --paths '/fonts/*' --region eu-west-3 --profile personal

help: ## Description of the Makefile commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
