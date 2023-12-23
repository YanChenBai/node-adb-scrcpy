import AdbScrcpy from './utils/scrcpy'
import inquirer from 'inquirer'
import { isValidIP, isValidPort } from './utils/tools'

export default async function adb_connect() {
  const adbscrcpy = new AdbScrcpy()
  const devices = await adbscrcpy.devices()
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'serial',
        message: '选择设备',
        choices: devices.map((item) => ({
          name: `${item.model} - ${item.serial} [${item.status}]`,
          value: item.serial
        }))
      },
      {
        type: 'input',
        name: 'ip',
        message: '设备IP',
        default: '192.168.3.114'
      },
      {
        type: 'input',
        name: 'port',
        message: '设备端口',
        default: '5590'
      }
    ])
    .then(async ({ serial, port, ip }) => {
      if (!isValidIP(ip)) throw new Error('IP地址不正确!')
      if (!isValidPort(port)) throw new Error('端口号不正确!')
      await adbscrcpy.tcpip(port, serial)
      console.log(await adbscrcpy.connect(ip, port))
    })
    .catch((error) => console.error(error))
}
