---
title: Overview
layout: docs
permalink: /docs/handbook/overview
oneline: "Overview of Lingua Franca."
preamble: >
---

Lingua Franca (LF) is a polyglot coordination language for concurrent and possibly time-sensitive applications ranging from low-level embedded code to distributed cloud and edge applications. An LF program specifies the interactions between components called reactors. The emphasis of the framework is on ensuring deterministic interaction with explicit management of timing. The logic of each reactor is written in one of a suite of target languages (currently C, C++, Python, and TypeScript) and can integrate legacy code in those languages. A code generator synthesizes one or more programs in the target language, which are then compiled using standard toolchains. If the application has exploitable parallelism, then it executes transparently on multiple cores without compromising determinacy. A distributed application translates into multiple programs and scripts to launch those programs on distributed machines. The communication fabric connecting components is synthesized as part of the programs.

Lingua Franca programs are compositions of [reactors](#reactors), whose functionality is decomposed into reaction, which are written in the target languages. Reactors are similar to actors, software components that send each other messages, but unlike classical actors, messages are timestamped, and concurrent composition of reactors is deterministic by default. When nondeterministic interactions are tolerable or desired, they must be explicitly coded. LF itself is a polyglot composition language, not a complete programming language. LF describes the interfaces and composition of reactors. See our [publications and presentations](/publications-and-presentations) on reactors and Lingua Franca.

The language and compiler infrastructure is very much under development. An IDE based on Eclipse and Xtext is under development, and command-line tools are also provided. LF is, by design, extensible. To support a new target language, a code generator and a runtime system capable of coordinating the execution of a composition of reactors must be developed.

The C runtime consists of a few thousand lines of extensively commented code, occupies tens of kilobytes for a minimal application, and is extremely fast, making it suitable even for deeply embedded microcontroller platforms. It has been tested on Linux, Windows, and Mac platforms, as well as some bare-iron platforms. On POSIX-compliant platforms, it supports multithreaded execution, automatically exploiting multiple cores while preserving determinism. It includes features for real-time execution and is particularly well suited to take advantage of platforms with predictable execution times, such as [PRET machines](https://ptolemy.berkeley.edu/projects/chess/pret/). A distributed execution mechanism is under development that takes advantage of clock synchronization when that is available to achieve truly distributed coordination while maintaining determinism.

## Reactors

Reactors are informally described via the following principles:

1. _Components_ — Reactors can have input ports, actions, and timers, all of which are triggers. They can also have output ports, local state, parameters, and an ordered list of reactions.
2. _Composition_ — A reactor may contain other reactors and manage their connections. The connections define the flow of messages, and two reactors can be connected if they are contained by the same reactor or one is directly contained in the other (i.e., connections span at most one level of hierarchy). An output port may be connected to multiple input ports, but an input port can only be connected to a single output port.
3. _Events_ — Messages sent from one reactor to another, and timer and action events each have a timestamp, a value on a logical time line. These are timestamped events that can trigger reactions. Each port, timer, and action can have at most one such event at any logical time. An event may carry a value that will be passed as an argument to triggered reactions.
4. _Reactions_ — A reaction is a procedure in a target language that is invoked in response to a trigger event, and only in response to a trigger event. A reaction can read input ports, even those that do not trigger it, and can produce outputs, but it must declare all inputs that it may read and output ports to which it may write. All inputs that it reads and outputs that it produces bear the same timestamp as its triggering event. I.e., the reaction itself is logically instantaneous, so any output events it produces are logically simultaneous with the triggering event (the two events bear the same timestamp).
5. _Flow of Time_ — Successive invocations of any single reaction occur at strictly increasing logical times. Any messages that are not read by a reaction triggered at the timestamp of the message are lost.
6. _Mutual Exclusion_ — The execution of any two reactions of the same reactor are mutually exclusive (atomic with respect to one another). Moreover, any two reactions that are invoked at the same logical time are invoked in the order specified by the reactor definition. This avoids race conditions between reactions accessing the reactor state variables.
7. _Determinism_ — A Lingua Franca program is deterministic unless the programmer explicit uses nondeterministic constructs. Given the same input data, a composition of reactors has exactly one correct behavior. This makes Lingua Franca programs _testable_.
8. _Concurrency_ — Dependencies between reactions are explicitly declared in a Lingua Franca program, and reactions that are not dependent on one another can be executed in parallel on a multicore machine. If the target provides a distributed runtime, using [Ptides](https://ptolemy.berkeley.edu/projects/chess/ptides/) for example, then execution can also be distributed across networks.

## Time

Lingua Franca has a notion of logical time, where every message occurs at a logical instant and reactions to messages are logically instantaneous. At a logical time instant, each reactor [input](#input-declaration) will either have a message (the input is **present**) or will not (the input is **absent**). [Reactions](#reaction-declaration) belonging to the reactor may be **triggered** by a present input. Reactions may also be triggered by [timers](#timer-declaration) or [actions](#action-declaration). A reaction may produce [outputs](#output-declaration), in which case, inputs to which the output is **connected** will become present at the same logical time instant. Outputs, therefore, are **logically simultaneous** with the inputs that cause them. A reaction may also **schedule** [actions](#action-declaration) which will trigger reactions of the same reactor at a _later_ logical time.

In the C target,
a timestamp is an unsigned 64-bit integer which, on most platforms,
specifies the number of nanoseconds since January 1, 1970.
Since a 64-bit number has a limited range,
this measure of time instants will overflow in approximately the year 2554.
When an LF program starts executing, logical time is (normally) set to the current physical time provided by the operating system.
(On some embedded platforms without real-time clocks, it will be set instead to zero.)

At the starting logical time, reactions that specify a **startup** trigger will execute. Also, any reactions that are triggered by a timer with a zero offset will execute. Any outputs produced by these reactions will have the same logical time and will trigger execution of any downstream reactions. Those downstream reactions will be invoked at the same logical time unless some connection to the downstream reactor uses the **after** keyword to specify a time delay. After all reactions at the starting logical time have completed, then time will advance to the logical time of the earliest next event. The earliest next event may be specified by a timer, by an **after** keyword on a connection, or by a [logical or physical action](/docs/handbook/actions). Once logical time advances, any reactions that are triggered by events at that logical will be invoked, as will any reactions triggered by outputs produced by those reactions.

Time in Lingua Franca is actually [superdense time](https://ptolemy.berkeley.edu/publications/papers/05/OperationalSemantics/), meaning that a logical time may have the same numerical value but also be _strictly later_ than another logical time. When an [action](#action-declaration) is scheduled with a delay of zero, it occurs at such a strictly later time, one **microstep** later. See the [actions description](/docs/handbook/actions). The **after** keyword with a time delay of 0 (zero) will also cause the downstream reactions to execute in the next microstep.

At any logical time, if any two reactions belonging to the same reactor are triggered, they will be executed
atomically in the order in which they are defined in the reactor. Dependencies across reactors (connections with no **after**) will also result in sequential execution. Specifically, if any reaction of reactor _A_ produces an output that triggers a reaction of reactor _B_, then _B_'s reaction will execute only after _A_'s reaction has completed execution. Modulo these two ordering constraints, reactions may execute in parallel on multiple cores or even across networks.

Reactions are given in a **target language**, whereas inputs, outputs, actions, and the dependencies among them are defined in Lingua Franca. LF is, therefore, a kind of **coordination language** rather than a programming language.

## Real-Time Systems

Reactions may have delays and deadlines associated with them. This information can be used to perform earliest deadline first (EDF) scheduling. Also, in combination with execution-time analysis of reactions, it should be possible to determine at compile time whether the imposed deadlines can be met, although these analysis tools have not yet been developed. Of particular interest is to deploy reactors on platforms such as [FlexPRET](https://github.com/pretis/flexpret) and [Patmos](http://patmos.compute.dtu.dk/), which are designed for predictable timing; execution-time estimates for these architectures will be much tighter than currently possible with ordinary microprocessors.

### Schedulability Analysis of LF Programs

- Start with classic schedulability test: critical instant (Liu and Layland)
  - Possible not the worst-case?
  - Question: can not producing an output lead to a timing anomaly?
- Classic schedulability analysis becomes messy when deadline with locks for communication (priority inversion, locking protocols to avoid it, recursive schedulability analysis)
  - We do not use shared data protected by locks +1
- First (pessimistic) approach: all input events and timers fire at the same time, check all execution chains (reactions in actors) need to finish before the actuator deadlines.
- Delays (timer, after, scheduled actions) break the dependency chain
  - Schedulability analysis can be broken up into sub-chains +1
- For now assume no preemptions, this also enables WCET analysis of reactions
- We could also use a big hammer: model the LF program as timed automata and do model checking (e.g., UupAal)

## To Do List

Lingua Franca is a work in progress. See our [project page](https://github.com/lf-lang/lingua-franca/projects) for an overview of ongoing and future work.
