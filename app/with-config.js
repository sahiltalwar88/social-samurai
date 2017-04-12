import React from 'react'
import config from 'config'

export const configContextType = {
  config: React.PropTypes.shape({
    appApiName: React.PropTypes.string.isRequired,
    contentId: React.PropTypes.string.isRequired,
    jwt: React.PropTypes.string.isRequired,
    recordId: React.PropTypes.string.isRequired,
    recordTypeApiName: React.PropTypes.string.isRequired,
    spaceID: React.PropTypes.string.isRequired
  })
}

const getDisplayName = (Component) => Component.displayName || Component.name || 'Anonymous Component'

export class ConfigContextProvider extends React.Component {
  getChildContext () {
    return { config }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

ConfigContextProvider.displayName = 'ConfigContextProvider'
ConfigContextProvider.childContextTypes = configContextType

const withConfig = (DecoratedComponent) => {
  const Component = (props, { config }) =>
    <DecoratedComponent config={config} {...props} />
  Component.contextTypes = configContextType
  Component.displayName = `WithConfig(${getDisplayName(DecoratedComponent)})`

  return Component
}

export default withConfig
