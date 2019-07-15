import { GlobalActions } from './global/globalActionTypes'

export default RootActions

// The following type must remain at the bottom of this file in order for the
// generator to properly append new actions to it.
// prettier-ignore
type RootActions =
	| { type: 'REMOVE_ME' }
	| GlobalActions
