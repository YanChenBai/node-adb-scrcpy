export interface Device {
  serial: string
  status: 'device' | 'offline' | string
  product: string
  model: string
  device: string
  transport_id: number
}

export default class Parse {
  static split_value(str: string) {
    const arr = str.split(':')
    if (arr.length === 2) {
      return arr[1].trim()
    } else {
      throw new Error('Analysis error.')
    }
  }

  /**
   * 解析设备列表
   * @param content 返回的文本内容
   *  */
  static devices(content: string): Device[] {
    try {
      // 拆分每一行数据
      const rows = content
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)

      // 剔除第一行
      rows.splice(0, 1)

      const devices = rows
        .map((item) => item.split(' ').filter((item) => item.length > 0))
        .map((item) => {
          const device: Device = {
            serial: item[0],
            status: item[1],
            product: Parse.split_value(item[2]),
            model: Parse.split_value(item[3]),
            device: Parse.split_value(item[4]),
            transport_id: Number(Parse.split_value(item[5]))
          }
          return device
        })

      return devices
    } catch (error) {
      throw new Error('解析设备列表失败 ---> ' + content)
    }
  }
}
