import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlatesForWeight } from '@/lib/utils'
import { formatPlateQuery } from '@/lib/formatPlatesQuery'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const barWeight = req.query['barWeight']
  const targetWeight = req.query['targetWeight']

  if (!targetWeight) {
    res.status(400).json({ error: 'targetWeight is a required parameter' })
    return
  }

  let formattedQuery
  try {
    formattedQuery = formatPlateQuery({
      barWeight,
      targetWeight,
    })
  } catch {
    res.status(400).json({ error: 'Unable to generate plates' })
    return
  }

  const plates = getPlatesForWeight({
    targetWeight: formattedQuery.targetWeight,
    barWeight: formattedQuery.barWeight,
  })

  res.status(200).json(plates)
}
