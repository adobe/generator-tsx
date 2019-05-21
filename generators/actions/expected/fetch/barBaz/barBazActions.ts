import * as fakeClientAPI from 'api/fakeClient'
import FakeModel from 'models/FakeModel'
import ResponseError from 'models/ResponseError'

import ThunkAction from '../ThunkAction'

import * as types from './barBazActionTypes'

export function fetchFakeModel(): ThunkAction<void> {
	return async dispatch => {
		dispatch(fetchFakeModelRequest())
		try {
			dispatch(fetchFakeModelSuccess(await fakeClientAPI.fetchFakeModel()))
		} catch (errors) {
			dispatch(fetchFakeModelFailure(errors))
		}
	}

	function fetchFakeModelRequest(): types.FetchFakeModelRequest {
		return { type: types.FETCH_FAKE_MODEL_REQUEST }
	}

	function fetchFakeModelSuccess(fakeModel: FakeModel): types.FetchFakeModelSuccess {
		return { type: types.FETCH_FAKE_MODEL_SUCCESS, fakeModel }
	}

	function fetchFakeModelFailure(errors: ResponseError[]): types.FetchFakeModelFailure {
		return { type: types.FETCH_FAKE_MODEL_FAILURE, errors }
	}
}
