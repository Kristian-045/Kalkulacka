.PHONY: all build pack clean test doc run profile help
repo=https://github.com/Kristian-045/Kalkulacka

all:
	-cd .. && npm i&& cd src/ && make profile

build:
	npm run webpack && npm run make

clean:
	cd ../ && find . -mindepth 1 -maxdepth 1 ! -name 'final' -exec rm -rf {} +

test:
	cd .. && npm run test

doc:
	cd .. && npm run generate-docs

run:
	cd .. && npm start

profile: profiling.js ../profiling/profiling.c
	gcc ../profiling/profiling.c -o ./profiling

pack: doc build
	cd ../ && mkdir -p final && cd final && mkdir -p install && cp -n ../src/install.sh ./install/ && cp -n ../src/uninstall.sh ./install/ && rm -r -f repo && mkdir -p repo && mkdir -p doc && cd repo && git clone $(repo) && cd ../ && mv -n ../docs/* doc/ && mv -n ../out/make/deb/x64/* ../final/install/

help:
	echo "Go to src/ and run 'make all' and then run 'make run'"
