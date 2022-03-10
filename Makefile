# Makefile for preparing redis-doc to be processed by Hugo.
#
# Usage: REDIS_DOC=/home/to/my/work/redis-doc make

# Location of the redis-doc repo
REDIS_DOC ?= ../redis-doc
# Destination for output content
DEST = ./content/en
# Remove these files from the docs
REMOVE = LICENSE COPYRIGHT README.md wordlist

.PHONY: all
all: clean payload commands
	
.PHONY: payload
payload:
	mkdir -p $(DEST)
	cp -R $(REDIS_DOC)/* $(DEST)
	cd $(DEST) && rm $(REMOVE)

.PHONY: commands
commands:
	python3 build/process_commands.py "$(DEST)/$@/commands.json" "$(DEST)/$@"

.PHONY: theme
theme:
	cd themes/docsy && git submodule update -f --init --recursive

.PHONY: sources
sources:
	rm -rf /tmp/redis-doc
	git clone --depth 1 --single-branch --branch new-structure https://github.com/redis/redis-doc /tmp/redis-doc

.PHONY: prepare
prepare: REDIS_DOC = /tmp/redis-doc
prepare: theme sources all

.PHONY: netlify
netlify: REDIS_DOC = /tmp/redis-doc
netlify: theme sources all
	hugo --gc --minify

.PHONY: clean
clean:
	rm -rf $(DEST)/*

.PHONY: hugo
hugo:
	hugo server --disableFastRender
