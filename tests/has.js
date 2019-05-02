import test from "ava";
import Liim from "../src/index";

test("has missing", t => {
    let liim = new Liim();

    t.is(liim.has("missing"), false);
});


test("added", t => {
    let liim = new Liim();

    t.is(liim.has("name"), false);
    liim.set("name", {});
    t.is(liim.has("name"), true);
});
