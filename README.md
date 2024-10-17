# The `dot` mini game engine

This mini-game engine is based heavily upon [crisp-game-lib](https://github.com/abagames/crisp-game-lib),
the delightful little game engine by [ABA Games (Kenta Cho)](https://www.asahi-net.or.jp/~cs8k-cyu/).

## About `dot`

In most ways, `dot` is a spiritual port of crisp-game-lib to MakeCode Arcade,
though it differs in some significant ways. Those ways are:
* Collision detection works very differently.
* The API has a deeper structure with namespaces.
* Leverages Arcade features (fonts, images, sound).

Be sure to check out all the wonderful games created by Kenta Cho.

## Porting a game from `crisp-game-lib` to `dot`

1. Find the crisp-game-lib game you want to port.
2. Inspect/view source of the page.
3. Expand the `<head>` HTML element.
4. Find the script link to `main.js`.
5. Open `main.js` in a new tab.
6. Copy the entire main.js to the clipboard.
7. Create a new Arcade project, add the `dot` exension, switch to JavaScript, and paste the entirety of the main.js.
8. Fixup the API calls to match `dot`'s layout.
    * Most errors are due to a change in the function location and slightly different parameters.
    * In can be helpful to look at a game that's already been ported:
    * TODO: Link a game share here.
