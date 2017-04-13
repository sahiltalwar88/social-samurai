import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Timeline } from 'react-twitter-widgets'

class SearchResults extends Component {
  render () {
    const { searchTerm } = this.props

    if (!searchTerm) {
      return null
    }

    const encodedSearchTerm = searchTerm && encodeURIComponent(searchTerm)

    console.log('encodedSearchTerm', encodedSearchTerm)

    return ( null )
  }
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default connect(
  ({ searchTerm: { searchTerm } }) => ({ searchTerm })
)(SearchResults)
