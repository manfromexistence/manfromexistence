# manfromexistence 👋

<!-- ```
git add . && git commit -m "feat: this is a automated commit made by manfromexitence from manfromexsitence02 account" && git push
``` -->

<div align="center">
  <img hight="300" width="100%" alt="manfromexistence" align="center" src="./inventory/manfromexistence.gif">
</div>

# Dillinger
## _The Last Markdown Editor, Ever_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>


# Welcome to [Vrite](https://vrite.io)!

![Vrite landing page](https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png)

Vrite is an [open-source](https://github.com/vriteio/vrite), collaborative, **developer content platform** for creating, managing, and deploying product documentation, knowledge bases, and technical blogs.

With an extensible, collaborative editor, content management dashboard, and built-in features like semantic search, GitHub sync, and more — all accessible via [powerful API](https://docs.vrite.io/api/authentication) — Vrite aims to provide an all-in-one experience for creating, managing, and publishing all kinds of technical content.

## Get to Know Vrite editor

> Most options can be enabled/disabled in the settings (_Settings → Editor_) to tailor your experience.

1. Various formatting options

- **Bold** — `**markdown**` — `Ctrl B`/`⌘B`;
- _Italic_ — `*markdown*` — `Ctrl I`/`⌘I`;
- ~~Strikethrough~~ — `~~markdown~~` — `Ctrl Shift X`/`⌘ Shift X`;
- `Inline code` — `markdown` — `Ctrl E`/`⌘E`;
- Highlight — `==markdown==` — `Ctrl Shift H`/`⌘ Shift H`;
- Underline — `Ctrl U`/`⌘U`;
- Superscript — `Ctrl ,`/`⌘,`;
- Subscript — `Ctrl .`/`⌘.`;
- [Link](https://vrite.io/) — `[markdown](link)` — you can also `Ctrl V`/`⌘V` the URL to link the selected text fragment;

  > **Tip**: Move you **inside a link** to see its preview!

- Integrated [Monaco Editor](https://microsoft.github.io/monaco-editor/) and [Prettier](https://prettier.io/) for code blocks:

```javascript
const sayHello = () => {
  console.log("Hello World!");
};

sayHello();
```

3. Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1A  | Cell 1B  | Cell 1C  |
| Cell 2A  | Cell 2B  | Cell 2C  |
| Cell 3A  | Cell 3B  | Cell 3C  |

3. Images

![Vrite landing page](https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png) 4. Custom elements

Hello World from inside the `element`. 5. Other features

- Built-in, interactive embeds ([CodePen](https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png), [CodeSandbox](https://codesandbox.io/), YouTube)
- Zen mode (in the toolbar, top-right corner);
- MDX, MD, HTML, and JSON exports (easy to copy-paste);
- Stats (in the bottom menu, bottom-right corner)
- Real-time collaboration & commenting (select some text to add a comment)
- …

Full usage guide here: [https://docs.vrite.io/content-editor](https://docs.vrite.io/content-editor)

## Content Management in Vrite

Vrite provides multiple ways for you to manage your content.

### Vrite dashboard

The [dashboard](https://app.vrite.io/) is focused solely on content management. Here you can organize your content and edit metadata using one of two views:

1. **Kanban** — great for working in teams and managing complex content production process

![Vrite dashboard - kanban view](https://assets.vrite.io/65017ed7b0e627e259623b8a/FoiCt-qOuTEahp4qKJiIH.png) 2. **Table** — optimized for viewing all kinds of metadata at a glance

![Vrite dashboard - table view](https://assets.vrite.io/65017ed7b0e627e259623b8a/KAts4bTozSr7mKaZ0nTca.png)

### Explorer

Aside from the dashboard, Vrite provides an **Explorer** panel, easily accessible on the right of both the dashboard and the editor.

Explorer is your go-to when writing/managing “nested” content like **documentation**. Select a content group to view its contents in the dashboard or a content piece to open it immediately in the editor.

![Vrite explorer panel](https://assets.vrite.io/65017ed7b0e627e259623b8a/XgzCLAMTGTNPl_Sk0Nnw6.png)

## Many Other Features

Check out the following resources to learn more:

- 🌟 **Star Vrite on GitHub** — [https://github.com/vriteio/vrite](https://github.com/vriteio/vrite)
- 🐞 **Report bugs** — [https://github.com/vriteio/vrite/issues](https://github.com/vriteio/vrite/issues)
- 🐦 **Follow on Twitter** — [https://twitter.com/vriteio](https://twitter.com/vriteio)
- 💬 **Join Vrite Discord** — [https://discord.gg/yYqDWyKnqE](https://discord.gg/yYqDWyKnqE)
- ℹ️ **Learn more about Vrite** — [https://vrite.io](https://vrite.io)
- 📕 **Vrite documentation** — [https://docs.vrite.io](https://docs.vrite.io)

  GDFG

- [ ] GHFH
- [ ] HFH

---


<h1>Welcome to <a href="https://vrite.io">Vrite</a>!</h1>
<img
  src="https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png"
  alt="Vrite landing page"
/>
<p>
  Vrite is an <a href="https://github.com/vriteio/vrite">open-source</a>,
  collaborative, <strong>developer content platform</strong> for creating,
  managing, and deploying product documentation, knowledge bases, and technical
  blogs.
</p>
<p>
  With an extensible, collaborative editor, content management dashboard, and
  built-in features like semantic search, GitHub sync, and more — all accessible
  via <a href="https://docs.vrite.io/api/authentication">powerful API</a> —
  Vrite aims to provide an all-in-one experience for creating, managing, and
  publishing all kinds of technical content.
</p>
<h2>Get to Know Vrite editor</h2>
<blockquote>
  <p>
    Most options can be enabled/disabled in the settings (<em
      >Settings → Editor</em
    >) to tailor your experience.
  </p>
</blockquote>
<ol start="1">
  <li><p>Various formatting options</p></li>
</ol>
<ul>
  <li>
    <p>
      <strong>Bold</strong> — <code>**markdown**</code> —
      <code>Ctrl B</code>/<code>⌘B</code>;
    </p>
  </li>
  <li>
    <p>
      <em>Italic</em> — <code>*markdown*</code> —
      <code>Ctrl I</code>/<code>⌘I</code>;
    </p>
  </li>
  <li>
    <p>
      <s>Strikethrough</s> — <code>~~markdown~~</code> —
      <code>Ctrl Shift X</code>/<code>⌘ Shift X</code>;
    </p>
  </li>
  <li>
    <p>
      <code>Inline code</code> — <code>markdown</code> —
      <code>Ctrl E</code>/<code>⌘E</code>;
    </p>
  </li>
  <li>
    <p>
      <mark>Highlight</mark> — <code>==markdown==</code> —
      <code>Ctrl Shift H</code>/<code>⌘ Shift H</code>;
    </p>
  </li>
  <li>
    <p>Underline — <code>Ctrl U</code>/<code>⌘U</code>;</p>
  </li>
  <li>
    <p><sub>Superscript</sub> — <code>Ctrl ,</code>/<code>⌘,</code>;</p>
  </li>
  <li>
    <p><sup>Subscript</sup> — <code>Ctrl .</code>/<code>⌘.</code>;</p>
  </li>
  <li>
    <p>
      <a href="https://vrite.io/">Link</a> — <code>[markdown](link)</code> — you
      can also <code>Ctrl V</code>/<code>⌘V</code> the URL to link the selected
      text fragment;
    </p>
    <blockquote>
      <p>
        <strong>Tip</strong>: Move you <strong>inside a link</strong> to see its
        preview!
      </p>
    </blockquote>
  </li>
  <li>
    <p>
      Integrated
      <a href="https://microsoft.github.io/monaco-editor/">Monaco Editor</a> and
      <a href="https://prettier.io/">Prettier</a> for code blocks:
    </p>
  </li>
</ul>
<pre lang="javascript"><code>const sayHello = () =&gt; {
  console.log(&quot;Hello World!&quot;);
};

sayHello();</code></pre>
<ol start="3">
  <li><p>Tables</p></li>
</ol>
<table>
  <tr>
    <th><p>Header 1</p></th>
    <th><p>Header 2</p></th>
    <th><p>Header 3</p></th>
  </tr>
  <tr>
    <td><p>Cell 1A</p></td>
    <td><p>Cell 1B</p></td>
    <td><p>Cell 1C</p></td>
  </tr>
  <tr>
    <td><p>Cell 2A</p></td>
    <td><p>Cell 2B</p></td>
    <td><p>Cell 2C</p></td>
  </tr>
  <tr>
    <td><p>Cell 3A</p></td>
    <td><p>Cell 3B</p></td>
    <td><p>Cell 3C</p></td>
  </tr>
</table>
<ol start="3">
  <li><p>Images</p></li>
</ol>
<img
  src="https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png"
  alt="Vrite landing page"
/>
<ol start="4">
  <li><p>Custom elements</p></li>
</ol>
<div data-type="Element" data-props='{"myProp":1}'>
  <p>Hello World from inside the <code>element</code>.</p>
</div>
<ol start="5">
  <li><p>Other features</p></li>
</ol>
<ul>
  <li>
    <p>
      Built-in, interactive embeds (<a
        href="https://assets.vrite.io/65017ed7b0e627e259623b8a/-R7ZANANzebSVDyqVtB_K.png"
        >CodePen</a
      >, <a href="https://codesandbox.io/">CodeSandbox</a>, YouTube)
    </p>
  </li>
  <li><p>Zen mode (in the toolbar, top-right corner);</p></li>
  <li><p>MDX, MD, HTML, and JSON exports (easy to copy-paste);</p></li>
  <li><p>Stats (in the bottom menu, bottom-right corner)</p></li>
  <li>
    <p>
      Real-time collaboration & commenting (select some text to add a comment)
    </p>
  </li>
  <li><p>…</p></li>
</ul>
<p>
  Full usage guide here:
  <a href="https://docs.vrite.io/content-editor"
    >https://docs.vrite.io/content-editor</a
  >
</p>
<h2>Content Management in Vrite</h2>
<p>Vrite provides multiple ways for you to manage your content.</p>
<h3>Vrite dashboard</h3>
<p>
  The <a href="https://app.vrite.io/">dashboard</a> is focused solely on content
  management. Here you can organize your content and edit metadata using one of
  two views:
</p>
<ol start="1">
  <li>
    <p>
      <strong>Kanban</strong> — great for working in teams and managing complex
      content production process
    </p>
  </li>
</ol>
<img
  src="https://assets.vrite.io/65017ed7b0e627e259623b8a/FoiCt-qOuTEahp4qKJiIH.png"
  alt="Vrite dashboard - kanban view"
/>
<ol start="2">
  <li>
    <p>
      <strong>Table</strong> — optimized for viewing all kinds of metadata at a
      glance
    </p>
  </li>
</ol>
<img
  src="https://assets.vrite.io/65017ed7b0e627e259623b8a/KAts4bTozSr7mKaZ0nTca.png"
  alt="Vrite dashboard - table view"
/>
<h3>Explorer</h3>
<p>
  Aside from the dashboard, Vrite provides an <strong>Explorer</strong> panel,
  easily accessible on the right of both the dashboard and the editor.
</p>
<p>
  Explorer is your go-to when writing/managing “nested” content like
  <strong>documentation</strong>. Select a content group to view its contents in
  the dashboard or a content piece to open it immediately in the editor.
</p>
<img
  src="https://assets.vrite.io/65017ed7b0e627e259623b8a/XgzCLAMTGTNPl_Sk0Nnw6.png"
  alt="Vrite explorer panel"
/>
<h2>Many Other Features</h2>
<p>Check out the following resources to learn more:</p>
<ul>
  <li>
    <p>
      🌟 <strong>Star Vrite on GitHub</strong> —
      <a href="https://github.com/vriteio/vrite"
        >https://github.com/vriteio/vrite</a
      >
    </p>
  </li>
  <li>
    <p>
      🐞 <strong>Report bugs</strong> —
      <a href="https://github.com/vriteio/vrite/issues"
        >https://github.com/vriteio/vrite/issues</a
      >
    </p>
  </li>
  <li>
    <p>
      🐦 <strong>Follow on Twitter</strong> —
      <a href="https://twitter.com/vriteio">https://twitter.com/vriteio</a>
    </p>
  </li>
  <li>
    <p>
      💬 <strong>Join Vrite Discord</strong> —
      <a href="https://discord.gg/yYqDWyKnqE">https://discord.gg/yYqDWyKnqE</a>
    </p>
  </li>
  <li>
    <p>
      ℹ️ <strong>Learn more about Vrite</strong> —
      <a href="https://vrite.io">https://vrite.io</a>
    </p>
  </li>
  <li>
    <p>
      📕 <strong>Vrite documentation</strong> —
      <a href="https://docs.vrite.io">https://docs.vrite.io</a>
    </p>
  </li>
</ul>
<p></p>





<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inconsolata&weight=500&size=50&duration=4000&pause=300&color=A7A459&center=true&vCenter=true&multiline=true&repeat=false&random=false&width=1300&height=140&lines=Hello+there!;I+am+a+good+human+being+and+a+problem+solver+%E2%9C%A9" width="70%" />

```
      💼 No job @ POOR • Full-stack dev • All Platforms Engineer
      💻 Ai • Blockchain
      📖 Currently doing my own projects
      🎮 Music • Games • Anime • Code • Art
      🐾 Love all animals 🐰 • Love Cakes 🐤🐥
```
</div>

<div align="center">
  <img hight="300" width="100%" alt="GIF" align="center" src="./inventory/208593.gif">
</div>

# More about me 💬

### - I'm 18 years old Self-Taught Programmer plus Machine Learning & Artificial Intelligence Enthusiast from Bangladesh.

<img hight="400" width="500" alt="GIF" align="right" src="./inventory/1936.gif">

### - Learning :
- ✨ Data Structures & Algorithms
- ✨ Generative Adversarial Networks

### - Hobbies : 
- ✨ Gaming Addict
- ✨ Watching Anime
- ✨ Reading Light Novels
- ✨ Badminton (Neighbourhood Professional XD)

</br>

---

# Languages & Tools 👨‍💻
<p align="center">
  <img src="./inventory/icons/python.png" alt="python" width="120" hight="50">
  <img src="./inventory/icons/java.png" alt="java"  width="100" hight="50">
  <img src="./inventory/icons/ai.png" alt="AI" width="90" hight="50">
  <img src="./inventory/icons/bash.png" alt="bash" width="100" hight="50">
  <img src="./inventory/icons/datascience.png" alt="datascience" width="180" hight="50">
  </br>
  <img src="./inventory/icons/google_cloud_platform.png" alt="google_cloud_platform" width="270" hight="50">
  <img src="./inventory/icons/visualstudio_code.png" alt="visualstudio_code" width="240" hight="50">
  </br>
  <img src="./inventory/icons/pc.png" alt="pc" width="100" hight="50">
  <img src="./inventory/icons/edge.png" alt="edge" width="100" hight="50">
  <img src="./inventory/icons/playstation@3x.png" alt="playstation" width="150" hight="50">
</p>

```
🌞 Morning   6 commits    █████░░░░░░░░░░░░░░░░  24.2%
🌆 Daytime   5 commits    ███░░░░░░░░░░░░░░░░░░  14.5%
🌃 Evening   3 commits    ██████▎░░░░░░░░░░░░░░  29.9%
🌙 Night infinity commits ██████▌░░░░░░░░░░░░░░  31.4% 
``` 


# Things that I need to do ASAP
* Do this Github Profile
* Have to update my logo
* Have to updte current multeverse logo

### If you already not having then I am hoping for your:
<div align="center">
	<br>
		<img src="./inventory/good-times.svg" width="400px">
	<br>
</div>

### This is --> manfromexistence(Peace out + HACKING/SIGNING OUT + Sayonara)
<div align="center">
	<img src="./inventory/manfromexistence.jpg" width="100%">
</div>
