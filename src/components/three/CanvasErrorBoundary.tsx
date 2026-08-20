import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface State {
  hasError: boolean
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('HeroScene failed to render, falling back to static visual.', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
