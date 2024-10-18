# The `dot` Mini Game Engine

The `dot` engine is a simplified mini-game engine inspired by [crisp-game-lib](https://github.com/abagames/crisp-game-lib),
a delightful game engine developed by [ABA Games (Kenta Cho)](https://www.asahi-net.or.jp/~cs8k-cyu/).

## What is `dot`?

In many ways, `dot` is a spiritual adaptation of crisp-game-lib for MakeCode Arcade.
However, there are some key differences:
- Collision detection is implemented differently.
- The API uses a more structured approach with namespaces.
- It takes advantage of MakeCode Arcade features (fonts, images, sound).

Be sure to explore the amazing games created by Kenta Cho.

## How to Port a Game from `crisp-game-lib` to `dot`

Many simple yet fun mini-games have been implemented on `crisp-game-lib`,
making it a great resource for learning how these engines work. Here's how
to port a game from `crisp-game-lib` to `dot`:

1. Choose a `crisp-game-lib` game to port.
2. View source on the game's page.
3. Locate the `<head>` HTML element and expand it.
4. Find the link to `main.js` within the `<head>`.
5. Open `main.js` in a new tab.
6. Copy the entire `main.js` code to your clipboard.
7. Create a new MakeCode Arcade project, add the `dot` extension, switch to JavaScript, and paste the copied `main.js` code.
8. Adjust the API calls to match the `dot` engine's structure:
   - Add TypeScript types where needed. Let the compiler guide you.
   - Most function signature errors will occur due to differences in function locations or parameter changes.
   - For guidance, you can reference a game that has already been ported:
     - [SLIME STRETCHER](https://makecode.com/_a1YKT60M5WD5)

