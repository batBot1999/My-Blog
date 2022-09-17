import path from 'path'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'

const cwd = process.cwd()
const param = process.argv
const workPath = './'       // 工作路径
const disabled = ['.vitepress', 'snippets', 'data.json']     // 避免遍历的目录
/**
 * 根据路径地址,遍历返回所有的文件的叶子节点
 */
function getFileListSync(dirPath) {
  const result = []
  const entries = readdirSync(dirPath, { withFileTypes: true })
  for (let entry of entries) {
    if (disabled.includes(entry.name)) {
      continue
    }
    if (entry.isFile()) {
      result.push(path.join(cwd, dirPath, entry.name))
    }
    if (entry.isDirectory()) {
      result.push(...getFileListSync(path.join(dirPath, entry.name)))
    }
  }
  return result
}

/**
 * 根据路径中的地址,正则匹配文件中的所有图片地址,返回类型为图片列表数组
 */
function getImgSrc(path) {
  const text = readFileSync(path, { encoding: 'utf8' })
  const regex = /http.+png/g
  return text.match(regex)
}


/**
 * 根据url下载图片文件到本地
 */
async function download(url) {
  const fileName = url.split('/').pop()   // 获得文件名
  const res = await fetch(url)
  const buffer = await (res.arrayBuffer())
  writeFileSync(`./img/${fileName}`, new Uint8Array(buffer))
}


/**
 * 主函数,根据不同的参数读取文件中的所有图片
 */
function main() {
  let data = getFileListSync(workPath).map(getImgSrc).filter(i => !!i && i.length >= 10).flat()
  if (param[2] === 'downloadImg') {
    mkdirSync('img')
    data.map(url => download(url))
  }
  if (param[2] === 'downloadJson') {
    writeFileSync('data.json', JSON.stringify(data))
  }
}

main()
