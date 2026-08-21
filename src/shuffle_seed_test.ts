// This is free and unencumbered software released into the public domain

import { assertEquals, assertNotEquals } from "jsr:@std/assert@^1";

import shuffleSeed from "./shuffle_seed.ts";

function seedOf(value: number): Uint32Array<ArrayBuffer> {
  const seed = new Uint32Array(1);
  seed[0] = value;
  return seed;
}

Deno.test("shuffleSeed is deterministic", () => {
  assertEquals(shuffleSeed(seedOf(42))[0], shuffleSeed(seedOf(42))[0]);
});

Deno.test("shuffleSeed applies the expected LCG step", () => {
  assertEquals(shuffleSeed(seedOf(0))[0], 1013904223);
  assertEquals(shuffleSeed(seedOf(42))[0], 1083814273);
});

Deno.test("shuffleSeed changes the value", () => {
  assertNotEquals(shuffleSeed(seedOf(42))[0], 42);
});
