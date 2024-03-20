import { forwardRef, ComponentType } from 'react'
import ErrorBoundary from '@components/ErrorBoundary'
import { WithErrorBoundaryOptions } from './types'

const withErrorBoundary =
    (options: WithErrorBoundaryOptions) =>
    <P extends Record<string, unknown>>(Component: ComponentType<P>) =>
        forwardRef((props: P, ref) => (
            <ErrorBoundary fallback={options.fallback}>
                <Component {...props} ref={ref} />
            </ErrorBoundary>
        ))

export default withErrorBoundary
