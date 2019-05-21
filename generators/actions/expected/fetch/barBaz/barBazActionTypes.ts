import FakeModel from 'models/FakeModel'

import Action from '../Action'

export const FETCH_FAKE_MODEL_REQUEST = 'FETCH_FAKE_MODEL_REQUEST'
export interface FetchFakeModelRequest extends Action<typeof FETCH_FAKE_MODEL_REQUEST> {}

export const FETCH_FAKE_MODEL_SUCCESS = 'FETCH_FAKE_MODEL_SUCCESS'
export interface FetchFakeModelSuccess extends Action<typeof FETCH_FAKE_MODEL_SUCCESS> {
	fakeModel: FakeModel
}

export const FETCH_FAKE_MODEL_FAILURE = 'FETCH_FAKE_MODEL_FAILURE'
export interface FetchFakeModelFailure extends Action<typeof FETCH_FAKE_MODEL_FAILURE> {
	errors: Error[]
}

export type BarBazActions = FetchFakeModelRequest | FetchFakeModelSuccess | FetchFakeModelFailure
