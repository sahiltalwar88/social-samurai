import { FormControls } from '@lanetix/unum'

const renderTweet = tweet => {
  return <span>{tweet}</span>
}

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormControls } from '@lanetix/unum'

const renderTweet = tweet => {
  return <span>{tweet}</span>
}

const Tweets = (props) => {
  return props.tweets.map(tweet => renderTweet(tweet))
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
}

export default connect(
  ({ tweets }) => ({ tweets })
)(Tweets)
