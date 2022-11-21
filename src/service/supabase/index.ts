import { supabase } from '~/supabase'
import type { LifeMottoItem } from '~/typings/motto'
/**
 * 获取数据
 * @returns 返回数据列表
 */
export const apiGetData = async () => {
  try {
    const res = await supabase.from('db_truth_of_life').select('*')
    return res
  }
  catch (error) {
    return error
  }
}

/**
 * 提交
 * @param params 要提交的对象
 * @returns 返回提交结果
 */
export const apiPostData = async (params: LifeMottoItem) => {
  try {
    const result = await supabase.from('db_truth_of_life').insert(params)
    return result
  }
  catch (error) {
    return error
  }
}
