// This is free and unencumbered software released into the public domain

import assert from "node:assert/strict";
import { test } from "node:test";

import shuffleSeed from "./shuffle_seed.ts";

function seedOf(value: number): Uint32Array<ArrayBuffer> {
  const seed = new Uint32Array(1);
  seed[0] = value;
  return seed;
}

test("shuffleSeed is deterministic", () => {
  assert.strictEqual(shuffleSeed(seedOf(42))[0], shuffleSeed(seedOf(42))[0]);
});

test("shuffleSeed applies the expected LCG step", () => {
  assert.strictEqual(shuffleSeed(seedOf(0))[0], 1013904223);
  assert.strictEqual(shuffleSeed(seedOf(42))[0], 1083814273);
});

test("shuffleSeed changes the value", () => {
  assert.notStrictEqual(shuffleSeed(seedOf(42))[0], 42);
});
