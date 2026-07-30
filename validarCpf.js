export function validarCpf(cpf) {
  return /^\d{11}$/.test(cpf);
}
