import themes from 'themes'

import Action from '../Action'

export const PERSIST_THEME = 'PERSIST_THEME'
export interface PersistTheme extends Action<typeof PERSIST_THEME> {
	name: keyof typeof themes
}

export type GlobalActions = PersistTheme
