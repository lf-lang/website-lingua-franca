---
title: Tutorial Video
layout: docs
permalink: /docs/handbook/tutorial-video
oneline: "Tutorial video presented by the Lingua Franca team."
preamble: >
---

Lingua Franca (LF) is a polyglot coordination language for concurrent and possibly time-sensitive applications ranging from low-level embedded code to distributed cloud and edge applications. On Oct. 8, 2021, we offered a tutorial on Lingua Franca for the EMSOFT conference, a part of ESWEEK.
A [video playlist](https://youtube.com/playlist?list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o) recording is available in six segments, as detailed below.

**Useful links:**

- [Complete video playlist](https://youtube.com/playlist?list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o)
- [Part I: Introduction](#introduction)
- [Part II: Hello World](#hello)
- [Part III: Target Languages](#target)
- [Part IV: Basic Concepts](#concepts)
- [Part V: Concurrency and Performance](#concurrency)
- [Part VI: Research Overview](#research)
- [Slides](https://docs.google.com/presentation/d/14cfIMmkBFwt6NOj2ujVs7YXPAXYsoHgLS2rUgBM-Deg/present?slide=id.g623f095f12_0_0)

<a name="introduction"></a>

## Part I: Introduction

This part briefly describes the background of the project and explains how to get started with the software.

**Useful links:**

- [Complete video of part I](https://youtu.be/7vkhX5tS_oI)
- Individual parts of the video:
  <!--img style="float: right;" src="../../../../../img/tutorial/vm.png" width=50%-->

  | Contents                                                                                                                                     |
  | -------------------------------------------------------------------------------------------------------------------------------------------- |
  | [Introduction](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=0s)                             |
  | [Motivation](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=61s)                              |
  | [Overview of this tutorial](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=185s)              |
  | [History of the project](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=668s)                 |
  | [Participating](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=897s)                          |
  | [Getting started](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=925s)                        |
  | [Native releases (Epoch IDE and lfc)](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=1063s)   |
  | [Virtual Machine with LF pre-installed](https://www.youtube.com/watch?v=7vkhX5tS_oI&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=1&t=1311s) |

- [Virtual machine image](https://vm.lf-lang.org/): download the `Ubuntu-for-LF.ova` image and import into your favorite virtualization software (e.g., VirtualBox or VMWare Player). Start the VM and run Epoch IDE by clicking on the icon on the left.
- [Epoch IDE and lfc command-line compiler](https://releases.lf-lang.org/): Add `lfc` (and `epoch`) to your `$PATH` environment variable.
- [Requirements for each target language](https://reqs.lf-lang.org/): We use the C target in this tutorial.

<a name="hello"></a>

## Part II: Hello World

This part introduces the language with a simple example.

**Useful links:**

- [Complete video of part II](https://youtu.be/GNwaf4OpfPM)
- Individual parts of the video:
  | Contents|
  |-------------|
  | [Open Epoch and create a project](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=0s)|
  | [Hello World](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=104s)|
  | [Adding a timer](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=284s)|
  | [Adding a timeout target property](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=426s)|
  | [Adding state variables](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=470s) |
  | [Creating and connecting multiple reactors](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=635s) |
  | [Parameterized reactors](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=1020s) |
  | [LF tour recap](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=1102s) |
  | [Diagrams](https://www.youtube.com/watch?v=GNwaf4OpfPM&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=2&t=1157s) |

<a name="target"></a>

## Part III: Target Languages

This part focuses on the target languages other than C, namely C++, Python, TypeScript, and Rust.

**Useful links:**

- [Complete video of part III](https://youtu.be/0AteHXOHnto)
- Individual parts of the video:
  | Contents|
  |-------------|
  | [Introduction](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=0s) |
  | [Cpp](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=57s) |
  | [Python](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=650s) |
  | [Python Demo: Piano Synth](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=1270s) |
  | [TypeScript](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=1555s) |
  | [Rust](https://www.youtube.com/watch?v=0AteHXOHnto&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=3&t=2014s) |

<a name="concepts"></a>

## Part IV: Basic Concepts

This part focuses on basic concepts in the language and includes three demos.

**Useful links:**

- [Complete video of part IV](https://youtu.be/tl3F_jgc248)
- Individual parts of the video:
  | Contents|
  |-------------|
  | [Reflex game overview](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=0s) |
  | [Generating the prompts: Basic concepts](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=310s) |
  | [Program control of time: Logical action](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=435s) |
  | [Handling external events: Physical action](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=585s) |
  | [Cycle and causality loop](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=782s) |
  | [Reflex game in Python](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=963s) |
  | [The Rhythm example](https://www.youtube.com/watch?v=tl3F_jgc248&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=4&t=1155s) |

<a name="concurrency"></a>

## Part V: Concurrency

This part focuses on how the language expresses concurrency, exploits multicore, and supports distributed execution.

**Useful links:**

- [Complete video of part V](https://youtu.be/MoTf8L0jOD0)
- Individual parts of the video:
  | Contents|
  |-------------|
  | [Introduction](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=0s) |
  | [Banks and Multiports](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=39s) |
  | [Utilizing Multicore](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=569s) |
  | [Tracing](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=1069s) |
  | [Performance](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=1420s) |
  | [Federated Execution](https://www.youtube.com/watch?v=MoTf8L0jOD0&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=5&t=1765s) |

<a name="research"></a>

## Part VI: Research Overview

This part focuses on a few of the research projects that have been stimulated by the Lingua Franca project.

**Useful links:**

- [Complete video of part VI](https://youtu.be/GNwaf4OpfPM)
- Individual parts of the video:
  | Contents|
  |-------------|
  | [Introduction](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=0s) |
  | [AUTOSAR](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=375s) |
  | [Autoware/Carla](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=867s) |
  | [Bare Iron Platforms](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=1663s) |
  | [Modal Models](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=2076s) |
  | [Automated Verification](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=2432s) |
  | [Secure Federated Execution](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=2877s) |
  | [LF Language Server](https://www.youtube.com/watch?v=afJowM35YHg&list=PL4zzL7roKtfXyKE3k8lOwPub9YEjulS4o&index=6&t=3247s) |
