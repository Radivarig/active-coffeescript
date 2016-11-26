import React from 'react'
import { Provider, connect } from 'react-redux'
import getReduxStore from 'getReduxStore'
import { getAppStateDispatches } from 'reducers/appState'

import { MyEditor } from 'MyEditor'

const AppView = React.createClass({
  render () {
    return (
      <div>

        <MyEditor
          isEdit={this.props.isEdit}
          setIsEdit={this.props.setIsEdit}

          coffeeObject={this.props.coffeeObject}
          setCoffeeObject={this.props.setCoffeeObject}
        />

      </div>
    )
  },
})

const mapStateToProps = (state) => ({
  isEdit: state.appState.get('isEdit'),
  coffeeObject: state.appState.get('coffeeObject'),
})

const mapDispatchToProps = (dispatch) =>
  Object.assign({},
    getAppStateDispatches(dispatch),
)

const ConnectedAppView = connect(
  mapStateToProps,
  mapDispatchToProps
) (AppView)

const App = React.createClass({
  render () {
    return (
      <Provider store={getReduxStore()}>
        <ConnectedAppView />
      </Provider>
    )
  },
})

module.exports = App
