---
title: "Causality Loops"
layout: docs
permalink: /docs/handbook/causality-loops
oneline: "Causality loops in Lingua Franca."
preamble: >
---

## Cycles

The interconnection pattern for a collection of reactors can form a cycle, but some care is required. Consider the following example:

$start(Cycle)$

```lf-c
target C;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}
```

```lf-cpp
target Cpp;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}

```

```lf-py
target Python;
reactor A {
    input x;
    output y;
    reaction(x) -> y {=
        # ... something here ...
    =}
}
reactor B {
    input x;
    output y;
    reaction(x) {=
        # ... something here ...
    =}
    reaction(startup) -> y {=
        # ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}
```

```lf-ts
target TypeScript
reactor A {
    input x:number
    output y:number
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:number
    output y:number
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A()
    b = new B()
    a.y -> b.x
    b.y -> a.x
}

```

```lf-rs
target Rust;
reactor A {
    input x:u32;
    output y:u32;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:u32;
    output y:u32;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}

```

$end(Cycle)$

This program yields the following diagram:

<img alt="Lingua Franca diagram" src="./img/diagrams/Cycle.svg" width="400"/>

The diagram highlights a **causality loop** in the program. At each tag, in reactor `B`, the first reaction has to execute before the second if it is enabled, a precedence indicated with the red dashed arrow. But the first can't execute until the reaction of `A` has executed, and that reaction cannot execute until the second reaction `B` has executed. There is no way to satisfy these requirements, so the tools refuse to generated code.

## Cycles with Delays

One way to break the causality loop and get an executable program is to introduce a [logical delay](/docs/handbook/composing-reactors#connections-with-logical-delays) into the loop, as shown below:

$start(CycleWithDelay)$

```lf-c
target C;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x after 0;
    b.y -> a.x;
}
```

```lf-cpp
target Cpp;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x after 0;
    b.y -> a.x;
}

```

```lf-py
target Python;
reactor A {
    input x;
    output y;
    reaction(x) -> y {=
        # ... something here ...
    =}
}
reactor B {
    input x;
    output y;
    reaction(x) {=
        # ... something here ...
    =}
    reaction(startup) -> y {=
        # ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x after 0;
    b.y -> a.x;
}
```

```lf-ts
target TypeScript
reactor A {
    input x:number
    output y:number
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:number
    output y:number
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A()
    b = new B()
    a.y -> b.x after 0
    b.y -> a.x
}

```

```lf-rs
target Rust;
reactor A {
    input x:u32;
    output y:u32;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:u32;
    output y:u32;
    reaction(x) {=
        // ... something here ...
    =}
    reaction(startup) -> y {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x after 0;
    b.y -> a.x;
}
```

$end(CycleWithDelay)$

<img alt="Lingua Franca diagram" src="./img/diagrams/CycleWithDelay.svg" width="400"/>

Here, we have used a delay of 0, which results in a delay of one [microstep](/docs/handbook/superdense-time). We could equally well have specified a positive time value.

## Reaction Order

Frequently, a program will have such cycles, but you don't want a logical delay in the loop. To get a cycle without logical delays, the reactions need to be reordered, as shown below:

$start(CycleReordered)$

```lf-c
target C;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(startup) -> y {=
        // ... something here ...
    =}
    reaction(x) {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}
```

```lf-cpp
target Cpp;
reactor A {
    input x:int;
    output y:int;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:int;
    output y:int;
    reaction(startup) -> y {=
        // ... something here ...
    =}
    reaction(x) {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}

```

```lf-py
target Python;
reactor A {
    input x;
    output y;
    reaction(x) -> y {=
        # ... something here ...
    =}
}
reactor B {
    input x;
    output y;
    reaction(startup) -> y {=
        # ... something here ...
    =}
    reaction(x) {=
        # ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}
```

```lf-ts
target TypeScript
reactor A {
    input x:number
    output y:number
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:number
    output y:number
    reaction(startup) -> y {=
        // ... something here ...
    =}
    reaction(x) {=
        // ... something here ...
    =}
}
main reactor {
    a = new A()
    b = new B()
    a.y -> b.x
    b.y -> a.x
}

```

```lf-rs
target Rust;
reactor A {
    input x:u32;
    output y:u32;
    reaction(x) -> y {=
        // ... something here ...
    =}
}
reactor B {
    input x:u32;
    output y:u32;
    reaction(startup) -> y {=
        // ... something here ...
    =}
    reaction(x) {=
        // ... something here ...
    =}
}
main reactor {
    a = new A();
    b = new B();
    a.y -> b.x;
    b.y -> a.x;
}
```

$end(CycleReordered)$

<img alt="Lingua Franca diagram" src="./img/diagrams/CycleReordered.svg" width="400"/>

There is no longer any causality loop.
