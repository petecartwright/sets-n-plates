import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlatesForWeight } from '@/lib/utils'
import { formatPlateQuery } from '@/lib/formatPlatesQuery'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const barWeight = req.query['barWeight']
  const targetWeight = req.query['targetWeight']
  const availablePlates = req.query['availablePlates']

  if (!targetWeight) {
    res.status(400).json({ error: 'targetWeight is a required parameter' })
    return
  }

  let formattedQuery
  try {
    formattedQuery = formatPlateQuery({
      barWeight,
      weight: targetWeight,
      availablePlates,
    })
  } catch {
    res.status(400).json({ error: 'Unable to generate plates' })
    return
  }

  const plates = getPlatesForWeight(
    formattedQuery.weight,
    formattedQuery.barWeight,
    formattedQuery.availablePlates
  )

  res.status(200).json(plates)
}
