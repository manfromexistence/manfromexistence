## Sass Template

This is a template for the Sass markup language. You can use this template to test Sass or create projects that rely on Sass.

## How it works:

As this template needs to run in the browser, it does not use `node-sass` but instead uses the `sass.js` library which creates a service worker to compile `sass` to `css`.

1. This template uses jquery and looks for `<link>` tags with `rel="scss"`.
2. The `compileSCSS` function then converts the `.scss` files to pure `css` and appends it to the `<style id="css">` tag.