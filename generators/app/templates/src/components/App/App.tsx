import React, { FC } from 'react'

import GlobalErrorBoundary from 'components/GlobalErrorBoundary'
import Routes from 'components/Routes'

const App: FC = () => (
	<GlobalErrorBoundary>
		<Routes />
	</GlobalErrorBoundary>
)

export default App
