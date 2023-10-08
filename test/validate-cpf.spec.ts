import { validateCpf } from '@/before/validate-cpf'

describe('CPF', () => {
  test.each([['935.411.347-80'], ['357.188.378-05'], ['987.654.321-00']])(
    'deve validar o cpf %s',
    (cpf) => {
      const sut = validateCpf(cpf)
      expect(sut).toBeTruthy()
    },
  )

  test('não deve validar o cpf - números iguais', () => {
    const sut = validateCpf('111.111.111-11')
    expect(sut).toBeFalsy()
  })

  test('não deve validar o cpf - números aleatórios', () => {
    const sut = validateCpf('123.456.789-00')
    expect(sut).toBeFalsy()
  })

  test('não deve validar o cpf - além do limite', () => {
    const sut = validateCpf('123.456.789-0000000')
    expect(sut).toBeFalsy()
  })

  test('não deve validar o cpf - abaixo do limite', () => {
    const sut = validateCpf('123456789')
    expect(sut).toBeFalsy()
  })
})
