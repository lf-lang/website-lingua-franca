---
title: Getting started on Linux 
layout: docs
permalink: /docs/handbook/getting-started-linux
oneline: "Quick start with Lingua Franca on Linux"
preamble: >
---

# Getting started on Linux

## Installation

### Debian & Other

Sadly there are currently no packaged version of the lingua-franca compiler in debian distributions so there is
really only the manual way. But we offer prebuild binaries [here](https://github.com/lf-lang/lingua-franca/releases). 
Please note that you need a modern version of java 17 or greater.

If you want to compile the lingua-franca compiler from scratch there is a [guide](/docs/handbook/download) for that. 
Alternatively you can use the prebuild lfc.

**Short instructions for downloading lfc**
```bash
    wget https://github.com/lf-lang/lingua-franca/releases/download/v0.2.0/lfc_0.2.0.tar.gz
    tar xf lfc_0.2.0.tar.gz
    export PATH="$(pwd)/lfc_0.2.0/bin/":$PATH // maybe add that to you bashrc/zshrc aliases
    lfc ./src/yourproject.lf
```

### Arch

There are packaged version of [lfc](https://aur.archlinux.org/packages/lfc-bin) and [epoch](https://aur.archlinux.org/packages/epoch-bin) the arch user repository.

```bash
    git clone https://aur.archlinux.org/packages/lfc-bin
    cd lfc-bin
    makepkg -si
```

### Nixos

For nixos users there is a already a package since the **nixos-22.05** release. Lingua-franca developes quite rapidly so the version packaged for nixpkgs may lack behind.

```
    nix-shell -p lingua-franca
    lfc ./src/youproject.lf
```

If you want to use the cpp-target and are using nix there is already great tooling built for this [here](https://github.com/lf-lang/reactor-cpp/blob/master/CONTRIBUTING.md).

## Development

### Vim

There is an simple Vim syntax highlighting [plugin](https://github.com/lf-lang/lingua-franca.vim).
This vim plugin can also be found inside the nixpkgs (`vimPlugins.lingua-franca-vim`).

### Integrated Development Environments

Lingua-Franca has integration's into two big ides [epoch](/docs/handbook/epoch-ide)(modified version of eclipse) or a [vs-code plugin](/docs/handbook/code-extension). 







