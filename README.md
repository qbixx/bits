# [Bits](http://www.qbixx.nl)

Professional front-end framework to quick start ProcessWire theme development.

## Features

* OOCSS framework based on [Inuitcss](http://inuitcss.com)
* Based on SASS, Gulp, PostCSS
* Flexbox grid based on [Bulma](http://bulma.io)
* Ordered folder structure
* Livereload (through Gulp-connect)
* Media Queries mixin with [sass-mq](https://github.com/sass-mq/sass-mq)

## Install

To use Bits you'll need [node](https://nodejs.org/), [yarn](https://yarnpkg.com/), [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (global) and [sass](http://sass-lang.com/).

### Install a new project

You can download Bits and save it into your project’s `sites/` directory.

1. Download this repo with the "Download ZIP" folder on the right
2. Unzip to desired local folder
3. Open up the terminal
4. Go to choosen folder
	```
	$ cd ~/sites/new-project/sites/
	```
5. Install dependencies
	```
	$ yarn install
	```

### Start project
1. Open up the terminal
2. Run Gulp
	```
	$ gulp
	```
3. Go to your [localhost](http://localhost:3000)

## CSS directory structure

Bits follows a specific folder structure, which you should follow as well in your own CSS directory:

* `/settings`: Global variables, site-wide settings, config switches, etc.
* `/tools`: Site-wide mixins and functions.
* `/generic`: Low-specificity, far-reaching rulesets (e.g. resets).
* `/elements`: Unclassed HTML elements (e.g. `a {}`, `blockquote {}`, `address {}`).
* `/objects`: Objects, abstractions, and design patterns (e.g. `.o-layout {}`).
* `/components`: Discrete, complete chunks of UI (e.g. `.c-carousel {}`). This is the one layer that inuitcss doesn’t provide code for, as this is completely your terrain.
* `/utilities`: High-specificity, very explicit selectors. Overrides and helper
  classes (e.g. `.u-hidden {}`).

Following this structure allows you to intersperse Bits’ code with your own, so that your `main.scss` file might look something like this:

```scss
// SETTINGS
@import "settings/settings.config";
@import "../../../node_modules/inuitcss/settings/settings.core";
@import "settings/settings.global";
@import "settings/settings.colors";

// TOOLS
@import "../../../node_modules/inuitcss/tools/tools.font-size";
@import "../../../node_modules/inuitcss/tools/tools.clearfix";
@import "../../../node_modules/sass-mq/mq";
@import "tools/tools.aliases";

// GENERIC
@import "../../../node_modules/inuitcss/generic/generic.box-sizing";
@import "../../../node_modules/inuitcss/generic/generic.normalize";
@import "../../../node_modules/inuitcss/generic/generic.shared";

// ELEMENTS
@import "../../../node_modules/inuitcss/elements/elements.page";
@import "../../../node_modules/inuitcss/elements/elements.headings";
@import "elements/elements.links";
@import "elements/elements.quotes";

// OBJECTS
@import "../../../node_modules/inuitcss/objects/objects.layout";
@import "../../../node_modules/inuitcss/objects/objects.media";
@import "../../../node_modules/inuitcss/objects/objects.flag";
@import "../../../node_modules/inuitcss/objects/objects.list-bare";
@import "../../../node_modules/inuitcss/objects/objects.list-inline";
@import "../../../node_modules/inuitcss/objects/objects.box";
@import "../../../node_modules/inuitcss/objects/objects.block";
@import "../../../node_modules/inuitcss/objects/objects.tables";

// COMPONENTS
@import "components/components.buttons";
@import "components/components.page-head";
@import "components/components.page-foot";
@import "components/components.site-nav";
@import "components/components.ads";
@import "components/components.promo";

// UTILITIES
@import "../../../node_modules/inuitcss/utilities/utilities.widths";
@import "../../../node_modules/inuitcss/utilities/utilities.headings";
@import "../../../node_modules/inuitcss/utilities/utilities.spacing";
```

## Browser Support

Bits uses [autoprefixer](https://github.com/postcss/autoprefixer) to make (most) Flexbox features compatible with earlier browser versions. According to [Can I use](http://caniuse.com/#feat=flexbox), Bits is compatible with:

* Chrome
* Edge
* Firefox
* Internet Explorer (10+)
* Opera
* Safari
