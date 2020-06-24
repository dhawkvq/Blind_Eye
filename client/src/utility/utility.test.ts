import { createEndpoint, formatDuration, formatViewCount, formatPublishDate } from './utility'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

describe('createEndpoint', () => {
  test('returns a string', () => {
    expect(createEndpoint({ type: 'POPULAR' })).toEqual(expect.any(String))
  })

  test('returns error if empty', () => {
    expect(() => createEndpoint())
      .toThrow('Action object must be passed to create endpoint')
  })

  test('returns error when no data is passed for type MULTI_VID|CHANNEL_INFO', () => {
    expect(() => createEndpoint({ type: 'MULTI_VID' }))
      .toThrow('data property required when passing action type: MULTI_VID')
  })

  test('returns error when type CHANNEL_INFO | MULTI_VID is called with data type !== string', () => {
    expect(() => createEndpoint({ type: "MULTI_VID", data: 10 }))
      .toThrow('data arg on action must be of type string')
  })

  test('returns error if type passed is not MULTI_VID | CHANNEL_INFO | POPULAR', () => {
    expect(() => createEndpoint({ type: 'BEES_KNEES' }))
      .toThrow('action type passed was not one of type: POPULAR | MULTI_VID| CHANNEL_INFO')
  })

})

describe('formatDuration', () => {
  test('returns error if type string is not passed to formatDuration', () => {
    expect(() => formatDuration(10))
      .toThrow('time arg passed must be of type string')
  })

  test('returns error if type string is not a valid ISO 8601 date', () => {
    expect(() => formatDuration('APOCALYPSE'))
      .toThrow('not a valid date ISO 8601 date time passed')
  })

  test('returns error if no arg is passed', () => {
    expect(() => formatDuration())
      .toThrow('time arg is required')
  })

  test('returns a string when called with proper arg', () => {
    expect(formatDuration("PT2M7S")).toEqual(expect.any(String))
  })
})

describe('formatViewCount', () => {
  test('throw error if arg is not passed to formatViewCount', () => {
    expect(() => formatViewCount())
      .toThrow('count arg of type string required')
  })

  test('returns error if type string is not passed to formatViewCount', () => {
    expect(() => formatViewCount(10))
      .toThrow('arg count must be of type string')
  })

  test('returns a string when called with proper arg', () => {
    expect(formatViewCount("1000")).toEqual(expect.any(String))
  })

})

describe('formatPublishDate', () => {
  const sampleDate = "2020-06-15T17:00:09Z"
  const properOutput = dayjs(sampleDate).fromNow()
  test('pass it proper arg it will give back a proper output', () => {
    expect(formatPublishDate(sampleDate)).toEqual(properOutput)
  })

  test('to throw error when date string passed is not valid', () => {
    expect(() => formatPublishDate('yes'))
      .toThrow('time passed was not a valid date time')
  })

  test('to throw error if no arg is passed', () => {
    expect(() => formatPublishDate())
      .toThrow('time arg of type string required')
  })

  test('to throw error if arg passed is not of type string', () => {
    expect(() => formatPublishDate(10))
      .toThrow('time arg must be of type string')
  })
})