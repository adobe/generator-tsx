import React from 'react'

export default class GlobalErrorBoundary extends React.Component<
	{},
	{ hasError: boolean }
> {
	public state = { hasError: false }

	static getDerivedStateFromError(_error: Error) {
		return { hasError: true }
	}

	public componentDidCatch(/* error: Error, info: {} */) {
		// todo: logErrorToMyService(error, info)
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>
		}
		return this.props.children
	}
}
