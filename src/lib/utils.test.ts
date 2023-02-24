import { getPlatesForWeight } from './utils'

describe('Utils - getPlateForWeight', () => {
  it('returns [] if weight === bar', () => {
    const plates = getPlatesForWeight(35, 35)
    expect(plates).toEqual([])
  })

  it('returns [] if weight is in a weird increment', () => {
    const plates = getPlatesForWeight(46.11)
    expect(plates).toEqual([])
  })

  it('returns [] if too big', () => {
    const plates = getPlatesForWeight(1001)
    expect(plates).toEqual([])
  })

  it('returns correct weights when requested', () => {
    let plates = getPlatesForWeight(55, 45)
    expect(plates).toEqual([5])

    plates = getPlatesForWeight(135)
    expect(plates).toEqual([45])

    plates = getPlatesForWeight(222.5)
    expect(plates).toEqual([45, 25, 10, 5, 2.5, 1.25])

    plates = getPlatesForWeight(315)
    expect(plates).toEqual([45, 45, 45])

    plates = getPlatesForWeight(185)
    expect(plates).toEqual([45, 25])
  })

  it('returns correct weights with alternate plate setups', () => {
    let plates = getPlatesForWeight(95, 45, [5])
    expect(plates).toEqual([5, 5, 5, 5, 5])
  })
})
