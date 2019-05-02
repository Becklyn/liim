import test from "ava";
import fs from "fs";
import path from "path";
import Terser from "terser";

test("< 450B", t => {

    let fileContent = fs.readFileSync(path.join(__dirname, "../src/index.js"));

    let minified = Terser.minify(fileContent.toString(), {
        ecma: 6,
        warnings: true,
        mangle: {
            properties: true,
        },
    });

    t.falsy(minified.error !== undefined && Object.keys(minified.error) > 0, "No minification errors");
    t.falsy(minified.warnings !== undefined && Object.keys(minified.warnings) > 0, "No minification warnings");
    t.truthy(Buffer.byteLength(minified.code, "utf-8") < 450, "Size < 450B")
});


