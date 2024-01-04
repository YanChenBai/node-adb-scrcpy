import AdbScrcpy from './utils/scrcpy'
import inquirer from 'inquirer'
import { isValidIP, isValidPort } from './utils/tools'

export default async function adb_connect() {
  const adbscrcpy = new AdbScrcpy()
  const devices = await adbscrcpy.devices()

  const serial = await inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'serial',
        message: '选择设备',
        choices: devices.map((item) => ({
          name: `${item.model} - ${item.serial} [${item.status}]`,
          value: item.serial
        }))
      }
    ])
    .then(async ({ serial }) => {
      return serial as string
    })
    .catch((error) => {
      console.error(error)
      return null
    })

  if (!serial) {
    console.error('选择设备错误!')
    return null
  }

  // 获取ip地址
  const ip = await adbscrcpy.getIp(serial)

  if (!ip) {
    console.error('获取IP地址错误!')
    return null
  }

  return await inquirer
    .prompt([
      {
        type: 'input',
        name: 'ip',
        message: '设备IP',
        default: ip
      },
      {
        type: 'input',
        name: 'port',
        message: '设备端口',
        default: '5590'
      }
    ])
    .then(async ({ ip, port }) => {
      if (!isValidIP(ip)) {
        console.error('IP地址不正确!')
        return null
      }
      if (!isValidPort(port)) {
        console.error('端口不正确!')
        return null
      }
      await adbscrcpy.tcpip(port, serial)
      console.log(await adbscrcpy.connect(ip, port))
    })
}
