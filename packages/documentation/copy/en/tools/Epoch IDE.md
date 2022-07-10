---
title: Epoch IDE
layout: docs
permalink: /docs/handbook/epoch-ide
oneline: "Epoch IDE for Lingua Franca."
preamble: >
---

This page shows how to install and run the Epoch integrated development environment (IDE). Epoch is a standalone application based on Eclipse that provides a syntax-directed editor, compiler, and diagram synthesis tool for Lingua Franca programs.

## Download Epoch

Download the appropriate `epoch_ide_...` file for your platform from:

- [Version 0.2.1](https://github.com/lf-lang/lingua-franca/releases/tag/v0.2.1) (the most recent release)
- [Nightly build](https://github.com/lf-lang/lingua-franca/releases/tag/nightly) (the latest prerelease, unstable)

## Set Up Epoch in MacOS

The downloaded file is a compressed tarball. Open it to get an `epoch.app` item that you can drag into your `Applications` folder.

**First**: Currently, the Epoch IDE is not signed, and macOS will report it as "damaged" if you try to invoke it immediately. You can work around this by opening a terminal and running the following command:

```sh
xattr -cr epoch.app
```

**Second**: By default, the Lingua Franca compiler uses `cmake` to compile the programs it generates. This is not installed by default on macOS systems. To install `cmake` using `brew`, just do this:

```sh
brew install cmake
```

Verify that cmake is in your path by typing `which cmake`.

**Third**: We recommend also starting Epoch from the command line because then it will inherit your `PATH` variable (If you start it by double clicking on the icon, as usual in macOS, it will not find `cmake` and will be unable to build LF programs). To do this, in a terminal window:

```sh
open epoch.app
```

If you instead start Epoch by double clicking on its icon, then when you compile Lingua Franca programs, you may get unexpected results or unexpected failures because Epoch fails to find required programs (e.g., your python runtime system or a compiler) or finds a different version from what `lfc` will find.

**Fourth**: By default, Epoch is set to "Build Automatically" in the Project menu. This means that the LF code generator and compiler will be invoked every time you change a file and whenever you open a new project (on all files in the project). Many people prefer to turn this feature off and invoke the code generator by hand by clicking on the gear icon at the upper left.

## Set Up Epoch in Linux

**First**: Uncompress the download (shown assuming the 0.2.1 version):

```sh
tar xvf epoch_ide_0.2.1-linux.gtk.x86_64.tar.gz
```

**Second**: Find and execute the IDE:

```sh
cd epoch_ide_0.2.1-linux.gtk.x86_64
./epoch
```

You can move this executable to a more convenient place, ideally somewhere in your `PATH`.

## Set Up Epoch in Windows

**First**: In a terminal,

```powershell
unzip epoch_ide_0.2.1-win32.win32.x86_64.zip
cd epoch_ide_0.2.1-win32.win32.x86_64
.\epoch
```
