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

const ipRes = `
24: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 3000
    link/ether 3a:0c:10:b1:ee:ac brd ff:ff:ff:ff:ff:ff
    inet 192.168.3.128/24 brd 192.168.3.255 scope global wlan0
       valid_lft forever preferred_lft forever
    inet6 fe80::380c:10ff:feb1:eeac/64 scope link
       valid_lft forever preferred_lft forever
`

test('测试ip匹配', () => {
  expect(Parse.ip(ipRes)).toEqual('192.168.3.128')
})
