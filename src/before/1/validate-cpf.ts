const FACTOR_DIGIT_1 = 10
const FACTOR_DIGIT_2 = 11

const validateCpf = (rawCpf: string) => {
  if (!rawCpf) return false

  const cpf = sanitizeCpf(rawCpf)

  if (!isValidLength(cpf)) return false
  if (isBlocked(cpf)) return false

  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1)
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2)
  const currentDigit = extractCurrentDigit(cpf)
  const calculatedDigit = `${digit1}${digit2}`

  return currentDigit === calculatedDigit
}

const sanitizeCpf = (cpf: string) => cpf.replace(/[\\.\\-]*/g, '')

const isValidLength = (cpf: string) => cpf.length === 11

const isBlocked = (cpf: string) => {
  const [firstDigit] = cpf
  return [...cpf].every((digit) => digit === firstDigit)
}

const calculateDigit = (cpf: string, factor: number) => {
  let total = 0

  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--
  }

  const rest = total % 11
  return rest < 2 ? 0 : 11 - rest
}

const extractCurrentDigit = (cpf: string) => cpf.slice(9)

export { validateCpf }
