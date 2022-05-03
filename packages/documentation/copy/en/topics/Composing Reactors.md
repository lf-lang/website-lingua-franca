---
title: "Composing Reactors"
layout: docs
permalink: /docs/handbook/composing-reactors
oneline: "Composing reactors in Lingua Franca."
preamble: >
---

$page-showing-target$

## Contained Reactors

Reactors can contain instances of other reactors defined in the same file or in an imported file. Assume the `Count` and `Scale` reactors defined in [Parameters and State Variables](/docs/handbook/parameters-and-state-variables) are stored in files `Count.lf` and `Scale.lf`, respectively,
and that the `TestCount` reactor from [Time and Timers](/docs/handbook/time-and-timers) is stored in `TestCount.lf`. Then the following program composes one instance of each of the three:

$start(RegressionTest)$

```lf-c
target C {
    timeout: 1 sec,
    fast: true
}
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

main reactor RegressionTest {
    c = new Count();
    s = new Scale(factor = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> s.x;
    s.y -> t.x;
}
```

```lf-cpp
target Cpp {
    timeout: 1 sec,
    fast: true
}

import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

main reactor RegressionTest {
    c = new Count();
    s = new Scale(factor = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> s.x;
    s.y -> t.x;
}

```

```lf-py
target Python {
    timeout: 1 sec,
    fast: true
}
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

main reactor RegressionTest {
    c = new Count();
    s = new Scale(factor = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> s.x;
    s.y -> t.x;
}
```

```lf-ts
target TypeScript {
    timeout: 1 sec,
    fast: true
}
import Count from "Count.lf"
import Scale from "Scale.lf"
import TestCount from "TestCount.lf"

main reactor RegressionTest {
    c = new Count()
    s = new Scale(factor = 4)
    t = new TestCount(stride = 4, numInputs = 11)
    c.y -> s.x
    s.y -> t.x
}

```

```lf-rs
target Rust {
    timeout: 1 sec,
    fast: true
}
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

main reactor RegressionTest {
    c = new Count();
    s = new Scale(factor = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> s.x;
    s.y -> t.x;
}
```

$end(RegressionTest)$

## Diagrams

As soon as programs consist of more than one reactor, it becomes particularly useful to reference the diagrams that are automatically created and displayed by the Lingua Franca IDEs. The diagram for the above program is as follows:

<img alt="Lingua Franca diagram" src="./img/diagrams/RegressionTest.svg" width="500"/>

In this diagram, the timer is represented by a clock-like icon, the reactions by chevron shapes, and the $shutdown$ event by a diamond. If there were a $startup$ event in this program, it would appear as a circle.

## Creating Reactor Instances

An instance is created with the syntax:

```lf
    <instance_name> = new <class_name>(<parameters>)
```

