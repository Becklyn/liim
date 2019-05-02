import test from "ava";
import Liim from "../src/index";

test("simple set", t => {
    let liim = new Liim();
    let a = {o: "hai"};
    liim.set("a", a);

    // must be and stay the same instance
    t.is(liim.get("a"), a);
    t.is(liim.get("a"), a);
});

test("factor set", t => {
    let counter = 0;
    let final = {o: "hai"};
    let factory = () => {
        ++counter;
        return final;
    };

    // add service to container
    let liim = new Liim();
    liim.set("factory", factory);

    // will be lazily created
    t.is(counter, 0);

    // fetch
    let fetched = liim.get("factory");

    // now the factory has been called
    t.is(counter, 1);
    // and the result is correct
    t.is(fetched, final);
});


test("factor only called once", t => {
    let counter = 0;
    let factory = () => {
        ++counter;
        return {};
    };

    // add service to container
    let liim = new Liim();
    liim.set("factory", factory);

    // fetch multiple times
    liim.get("factory");
    liim.get("factory");
    liim.get("factory");

    // the factory will only be called once
    t.is(counter, 1);
});


test("nested factory", t => {
    let final = {o: "hai"};

    let inner = () => final;
    let outer = (liim) => liim.get("inner");

    let liim = new Liim();
    liim.set("inner", inner);
    liim.set("outer", outer);

    t.is(liim.get("outer"), final);
});



test("nested factory with complex return type", t => {
    let final1 = {o: "hai"};
    let final2 = {o: "hai2"};

    let inner1 = () => final1;
    let inner2 = () => final2;
    let outer = (liim) => {
        return {
            one: liim.get("inner1"),
            two: liim.get("inner2"),
        }
    };

    let liim = new Liim();
    liim.set("inner1", inner1);
    liim.set("inner2", inner2);
    liim.set("outer", outer);

    let result = liim.get("outer");
    t.is(result.one, final1);
    t.is(result.two, final2);
});


test("fetch missing", t => {
    t.throws(() => {
        let liim = new Liim();
        liim.get("missing");
    }, "Service missing: missing");
});



test("duplicate registration", t => {
    t.throws(() => {
        let liim = new Liim();
        liim.set("duplicate", {});
        liim.set("duplicate", {});
    }, "Duplicate service: duplicate");
});
