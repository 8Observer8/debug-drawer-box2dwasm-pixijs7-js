Buy me a coffee: https://boosty.to/ivan_8observer8/donate This service supports PayPal. You can perform single sign-on with your Google account.

[Live demo](https://8observer8.github.io/webgl10-js/debug-drawer-box2dwasm-pixijs7-js/)

Playgrounds:

- [Replit](https://replit.com/@8Observer8/Debug-drawer-using-Box2D-WASM-Pixijs-JS)
- [Plunker](https://plnkr.co/edit/SE3FHB6zjmqHcaAX?preview)
- [Glitch](https://glitch.com/edit/#!/billowy-earthy-seismosaurus)

Topic and discussions:

- [Pixi.js topic](https://www.html5gamedevs.com/topic/52752-basic-examples-of-using-box2d-wasm-with-pixijs-in-javascript/)
- [Pixi.js discussion](https://github.com/pixijs/pixijs/discussions/9585)
- [Box2D-WASM discussion](https://github.com/Birch-san/box2d-wasm/discussions/69)

![debug-drawer-box2dwasm-pixijs7-js](https://github.com/8Observer8/debug-drawer-box2dwasm-pixijs7-js/assets/3908473/1ce706ff-59db-4ce7-a8d0-328029176ba1)

Instruction for building and running the project in debug and release using Rollup:

- Install these packages globally with the command:

> npm i -g http-server rollup uglify-js

- Run http-server in the project directory:

> http-server -c-1

Note. The `-c-1` key allows you to disable caching.

- Start development mode with the following command:

> npm run dev

Note. Rollup will automatically keep track of saving changes to files and build a new index.js file ready for debugging. You can debug your project step by step in the browser by setting breakpoints.

- Go to the browser and type the address: localhost:8080/index.html

- Create a compressed file ready for publishing. Stop development mode, for example, with this command Ctrl + C in CMD, if it was launched before and enter the command:

> npm run release

Note. After this command, Rollup will create a compressed index.js file. Compression is done using the uglify-js package.
