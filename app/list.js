import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createFact,
  fetchList
} from './actions'

class List extends Component {
  componentWillMount () {
    this.props.fetchList()
  }

  render () {
    return (
      <div>
        <button
          onClick={() => { this.props.createFact() }}
        >
          create a fact!
        </button>
        <ul>
          {this.props.list.map(({ id, data: { name } }) => (
            <li key={id}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  createFact: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  })).isRequired
}

export default connect(
  ({ list }) => ({ list }),
  (dispatch) => bindActionCreators(
    {
      createFact,
      fetchList
    },
    dispatch
  )
)(List)
