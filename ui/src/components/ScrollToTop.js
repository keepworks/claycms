import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  // For initial page load
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  // For route transitions
  componentDidUpdate({ location: prevLocation }) {
    const { location } = this.props

    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props

    return children
  }
}

export default withRouter(ScrollToTop)
