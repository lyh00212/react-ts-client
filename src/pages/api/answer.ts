import type { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from '@/services/answer'

// 格式化表单数据
function genAnswerInfo(reqBody: any) {
    const answerList: Array<{ componentId: string; value: string }> = []
    Object.keys(reqBody).forEach(key => {
        if (key === 'questionId') return
        answerList.push({
            componentId: key,
            value: reqBody[key]
        })
    })
    return {
        questionId: reqBody.questionId,
        answerList
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(200).json({ errno: -1, msg: 'Method 错误' })
    }
    const answerInfo = genAnswerInfo(req.body)
    console.log(answerInfo, '-----')
    try {
        // 将数据提交到服务端
        const resData = await postAnswer(answerInfo)
        if (resData.errno === 0) {
            // 如果提交成功，跳转到success页面
            res.redirect('/success')
        } else {
            // 提交失败了
            res.redirect('/fail')
        }
    } catch (err) {
        // 提交失败了
        res.redirect('/fail')
    }
    res.status(200).json({ errno: 0 })
}
