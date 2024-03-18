import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  fallback: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    const { fallback: Fallback } = this.props

    if (this.state.hasError) {
      return Fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
