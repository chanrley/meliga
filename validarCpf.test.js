import { test } from "node:test";
import assert from "node:assert/strict";
import { validarCpf } from "./validarCpf.js";

test("aceita CPF com 11 dígitos numéricos", () => {
  assert.equal(validarCpf("12345678900"), true);
});

test("rejeita CPF com letras", () => {
  assert.equal(validarCpf("123abc78900"), false);
});

test("rejeita CPF com menos de 11 dígitos", () => {
  assert.equal(validarCpf("123456789"), false);
});
