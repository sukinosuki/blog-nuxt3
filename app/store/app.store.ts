// type FetchError = Pick<ReturnType<typeof useFetch<any>>, 'error'>

type KeyOfType<T, K extends keyof T> = T[K]

// // 定义一个对象
// const obj = {
//   a: 1,
//   b: 'string',
//   c: true,
// }

// 使用类型别名来获取'a'键的类型
type FetchError = KeyOfType<ReturnType<typeof useFetch>, 'error'>

const useAppStore = () => {
  const fetchError = useState<FetchError>('app-fetchError')

  const count = useState('app-count', () => 0)
  return {

    fetchError,
    count,
  }
}

export default useAppStore
