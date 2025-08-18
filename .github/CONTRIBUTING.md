# Contributing

Thank you for expressing interest in contributing source! Please read this file carefully!

## Table of contents
<!-- no toc -->
- [Suggesting changes](#suggesting-changes-to-the-standard)
- [Formatting your code](#Formatting-your-code)
- [Your commits](#commit-messages)

## Suggesting changes to the standard
This file is intended to set the standard which should be followed, however this does not mean it cannot be changed.

> [!NOTE]
> Changes to the contributing standard _do not_ mean we need to go back and change the entire commit history just so it's compliant with the new standard, it just means we use a different standard from that point on; The new standard will get merged into the codebase as we work on it.

### How to suggest changes?
Just send them to me, check out my [GitHub](https://www.github.com/hillthebingus) for my contact information!

Be sure to explain:
- Why these changes you're suggesting are necessary
- What do you expect from these changes
- How are they going to benefit everyone else

## Formatting your code
The formatting tool we use is [Prettier](https://prettier.io/docs/install), the config file for it can be found [here](../.prettierrc.yaml).

While running prettier and calling it a day is good enough most of the time, please keep in mind the following style considerations for the following languages:

### HTML

#### Avoid putting a large number of attributes in a single line.
Instead of:
```html
<div id="Mysupersigmadiv" class="wow i love classes" mandatorydeltarunereference="proceed" firstwe="mine" thenwe="craft" lets="minecraft">
```
Consider doing:
```html
<div 
	id="Mysupersigmadiv" 
	class="wow i love classes" 
	mandatorydeltarunereference="proceed" 
	firstwe="mine" 
	thenwe="craft" 
	lets="minecraft"
>
```

##### When & How
As a general rule of thumb, if there's any more than 3-4 attributes, put all of them in different lines. Always use your best judgement however, don't take this too literal.

#### Use "regions" to section your code. (applies to every other language as well)
This is the most optional consideration, as all it does is help me (@hillthebingus) manage the codebase, but if you find it too cumbersome, feel free to not do this.

Instead of:
```html
<nav class="navbar">
	<div class="navbar whatever">
		<p class="navtext first">
			This is text or something
		</p>
	</div>
	<div class="navbar whatever">
		<p class="navtext">
			This is text or something
		</p>
	</div>
	<div class="navbar whatever">
		<p class="navtext last">
			This is text or something
		</p>
	</div>
</nav>
```

Consider:
```html
<!-- Navigation Bar ¿reg -->
<nav class="navbar">
	<div class="navbar whatever">
		<p class="navtext first">
			This is text or something
		</p>
	</div>
	<div class="navbar whatever">
		<p class="navtext">
			This is text or something
		</p>
	</div>
	<div class="navbar whatever">
		<p class="navtext last">
			This is text or something
		</p>
	</div>
</nav>
<!-- ?reg -->
```

#### When & why?
Do it whenever there's a significant portion of the HTML file that isn't related to anything else around it, such as the navigation bar for example. Once again, just use your best judgement.

This is just because I'm a Vim user and i love foldmarkers, it allows me to keep the codebase manageable regardless of how it looks.

## Commit messages
A great tool to have is [CommitLint](https://commitlint.js.org/guides/local-setup.html), our config for it can be found [here](../.commitlintrc.yaml).

If you don't want to use it, just follow this convention:
```
type(scope[s, ...]?): subject
body?
footer?
```

#### Available types:
-  `core`: Changes to the core of LobsterProtect, the actual Site Blocker functionality (content scripts, service worker, etc.)
-  `ui`: Changes to the UI/UX, such as the options page or popup.
-  `feat`: Adds a new feature.
-  `fix`: Solves a bug.
-  `docs`: Adds or alters documentation.
-  `style`: Improves formatting.
-  `refactor`: Rewrites code without feature, performance or bug changes.
-  `perf`: Improves performance.
-  `revert`: Changes that revert other changes.

For `core` and `ui` it's always recommended you specify the scope(s).

> **Developer note**
> 
> ___Before you mention it, yes, i know all of my commits up to this point did not meet this standard, i know, i wasn't thinking back then okay i'm not gonna reword all 80 something commits twin😭___

### Thank you for expressing an interest in contributing ❤️
