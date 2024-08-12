import type { FormInst } from 'naive-ui'

//
export function useForm<T extends object>(initial: T) {
  const data = ref<T>({ ...initial })

  const formRef = ref<FormInst | null>(null)

  const validate = async (): Promise<[boolean, string | null]> => {
    return formRef.value!.validate()
      .then(() => {
        return [true, null] as [boolean, string | null]
      })
      .catch((err) => {
        //   throw err[0][0].message

        return [false, err[0][0].message] as [boolean, string | null]
      })
  }

  //
  const reset = () => {
    Object.entries(initial).forEach(([k, v]) => {
      data.value[k] = v
    })
  }

  return {
    data,
    ref: formRef,
    reset,
    validate,
  }
}
