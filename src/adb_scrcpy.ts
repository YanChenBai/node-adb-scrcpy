import AdbScrcpy, { ScrcpyType } from './utils/scrcpy'
import inquirer from 'inquirer'

export default async function adb_scrcpy() {
  const adbscrcpy = new AdbScrcpy()
  const devices = await adbscrcpy.devices()
  return await inquirer
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
        type: 'rawlist',
        name: 'select',
        message: '选择模式',
        choices: [
          { name: '正常镜像', value: ScrcpyType.NORMAL },
          { name: '纯声音', value: ScrcpyType.ONLY_AUDIO },
          { name: 'OTG模式', value: ScrcpyType.OTG }
        ]
      }
    ])
    .then(async ({ serial, select }) => {
      return adbscrcpy.scrcpy({ serial: serial }, select)
    })
    .catch((error) => console.error(error))
}
