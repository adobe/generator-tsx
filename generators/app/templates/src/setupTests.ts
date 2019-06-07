import { GlobalWithFetchMock } from 'jest-fetch-mock'
import '@testing-library/react/cleanup-after-each'

const customGlobal = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetch.mockResponse(JSON.stringify([]))
