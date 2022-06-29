---
title: Downloading
layout: docs
permalink: /docs/handbook/download
oneline: "Quick start with Lingua Franca."
preamble: >
---

## Releases and Nightly Snapshots

To get started with Lingua Franca immediately, choose one or more of the following tools:

- [Visual Studio Code Extension](/docs/handbook/code-extension), a popular IDE from Microsoft.
- [Epoch IDE](/docs/handbook/epoch-ide), an Eclipse-based IDE specifically for Lingua Franca.
- [Command-line Tools](/docs/handbook/command-line-tools)
- [Vim and Neovim plugins](https://github.com/lf-lang/lingua-franca.vim)

The VS Code plugin gives you the latest **release** of the Lingua Franca tools, including the diagram synthesis.
If instead you want to use the **most recent development version** of Lingua Franca, then you will be given the option to download the Epoch IDE or the command-line tools from the nightly build. Just follow the above links.
The Vim plugin provides syntax-directed editing, but it does not include the diagram synthesis that is available with Epoch and Code.
The diagram synthesis is quite useful, so we recommend using Epoch or Code to develop LF programs.

## The Repository

If you plan to contribute to Lingua Franca, or if you want to keep up to date as the project evolves, you will need to work from the git repository on GitHub. There are several ways to do this:

1. [Oomph setup for Eclipse](/docs/handbook/eclipse-oomph) (This does not currently support Kotlin development, used in C++ and Rust code generators)
2. [IntelliJ setup](/docs/handbook/intellij-kotlin) (Recommended if you plan to do Kotlin development)
3. [Clone the Repository](https://github.com/lf-lang/lingua-franca) and build manually using Gradle or Maven:

   - Gradle: `./gradlew assemble` (the `build` also performs tests, which takes a long time)
   - Maven: `mvn compile` (you need to install Maven first)

Some of code generator components are written in Kotlin, which is not supported by Eclipse. If you want a Kotlin-friendly developer environment, we recommend using IntelliJ, as described [here](https://www.lf-lang.org/docs/handbook/intellij-kotlin). <!-- To build the Lingua Franca IDE (Epoch) with Kotlin-based code generators enabled (which is not possible with the Eclipse setup), please see the instructions in [[Running Lingua Franca IDE (Epoch) with Kotlin based Code Generators Enabled (without Eclipse Environment)]]. -->
