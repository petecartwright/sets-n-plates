import { assert, describe, expect, it } from 'vitest'
import { getPlatesForWeight } from './utils'

describe('Utils - getPlateForWeight', () => {
  it('returns [] if weight === bar', () => {
    const plates = getPlatesForWeight(35, 35)
    assert.deepEqual(plates, [])
  })

  it('returns [] if weight is in a weird increment', () => {
    const plates = getPlatesForWeight(46.11)
    assert.deepEqual(plates, [])
  })

  it('returns [] if too big', () => {
    const plates = getPlatesForWeight(1001)
    assert.deepEqual(plates, [])
  })

  it('returns correct weights when requested', () => {
    let plates = getPlatesForWeight(55, 45)
    assert.deepEqual(plates, [5])

    plates = getPlatesForWeight(135)
    assert.deepEqual(plates, [45])

    plates = getPlatesForWeight(222.5)
    assert.deepEqual(plates, [45, 25, 10, 5, 2.5, 1.25])

    plates = getPlatesForWeight(315)
    assert.deepEqual(plates, [45, 45, 45])

    plates = getPlatesForWeight(185)
    assert.deepEqual(plates, [45, 25])
  })

  it('returns correct weights with alternate plate setups', () => {
    let plates = getPlatesForWeight(95, 45, [5])
    assert.deepEqual(plates, [5, 5, 5, 5, 5])
  })
})
