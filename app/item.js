import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchItem } from './actions'

class Item extends Component {
  componentWillMount () {
    this.props.fetchItem(this.props.id)
  }

  render () {
    const { item } = this.props
    return (
      <div>
        {item && item.data.name}
      </div>
    )
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  fetchItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  })
}

export default connect(
  ({ item }) => ({ item }),
  (dispatch) => bindActionCreators(
    {
      fetchItem
    },
    dispatch
  )
)(Item)
