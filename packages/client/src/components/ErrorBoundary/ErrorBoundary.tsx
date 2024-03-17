import { Component, ErrorInfo, ReactNode } from 'react'
import Fallback from './components/Fallback'

interface Props {
  children?: ReactNode
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

  onClearError = () => {
    this.setState({ hasError: false })
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <Fallback clear={this.onClearError} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
