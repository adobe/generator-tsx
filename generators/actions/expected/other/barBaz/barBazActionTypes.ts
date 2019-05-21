import Action from '../Action'

export const QUX_QUUX = 'QUX_QUUX'
export interface QuxQuux extends Action<typeof QUX_QUUX> {}

export type BarBazActions = QuxQuux
