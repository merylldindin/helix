.PHONY: clean clean-seo

SKILLS_DIR := skills

clean: clean-seo
	@echo "All outputs cleaned"

clean-seo:
	@find $(SKILLS_DIR)/seo/scripts/output -type f ! -name '.gitkeep' -delete 2>/dev/null || true
