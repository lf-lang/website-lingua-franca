---
title: "Superdense Time"
layout: docs
permalink: /docs/handbook/superdense-time
oneline: "Superdense time in Lingua Franca."
preamble: >
---

$page-showing-target$

## Tag vs. Time

The model of time in Lingua Franca is a bit more sophisticated than we have hinted at. Specifically, a **superdense** model of time is used. In particular, instead of a **timestamp**, LF uses a **tag**, which consists of a **logical time** _t_ and a **microstep** _m_.

A [$logical$ $action$](/docs/handbook/actions#logical-actions) may have a `<min_delay>` of zero, and the `<offset>` argument to the `schedule()` function may be zero. In this case, the call to `schedule()` appears to be requesting that the action trigger at the _current logical time_. Here is where superdense time comes in. The action will indeed trigger at the current logical time, but one microstep later. Consider the following example:

$start(Microsteps)$

```lf-c
target C;
main reactor {
    state count:int(1);
    logical action a;
    reaction(startup, a) -> a {=
        printf("%d. Logical time is %lld. Microstep is %d.\n",
            self->count, lf_tag().time, lf_tag().microstep
        );
        if (self->count++ < 5) {
            lf_schedule(a, 0);
        }
    =}
}

```

```lf-cpp
target Cpp;
main reactor {
    state count:int(1);
    logical action a;
    reaction(startup, a) -> a {=
        std::cout << count << " Logical time is " << get_logical_time() << " Microstep: " << get_microstep() <<std::endl;
        if (count++ < 5) {
            a.schedule();
        }
    =}
}

```

```lf-py
target Python;
main reactor {
    state count(1);
    logical action a;
    reaction(startup, a) {=
        print(
            f"{self.count}. Logical time is {lf.tag().time}. "
            f"Microstep is {lf.tag().microstep}."
        )
        if self.count < 5:
            a.schedule(0)
        self.count += 1
    =}
}

```

```lf-ts
target TypeScript
main reactor {
    state count:number(1)
    logical action a
    reaction(startup, a) -> a {=
        console.log(`${count}. Logical time is ${util.getCurrentLogicalTime()}. Microstep is ${util.getCurrentTag().microstep}.`)
        if (count++ < 5) {
            actions.a.schedule(TimeValue.zero(), null)
        }
    =}
}

```

```lf-rs
target Rust;
main reactor {
    state count:u32(1);
    logical action a;
    reaction(startup, a) -> a {=
        let tag = ctx.get_tag();
        println!(
            "{}. Logical time is {}. Microstep is {}.",
            self.count,
            tag.offset_from_t0.as_nanos(),
            tag.microstep(),
        );
        if self.count < 5 {
            self.count += 1;
            ctx.schedule(a, Asap);
        }
    =}
}
```

$end(Microsteps)$

<img alt="Lingua Franca diagram" src="./img/diagrams/Microsteps.svg" width="150"/>

Executing this program will yield something like this:

```
1. Logical time is 1649607749415269000. Microstep is 0.
2. Logical time is 1649607749415269000. Microstep is 1.
3. Logical time is 1649607749415269000. Microstep is 2.
4. Logical time is 1649607749415269000. Microstep is 3.
5. Logical time is 1649607749415269000. Microstep is 4.
```

Notice that the logical time is not advancing, but the microstep is (the logical time, in this case, gives the number of nanoseconds that have elapsed since January 1, 1970). The general rule is that **every** call to `schedule()` advances the tag by at least one microstep.

## Logical Simultaneity

Two events are **logically simultaneous** only if _both_ the logical time and the microstep are equal. The following example illustrates this:

$start(Simultaneous)$

```lf-c
target C;
reactor Destination {
    input x:int;
    input y:int;
    reaction(x, y) {=
        printf("Time since start: %lld, microstep: %d\n",
            lf_time_logical_elapsed(), lf_tag().microstep
        );
        if (x->is_present) {
            printf("  x is present.\n");
        }
        if (y->is_present) {
            printf("  y is present.\n");
        }
    =}
}
main reactor {
    logical action repeat;
    d = new Destination();
    reaction(startup) -> d.x, repeat {=
        lf_set(d.x, 1);
        lf_schedule(repeat, 0);
    =}
    reaction(repeat) -> d.y {=
        lf_set(d.y, 1);
    =}
}

```

```lf-cpp
target Cpp;

reactor Destination {
    input x:int;
    input y:int;
    reaction(x, y) {=
        std::cout << "Time since start: " << get_elapsed_logical_time() << " Current Microstep: " << get_microstep() << std::endl;
        if (x.is_present()) {
            std::cout << "x is present" << std::endl;
        }
        if (y.is_present()) {
            std::cout << "y is present" << std::endl;
        }
    =}
}

main reactor {
    logical action repeat;
    d = new Destination();
    reaction(startup) -> d.x, repeat {=
        d.x.set(1);
        repeat.schedule(0ms);
    =}
    reaction(repeat) -> d.y {=
        d.y.set(1);
    =}
}

```

```lf-py
target Python;
reactor Destination {
    input x;
    input y;
    reaction(x, y) {=
        print(
            f"Time since start: {lf.time.logical_elapsed()}, "
            f"microstep: {lf.tag().microstep}"
        )
        if x.is_present:
            print("  x is present.")
        if y.is_present:
            print("  y is present.")
    =}
}
main reactor {
    logical action repeat;
    d = new Destination();
    reaction(startup) -> d.x, repeat {=
        d.x.set(1)
        repeat.schedule(0)
    =}
    reaction(repeat) -> d.y {=
        d.y.set(1)
    =}
}

```

```lf-ts
target TypeScript
reactor Destination {
    input x:number
    input y:number
    reaction(x, y) {=
        console.log(`Time since start: ${util.getElapsedLogicalTime()}, microstep: ${util.getCurrentTag().microstep}`)
        if (x !== undefined) {
            console.log("  x is present.")
        }
        if (y !== undefined) {
            console.log("  y is present.")
        }
    =}
}
main reactor {
    logical action repeat
    d = new Destination()
    reaction(startup) -> d.x, repeat {=
        d.x = 1
        actions.repeat.schedule(0, null)
    =}
    reaction(repeat) -> d.y {=
        d.y = 1
    =}
}

```

```lf-rs
target Rust;
reactor Destination {
    input x:u32;
    input y:u32;
    reaction(x, y) {=
        let tag = ctx.get_tag();
        println!(
            "Time since start: {}, microstep: {}",
            tag.offset_from_t0.as_nanos(),
            tag.microstep,
        );
        if ctx.is_present(x) {
            println!("  x is present.");
        }
        if ctx.is_present(y) {
            println!("  y is present.");
        }
    =}
}
main reactor {
    logical action repeat;
    d = new Destination();
    reaction(startup) -> d.x, repeat {=
        ctx.set(d__x, 1);
        ctx.schedule(repeat, Asap);
    =}
    reaction(repeat) -> d.y {=
        ctx.set(d__y, 1);
    =}
}

```

$end(Simultaneous)$

<img alt="Lingua Franca diagram" src="./img/diagrams/Simultaneous.svg" width="400"/>

The `Destination` reactor has two inputs, `x` and `y`, and it reports in a reaction to either input what is the logical time, the microstep, and which input is present. The main reactor reacts to $startup$ by sending data to the `x` input of `Destination`. It then schedules a `repeat` action with an `<offset>` of zero. The `repeat` reaction is invoked **strictly later**, one **microstep** later. The output printed, therefore, will look like this:

```
Time since start: 0, microstep: 0
  x is present.
Time since start: 0, microstep: 1
  y is present.
```

The reported elapsed logical time has not advanced in the second reaction, but the fact that `x` is not present in the second reaction proves that the first reaction and the second are not logically simultaneous. The second occurs one microstep later.

## Alignment of Logical and Physical Times

Recall that in Lingua Franca, logical time "chases" physical time, invoking reactions at a physical time close to their logical time. For that purpose, the microstep is ignored.
