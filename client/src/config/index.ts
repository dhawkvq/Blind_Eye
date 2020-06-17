import PouchDB from 'pouchdb'

export const db = new PouchDB('kittens')
export const WLDB = new PouchDB('watch_later')