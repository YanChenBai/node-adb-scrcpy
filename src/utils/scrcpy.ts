import { exec, spawn } from 'child_process'
import Parse, { Device } from './parse'

export interface ConnectSerial
  extends Record<string, string | number | undefined> {
  serial: string
  max_size?: number
  video_bit_rate?: string
  max_fps?: number
  video_codec?: 'h264' | 'h265' | 'av1'
}

export enum ScrcpyType {
  NORMAL,
  ONLY_AUDIO,
  OTG
}

export default class AdbScrcpy {
  /** 用于以后改adb的默认路径 */
  structure_adb_cmd(items: string[]) {
    return 'adb ' + items.join(' ')
  }

  structure_scrcpy_cmd(items: string[]) {
    return 'scrcpy ' + items.join(' ')
  }
  /** 对象转为 --参数名=参数值 */
  structure_params(obj: Record<string, string | number | undefined>) {
    return Object.entries(obj)
      .filter(([, val]) => val !== undefined) // 排除空值
      .map(([attr, val]) => {
        // 拼接参数
        attr = attr.replace(/_/g, '-')
        return `--${attr}=${val}`
      })
  }

  /** 获取设备列表 */
  devices() {
    return new Promise<Device[]>((resolve, reject) => {
      const cmd = this.structure_adb_cmd(['devices', '-l'])
      exec(cmd, (err, stdout, _stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve(Parse.devices(stdout))
        }
      })
    })
  }

  /**
   *
   * @param port 端口
   * @param serial_number 设备序列号
   * @returns
   */
  tcpip(port: number, serial_number?: string) {
    return new Promise(async (resolve, reject) => {
      const items = ['tcpip', String(port)]

      // 判断是否需要传入设备序列号
      if (serial_number) items.unshift('-s', serial_number)

      const cmd = this.structure_adb_cmd(items)
      exec(cmd, (err, stdout, _stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve(stdout)
        }
      })
    })
  }

  /**
   * adb 无线连接
   * @param ip
   * @param port
   * @returns
   */
  connect(ip: string, port: number) {
    return new Promise(async (resolve, reject) => {
      const items = ['connect', `${ip}:${port}`]
      const cmd = this.structure_adb_cmd(items)
      exec(cmd, (err, stdout, _stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve(stdout)
        }
      })
    })
  }

  /**
   * 连接设备
   * @param serial_number 设备序列号
   * @param otg 是否启用otg模式
   */
  scrcpy(options: ConnectSerial, type: ScrcpyType = ScrcpyType.NORMAL) {
    const params = this.structure_params(options)

    if (type === ScrcpyType.ONLY_AUDIO) {
      params.push('--no-video-playback')
    } else if (type === ScrcpyType.OTG) {
      params.push('--otg')
    }

    // 启动scrcpy
    const childProcess = spawn('scrcpy', params)

    // 监听输出
    childProcess.stdout.on('data', (data) => console.log(`${data}`))

    childProcess.stderr.on('data', (data) => console.log(`${data}`))

    // 监听命令关闭事件
    childProcess.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`)
    })
  }
}
