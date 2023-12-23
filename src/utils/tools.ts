/** 使用正则表达式检查是否符合 IP 地址的格式 */
export function isValidIP(ip: string) {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/

  return ipRegex.test(ip)
}

/**  使用正则表达式检查是否是数字，且在合法的端口范围内 */
export function isValidPort(port: string) {
  const portRegex = /^\d+$/
  return (
    portRegex.test(port) &&
    parseInt(port, 10) >= 1 &&
    parseInt(port, 10) <= 65535
  )
}
