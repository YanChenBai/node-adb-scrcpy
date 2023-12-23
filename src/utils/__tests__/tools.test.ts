import { isValidPort, isValidIP } from '../tools'

test('检测是否为 - IP', () => {
  // 测试一些例子
  expect(isValidIP('192.168.1.1')).toEqual(true)
  expect(isValidIP('256.0.0.1')).toEqual(false)
  expect(isValidIP('abc.def.ghi.jkl')).toEqual(false)
  expect(isValidIP('10.20.30.40')).toEqual(true)
})

test('检测是否为 - 端口', () => {
  expect(isValidPort('80')).toEqual(true)
  expect(isValidPort('65536')).toEqual(false)
  expect(isValidPort('abc')).toEqual(false)
  expect(isValidPort('8080')).toEqual(true)
})
