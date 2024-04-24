.PHONY: all build pack dep clean test doc run profile help
repo=https://github.com/Kristian-045/Kalkulacka
final=xkaletk00_xdzurim00_xvlcekm00_xandrar00

NODE_VERSION := $(shell node --version 2>/dev/null | cut -d 'v' -f 2)

# Check if Node.js version meets the requirement
ifeq ($(findstring 20.,$(NODE_VERSION)),)
    # If Node.js is not installed or not version 20.x, print a message with the current version
    $(error Please install Node.js version 20.x, your current version is $(NODE_VERSION))
endif

all:
	sudo apt update -y
	sudo apt upgrade -y
	sudo apt install git -y
	sudo apt install curl -y
	sudo apt install gcc -y
	sudo apt install fakeroot -y
	npm i
	make profile
build:
	npm run webpack && npm run make

clean:
	cd ../ && find .  ! -name "$(final).zip" -exec rm -rf {} +

test:
	cd .. && npm run test

doc:
	cd .. && npm run generate-docs

run:
	cd .. && npm start

profile: ../profiling/profiling.c
	gcc ../profiling/profiling.c -o ./profiling

pack: doc build
	cd ../ && mkdir -p $(final) && cd $(final) && mkdir -p install && cp -n ../src/install.sh ./install/ && cp -n ../src/uninstall.sh ./install/ && rm -r -f repo && mkdir -p repo && mkdir -p doc && cd repo && git clone $(repo) && cd ../ && mv -n ../docs/* doc/ && mv -n ../out/make/deb/x64/* ../$(final)/install/ && cd .. && zip -r $(final).zip $(final) && rm -r -f $(final)

help:
	echo "Go to src/ and run 'make all' and then run 'make run'"
