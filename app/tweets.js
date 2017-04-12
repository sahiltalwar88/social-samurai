import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Buttons } from '@lanetix/unum'

const onClick = (encodedSearchTerm, searchTerm) => {
  console.log('encodedSearchTerm', encodedSearchTerm)
  console.log('searchTerm', searchTerm)
  window.location.href = `/tweets?encodedSearchTerm=${encodedSearchTerm}&searchTerm=${searchTerm}`
}

class Tweets extends Component {
  render () {
    const { searchTerm } = this.props
    const encodedSearchTerm = searchTerm && encodeURIComponent(searchTerm)

    return (
      <Buttons.PillButton icon='check' onClick={() => onClick(searchTerm, encodedSearchTerm)} success>
        Success!
      </Buttons.PillButton>
    )
  }
}

Tweets.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default connect(
  ({ searchTerm: { searchTerm } }) => ({ searchTerm })
)(Tweets)
