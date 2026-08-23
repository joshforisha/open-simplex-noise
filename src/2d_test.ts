// This is free and unencumbered software released into the public domain

import assert from "node:assert/strict";
import { test } from "node:test";

import { makeNoise2D } from "./2d.ts";

function assertAlmostEqual(actual: number, expected: number, epsilon = 1e-9) {
  assert(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`,
  );
}

test("makeNoise2D returns values in (-1, 1)", () => {
  const noise2D = makeNoise2D(42);
  for (let x = -5; x <= 5; x += 0.37) {
    for (let y = -5; y <= 5; y += 0.53) {
      const value = noise2D(x, y);
      assert(
        value > -1 && value < 1,
        `expected noise2D(${x}, ${y}) => ${value} to be in (-1, 1)`,
      );
    }
  }
});

test("makeNoise2D is deterministic for a given seed", () => {
  const a = makeNoise2D(42);
  const b = makeNoise2D(42);
  assert.strictEqual(a(1.5, 2.5), b(1.5, 2.5));
});

test("makeNoise2D differs across seeds", () => {
  const a = makeNoise2D(1);
  const b = makeNoise2D(2);
  assert(a(1.5, 2.5) !== b(1.5, 2.5));
});

test("makeNoise2D matches known output", () => {
  const noise2D = makeNoise2D(42);
  assertAlmostEqual(noise2D(1.5, 2.5), 0.21974807508614522);
});
