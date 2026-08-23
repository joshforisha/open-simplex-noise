// This is free and unencumbered software released into the public domain

import assert from "node:assert/strict";
import { test } from "node:test";

import { makeNoise4D } from "./4d.ts";

function assertAlmostEqual(actual: number, expected: number, epsilon = 1e-9) {
  assert(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`,
  );
}

test("makeNoise4D returns values in (-1, 1)", () => {
  const noise4D = makeNoise4D(42);
  for (let x = -2; x <= 2; x += 1.1) {
    for (let y = -2; y <= 2; y += 1.1) {
      for (let z = -2; z <= 2; z += 1.1) {
        for (let w = -2; w <= 2; w += 1.1) {
          const value = noise4D(x, y, z, w);
          assert(
            value > -1 && value < 1,
            `expected noise4D(${x}, ${y}, ${z}, ${w}) => ${value} to be in (-1, 1)`,
          );
        }
      }
    }
  }
});

test("makeNoise4D is deterministic for a given seed", () => {
  const a = makeNoise4D(42);
  const b = makeNoise4D(42);
  assert.strictEqual(a(1.5, 2.5, 3.5, 4.5), b(1.5, 2.5, 3.5, 4.5));
});

test("makeNoise4D differs across seeds", () => {
  const a = makeNoise4D(1);
  const b = makeNoise4D(2);
  assert(a(1.5, 2.5, 3.5, 4.5) !== b(1.5, 2.5, 3.5, 4.5));
});

test("makeNoise4D matches known output", () => {
  const noise4D = makeNoise4D(42);
  assertAlmostEqual(noise4D(1.5, 2.5, 3.5, 4.5), 0.02350890325873607);
});
