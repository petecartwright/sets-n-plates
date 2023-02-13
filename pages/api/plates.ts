// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPlatesForWeight } from '@/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const barWeight = req.query['barWeight']
  const targetWeight = req.query['targetWeight']
  const availablePlates = req.query['availablePlates']

  if (!targetWeight) {
    res
      .status(400)
      .json({ error: 'Bad request, targetWeight is a required parameter' })
    return
  }
  const targetWeightFormatted = +targetWeight

  let barWeightFormatted = barWeight ? +barWeight : undefined
  let availablePlatesFormatted: number[] | undefined = []
  if (typeof availablePlates === 'string') {
    availablePlatesFormatted.push(+availablePlates)
  } else if (availablePlates) {
    // if it's not a string, it's a string array
    availablePlatesFormatted = availablePlates.map((item) => +item)
  } else {
    availablePlatesFormatted = undefined
  }

  console.log(
    targetWeightFormatted,
    barWeightFormatted,
    availablePlatesFormatted
  )

  const plates = getPlatesForWeight(
    targetWeightFormatted,
    barWeightFormatted,
    availablePlatesFormatted
  )
  console.log('plates', plates)

  res.status(200).json(plates)
}
