import AdbScrcpy from '../utils/scrcpy'
test('对象构造参数', () => {
  const adbscrcpy = new AdbScrcpy()
  // 普通命令
  expect(
    adbscrcpy.structure_params({
      serial: '123456789'
    })
  ).toEqual(['--serial=123456789'])

  // 属性名带有特殊字符的
  expect(
    adbscrcpy.structure_params({
      video_bit_rate: '24M'
    })
  ).toEqual(['--video-bit-rate=24M'])
})
