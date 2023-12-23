import Parse from '../parse'

const zero = `List of devices attached

`

const one = `List of devices attached
81J5KR2C9E3N0731       device product:DBY-W09 model:DBY_W09 device:HWDBY transport_id:28

`

const two = `List of devices attached
371J2C4TR77A064T       device product:DBY-W09 model:DBY_W09 device:HWDBY transport_id:28
06jct4rat               device product:houji model:23127PN0CC device:houji transport_id:29

`

test('解析设备列表', () => {
  // 测试多个设备的情况
  expect(Parse.devices(two)).toEqual([
    {
      serial: '371J2C4TR77A064T',
      status: 'device',
      product: 'DBY-W09',
      model: 'DBY_W09',
      device: 'HWDBY',
      transport_id: 28
    },
    {
      serial: '06jct4rat',
      status: 'device',
      product: 'houji',
      model: '23127PN0CC',
      device: 'houji',
      transport_id: 29
    }
  ])

  // 测试单个设备的情况
  expect(Parse.devices(one)).toEqual([
    {
      serial: '81J5KR2C9E3N0731',
      status: 'device',
      product: 'DBY-W09',
      model: 'DBY_W09',
      device: 'HWDBY',
      transport_id: 28
    }
  ])

  // 测试没设备的情况
  expect(Parse.devices(zero)).toEqual([])
})
