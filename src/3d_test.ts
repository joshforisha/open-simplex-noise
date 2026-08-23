// This is free and unencumbered software released into the public domain

import assert from "node:assert/strict";
import { test } from "node:test";

import { makeNoise3D } from "./3d.ts";

function assertAlmostEqual(actual: number, expected: number, epsilon = 1e-9) {
  assert(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`,
  );
}

test("makeNoise3D returns values in (-1, 1)", () => {
  const noise3D = makeNoise3D(42);
  for (let x = -3; x <= 3; x += 0.7) {
    for (let y = -3; y <= 3; y += 0.7) {
      for (let z = -3; z <= 3; z += 0.7) {
        const value = noise3D(x, y, z);
        assert(
          value > -1 && value < 1,
          `expected noise3D(${x}, ${y}, ${z}) => ${value} to be in (-1, 1)`,
        );
      }
    }
  }
});

test("makeNoise3D is deterministic for a given seed", () => {
  const a = makeNoise3D(42);
  const b = makeNoise3D(42);
  assert.strictEqual(a(1.5, 2.5, 3.5), b(1.5, 2.5, 3.5));
});

test("makeNoise3D differs across seeds", () => {
  const a = makeNoise3D(1);
  const b = makeNoise3D(2);
  assert(a(1.5, 2.5, 3.5) !== b(1.5, 2.5, 3.5));
});

test("makeNoise3D matches known output", () => {
  const noise3D = makeNoise3D(42);
  assertAlmostEqual(noise3D(1.5, 2.5, 3.5), 0.08691090210355965);
});