A bank with several instances can be created in one such statement, as explained in the [banks of reactors documentation](/docs/handbook/multiports-and-banks#banks-of-reactors).

The `<parameters>` argument is a comma-separated list of assignments:

```lf
    <parameter_name> = <value>, ...
```

Like the default value for parameters, `<value>` can be a numeric contant, a string enclosed in quotation marks, a time value such as `10 msec`, target-language code enclosed in `{= ... =}`, or any of the list forms described in [Expressions](/docs/handbook/expressions).

## Connections

Connections between ports are specified with the syntax:

```lf
    <source_port_reference> -> <destination_port_reference>
```

where the port references are either `<instance_name>.<port_name>` or just `<port_name>`, where the latter form is used for connections that cross hierarchical boundaries, as illustrated in the next section.

On the left and right of a connection statement, you can put a comma-separated list. For example, the above pair of connections can be written,

```lf
    c.y, s.y -> s.x, t.x
```

The only constraint is that the total number of channels on the left match the total number on the right.

A destination port (on the right) can only be connected to a single source port (on the left). However, a source port may be connected to multiple destinations, as in the following example:

<div class="lf-py">

```lf
reactor A {
    output y
}
reactor B {
    input x
}
main reactor {
    a = new A()
    b1 = new B()
    b2 = new B()
    a.y -> b1.x
    a.y -> b2.x
}
```

</div>

<div class="lf-c lf-cpp lf-ts lf-rs">

```lf
reactor A {
    output y:int
}
reactor B {
    input x:int
}
main reactor {
    a = new A()
    b1 = new B()
    b2 = new B()
    a.y -> b1.x
    a.y -> b2.x
}
```

</div>

<img alt="Lingua Franca diagram" src="./img/diagrams/Multicast.svg" width="250"/>

Lingua Franca provides a convenient shortcut for such multicast connections, where the above two lines can be replaced by one as follows:

```lf
    (a.y)+ -> b1.x, b2.x
```

The enclosing `( ... )+` means to repeat the enclosed comma-separated list of sources however many times is needed to provide inputs to all the sinks on the right of the connection `->`.

## Import Statement

An import statement has the form:

```lf
    import <reactor class> as <alias2> from "<path>"
```

where `<reactor class>` and `<alias>` can be a comma-separated list to import multiple reactors from the same file. The `<path>` specifies another `.lf` file relative to the location of the current file. The `as <alias>` portion is optional and specifies alternative class names to use in the $new$ statements.

## Hierarchy

Reactors can be composed in arbitrarily deep hierarchies. For example, the following program combines the `Count` and `Scale` reactors within on `Container`:

$start(Hierarchy)$

```lf-c
target C;
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

reactor Container(stride:int(2)) {
    output y:int;
    c = new Count();
    s = new Scale(factor = stride);
    c.y -> s.x;
    s.y -> y;
}

main reactor Hierarchy {
    c = new Container(stride = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> t.x;
}
```

```lf-cpp
target Cpp;
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

reactor Container(stride:int(2)) {
    output y:int;
    c = new Count();
    s = new Scale(factor = stride);
    c.y -> s.x;
    s.y -> y;
}

main reactor Hierarchy {
    c = new Container(stride = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> t.x;
}

```

```lf-py
target Python;
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

reactor Container(stride(2)) {
    output y;
    c = new Count();
    s = new Scale(factor = stride);
    c.y -> s.x;
    s.y -> y;
}

main reactor Hierarchy {
    c = new Container(stride = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> t.x;
}
```

```lf-ts
target TypeScript
import Count from "Count.lf"
import Scale from "Scale.lf"
import TestCount from "TestCount.lf"

reactor Container(stride:number(2)) {
    output y:number
    c = new Count()
    s = new Scale(factor = stride)
    c.y -> s.x
    s.y -> y
}
main reactor Hierarchy {
    c = new Container(stride = 4)
    t = new TestCount(stride = 4, numInputs = 11)
    c.y -> t.x
}

```

```lf-rs
target Rust;
import Count from "Count.lf";
import Scale from "Scale.lf";
import TestCount from "TestCount.lf";

reactor Container(stride:u32(2)) {
    output y:u32;
    c = new Count();
    s = new Scale(factor = stride);
    c.y -> s.x;
    s.y -> y;
}

main reactor Hierarchy {
    c = new Container(stride = 4);
    t = new TestCount(stride = 4, num_inputs = 11);
    c.y -> t.x;
}
```

$end(Hierarchy)$

<img alt="Lingua Franca diagram" src="./img/diagrams/Hierarchy.svg" width="500"/>

The `Container` has a parameter named `stride`, whose value is passed to the `factor` parameter of the `Scale` reactor. The line

```lf
    s.y -> y;
```

establishes a connection across levels of the hierarchy. This propagates the output of a contained reactor to the output of the container. A similar notation may be used to propagate the input of a container to the input of a contained reactor,

```lf
    x -> s.x;
```

## Connections with Logical Delays

Connections may include a **logical delay** using the $after$ keyword, as follows:

```lf
    <source_port_reference> -> <destination_port_reference> after <time_value>
```

where `<time_value>` can be any of the forms described in [Expressions](/docs/handbook/expressions).

The $after$ keyword specifies that the logical time of the event delivered to the destination port will be larger than the logical time of the reaction that wrote to source port. The time value is required to be non-negative, but it can be zero, in which case the input event at the receiving end will be one [microstep](/docs/handbook/actions#superdense-time) later than the event that triggered it.

## Physical Connections

A subtle and rarely used variant of the `->` connection is a **physical connection**, denoted `~>`. For example:

```lf
main reactor {
    a = new A();
    b = new B();
    a.y ~> b.x;
}
```

This is rendered in by the diagram synthesizer as follows:

<img alt="Lingua Franca diagram" src="./img/diagrams/PhysicalConnection.svg" width="200"/>

In such a connection, the logical time at the recipient is derived from the local physical clock rather than being equal to the logical time at the sender. The physical time will always exceed the logical time of the sender (unless fast is set to `true`), so this type of connection incurs a nondeterministic positive logical time delay. Physical connections are useful sometimes in [Distributed-Execution](/docs/handbook/distributed-execution) in situations where the nondeterministic logical delay is tolerable. Such connections are more efficient because timestamps need not be transmitted and messages do not need to flow through through a centralized coordinator (if a centralized coordinator is being used).
