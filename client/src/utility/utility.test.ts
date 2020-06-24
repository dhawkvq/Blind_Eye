import { createEndpoint } from './utility'

describe('createEndpoint', () => {
  test('returns a string', () => {
    expect(createEndpoint({ type: 'POPULAR' })).toEqual(expect.any(String))
  })

  test('returns error if empty', () => {
    expect(() => {
      createEndpoint()
    })
    .toThrow('Action object must be passed to create endpoint')
  })

  test('returns error when no data is passed for type MULTI_VID|CHANNEL_INFO', () => {
    expect(() => {
      createEndpoint({ type: 'MULTI_VID' })
    })
    .toThrow('data property required when passing action type: MULTI_VID')
  })

  test('returns error when type CHANNEL_INFO | MULTI_VID is called with data type !== string', () => {
    expect(() => {
      createEndpoint({ type: "MULTI_VID", data: 10 })
    })
    .toThrow('data arg on action must be of type string')
  })

  test('returns error if type passed is not MULTI_VID | CHANNEL_INFO | POPULAR', () => {
    expect(() => {
      createEndpoint({ type: 'BEES_KNEES' })
    })
    .toThrow('action type passed was not one of type: POPULAR | MULTI_VID| CHANNEL_INFO')
  })

})