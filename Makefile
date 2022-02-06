# Makefile for preparing redis-doc to be processed by Hugo.
#
# Usage: REDIS_DOC=/home/to/my/work/redis-doc make

# Location of the redis-doc repo
REDIS_DOC ?= ../redis-doc
# Destination for output content
DEST = ./content/en
# List of files/directories that are just copied as is
GENERIC = _index.html search.md about clients community docs modules tools

.PHONY: all
all: $(GENERIC) commands
	
.PHONY: $(GENERIC)
$(GENERIC):
	mkdir -p $(DEST)
	cp -R "$(REDIS_DOC)/$@" "$(DEST)"

.PHONY: commands
commands:
	cp -R "$(REDIS_DOC)/$@" "$(DEST)/"
	python3 build/process_commands.py "$(DEST)/$@/commands.json" "$(DEST)/$@"
# convert notes/warnings to short codes
# ...

.PHONY: theme
theme:
	cd themes/docsy && git submodule update -f --init

.PHONY: sources
sources:
	rm -rf /tmp/redis-doc
	git clone --depth 1 --single-branch --branch new-structure https://github.com/redis/redis-doc /tmp/redis-doc

.PHONY: netlify
netlify: REDIS_DOC = /tmp/redis-doc
netlify: theme sources all
	hugo

.PHONY: clean
clean:
	rm -rf $(DEST)/*

.PHONY: hugo
hugo:
	hugo server --disableFastRender
