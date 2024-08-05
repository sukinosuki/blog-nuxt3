import type { FormInst } from 'naive-ui'

//
export function useForm<T extends object>(initial: T) {
  const data = ref({ ...initial })

  const formRef = ref<FormInst | null>(null)

  const validate = async (): Promise<[boolean, string | null]> => {
    console.log('[validate] formRef ', formRef.value)

    return formRef.value?.validate()
      .then(() => {
        return [true, null]
      })
      .catch((err) => {
        //   throw err[0][0].message

        return [false, err[0][0].message]
      })
  }

  //
  const reset = () => {
    console.log('reset ')

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
