import getOrElse from '../getOrElse'

declare global {
  interface Array<T> {
    unique(dotPath?: string | string[]): T[]
  }
}

Array.prototype.unique = function(dotPath) {
  const paths = Array.isArray(dotPath) ? dotPath : [dotPath || '0']
  return this.filter((item, idx, self) => {
    return self.findIndex(_ => getKey(_, paths) === getKey(item, paths)) === idx
  })
}

const getKey = (root: any, dotPaths: string[]) =>
  dotPaths.map(dotPath => {
    return typeof root === 'object' ? getOrElse(root, dotPath, 0) : root
  }).join('-')
