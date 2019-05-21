import { BarBazActions } from './barBaz/barBazActionTypes'
import { GlobalActions } from './global/globalActionTypes'

export default RootActions

// prettier-ignore
type RootActions =
	| GlobalActions
	| BarBazActions
