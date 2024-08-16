// 1. 从数组构建一个联合类型
const images = ['png', 'jpg', 'git'] as const

// type ImageType2 = "png" | "jpg" | "git"
type ImageType = typeof images[number]

const image: ImageType = '11'

// 2.从一个对象key构建一个联合类型
const imageObject = {
  png: '',
  jpg: 1,
  git: true,
}

// type ImageType2 = "png" | "jpg" | "git"
type ImageType2 = keyof typeof imageObject
