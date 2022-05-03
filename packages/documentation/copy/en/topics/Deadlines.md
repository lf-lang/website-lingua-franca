---
title: "Deadlines"
layout: docs
permalink: /docs/handbook/deadlines
oneline: "Deadlines in Lingua Franca."
preamble: >
---

$page-showing-target$

Lingua Franca includes a notion of a **deadline**, which is a constraint on the relation between logical time and physical time. Specifically, a program may specify that the invocation of a reaction must occur within some _physical_ time interval of the _logical_ time of the message. If a reaction is invoked at logical time 12 noon, for example, and the reaction has a deadline of one hour, then the reaction is required to be invoked before the physical-time clock of the execution platform reaches 1 PM. If the deadline is violated, then the specified deadline handler is invoked instead of the reaction. For example:

$start(Deadline)$

```lf-c
target C;
reactor Deadline {
    input x:int;
    output d:int; // Produced if the deadline is violated.
    reaction(x) -> d {=
        printf("Normal reaction.\n");
    =} deadline(10 msec) {=
        printf("Deadline violation detected.\n");
        lf_set(d, x->value);
    =}
}

```

```lf-cpp
target Cpp;

reactor Deadline {
    input x:int;
    output d:int; // Produced if the deadline is violated.
    reaction(x) -> d {=
        std::cout << "Normal reaction." << std::endl;
    =} deadline(10ms) {=
        std::cout << "Deadline violation detected." << std::endl;
        d.set(*x.get());
    =}
}

```

```lf-py
target Python;
reactor Deadline {
    input x;
    output d; // Produced if the deadline is violated.
    reaction(x) -> d {=
        print("Normal reaction.")
    =} deadline(10 msec) {=
        print("Deadline violation detected.")
        d.set(x.value)
    =}
}
```

```lf-ts
target TypeScript
reactor Deadline {
    input x:number
    output d:number // Produced if the deadline is violated.
    reaction(x) -> d {=
        console.log("Normal reaction.")
    =} deadline(10 msec) {=
        console.log("Deadline violation detected.")
        d = x
    =}
}

```

```lf-rs
WARNING: No source file found: ../code/rs/src/Deadline.lf
```

$end(Deadline)$

This reactor specifies a deadline of 10 milliseconds (this can be a parameter of the reactor). If the reaction to `x` is triggered later in physical time than 10 msec past the timestamp of `x`, then the second body of code is executed instead of the first. That second body of code has access to anything the first body of code has access to, including the input `x` and the output `d`. The output can be used to notify the rest of the system that a deadline violation occurred. This reactor can be tested as follows:

$start(DeadlineTest)$

```lf-c
target C;
import Deadline from "Deadline.lf";
main reactor {
    logical action a;
    d = new Deadline();
    reaction(startup) -> d.x, a {=
        lf_set(d.x, 0);
        lf_schedule(a, 0);
    =}
    reaction(a) -> d.x {=
        lf_set(d.x, 0);
        lf_nanosleep(MSEC(20));
    =}
    reaction(d.d) {=
        printf("Deadline reactor produced an output.\n");
    =}
}

```

```lf-cpp
target Cpp;
import Deadline from "Deadline.lf";

main reactor {
    logical action a;
    d = new Deadline();
    reaction(startup) -> d.x, a {=
        d.x.set(0);
        a.schedule(0ms);
    =}

    reaction(a) -> d.x {=
        d.x.set(0);
        std::this_thread::sleep_for(20ms);
    =}

    reaction(d.d) {=
        std::cout << "Deadline reactor produced an output." << std::endl;
    =}
}

```

```lf-py
target Python;
import Deadline from "Deadline.lf";
preamble {= import time =}
main reactor {
    logical action a;
    d = new Deadline();
    reaction(startup) -> d.x, a {=
        d.x.set(0)
        a.schedule(0)
    =}
    reaction(a) -> d.x {=
        d.x.set(0)
        time.sleep(0.02)
    =}
    reaction(d.d) {=
        print("Deadline reactor produced an output.")
    =}
}
```

```lf-ts
target TypeScript
import Deadline from "Deadline.lf"
main reactor {
    logical action a
    d = new Deadline()
    reaction(startup) -> d.x, a {=
        d.x = 0
        actions.a.schedule(TimeValue.zero(), null)
    =}
    reaction(a) -> d.x {=
        d.x = 0
        for (const later = util.getCurrentPhysicalTime().add(TimeValue.msecs(20));
            util.getCurrentPhysicalTime() < later;) {
            // Take time...
        }
    =}
    reaction(d.d) {=
        console.log("Deadline reactor produced an output.")
    =}
}

```

```lf-rs
WARNING: No source file found: ../code/rs/src/DeadlineTest.lf
```

$end(DeadlineTest)$

<img alt="Lingua Franca diagram" src="./img/diagrams/DeadlineTest.svg" width="500"/>

Running this program will result in the following output:

```
Normal reaction.
Deadline violation detected.
Deadline reactor produced an output.
```

The first reaction of the `Deadline` reactor does not violate the deadline, but the second does. Notice that the sleep in the $main$ reactor occurs _after_ setting the output, but because of the deterministic semantics of LF, this does not matter. The actual value of an output cannot be known until every reaction that sets that output _completes_ its execution. Since this reaction takes at least 20 msec to complete, the deadline is assured of being violated.

Notice that the deadline is annotated in the diagram with a small clock symbol.
