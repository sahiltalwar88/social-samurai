import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormControls } from '@lanetix/unum'

import { fetchSearchTerm, setSearchTerm } from './actions'

class SearchTerm extends Component {
  constructor () {
    super()
    this.state = { searchTerm: undefined }
  }

  componentWillMount () {
    this.props.fetchSearchTerm()
  }

  onChange (e) {
    this.setState({ searchTerm: e.target.value })
  }

  updateSearchTerm (e) {
    const newSearchTerm = e.target.value
    if (e.key === 'Enter') {
      this.props.setSearchTerm(this.props.contentId, newSearchTerm)
    }

    if (e.key === 'Escape') {
      e.nativeEvent.stopImmediatePropagation()

      this.setState({ searchTerm: this.props.searchTerm })
    }
  }

  render () {
    const searchTerm = this.state.searchTerm || this.props.searchTerm
    return <FormControls.Text autoFocus block={false} label='Search Term'
      onChange={this.onChange.bind(this)} onKeyUp={this.updateSearchTerm.bind(this)} value={searchTerm} />
  }
}

SearchTerm.propTypes = {
  contentId: PropTypes.number.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
}

export default connect(
  ({ searchTerm: { contentId, searchTerm } }) => ({ contentId, searchTerm }),
  (dispatch) => bindActionCreators({ fetchSearchTerm, setSearchTerm }, dispatch)
)(SearchTerm)
