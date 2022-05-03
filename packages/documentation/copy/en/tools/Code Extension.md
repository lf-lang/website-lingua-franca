---
title: Code Extension
layout: docs
permalink: /docs/handbook/code-extension
oneline: "Visual Studio Code Extension for Lingua Franca."
preamble: >
---

This page shows how to install and use the Lingua Franca Visual Studio Code extension.

## Download the Visual Studio Code Extension

This plugin is available from the [VSCode
Marketplace](https://marketplace.visualstudio.com/items?itemName=lf-lang.vscode-lingua-franca)/[Open VSX Registry](https://open-vsx.org/extension/lf-lang/vscode-lingua-franca).

To install this extension from the marketplace, launch VS Code Quick Open (<kbd>Ctrl</kbd> + <kbd>P</kbd>) and enter `ext install lf-lang.vscode-lingua-franca`.

## Using the Visual Studio Code Extension

- Show the diagram for the currently active Lingua Franca file by clicking on the diagrams icon at the upper right:
  <img src="./img/vs_code/diagrams_icon.png" class="icon">
- Compile the `.lf` file by entering <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, then `Lingua Franca: Build`.
- Run the `.lf` file by entering <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, then `Lingua Franca: Build and Run`.
- (Optional) Users who edit LF programs with a Python target will benefit the most from Python
  linting by installing Pylint 2.12.2 or later.
