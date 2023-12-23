import inquirer from 'inquirer'
import adb_connect from './adb_connect'
import adb_scrcpy from './adb_scrcpy'

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'select',
      message: '选择功能',
      choices: [
        { name: 'ADB WIFI 连接设备', value: 1 },
        { name: '启动镜像', value: 2 }
      ]
    }
  ])
  .then(({ select }) => {
    // 根据选择执行相应的操作
    if (select === 1) {
      adb_connect()
    } else if (select === 2) {
      adb_scrcpy()
    }
  })
  .catch((error) => console.error(error))
