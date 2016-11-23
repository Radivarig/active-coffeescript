import React from 'react'
import { Provider, connect } from 'react-redux'
import getReduxStore from 'getReduxStore'
import { getRequestResponseDispatches } from 'reducers/requestResponse'
import { getAppStateDispatches } from 'reducers/appState'

import { MyEditor } from 'MyEditor'

const AppView = React.createClass({
  render () {
    const buttonText = this.props.isFetching ?
      'Please wait..'
    : 'Send'

    const response = this.props.isError ?
      'Error happened. Please try again.'
    : this.props.response

    const onChangeRequest = (e) => this.props.changeRequest(e.target.value)
    const onSubmitRequest = this.props.submitRequest

    return (
      <div>

        <textarea
          cols={25} rows={5}
          value={this.props.request}
          onChange={onChangeRequest}
        />

        <button
          disabled={this.props.isFetching}
          onClick={onSubmitRequest}
        >
          {buttonText}
        </button>

        <textarea
          cols={25} rows={5}
          value={response}
          disabled
        />

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
  request: state.requestResponse.get('request'),
  response: state.requestResponse.get('response'),
  isFetching: state.requestResponse.get('isFetching'),
  isError: state.requestResponse.get('isError'),

  isEdit: state.appState.get('isEdit'),
  coffeeObject: state.appState.get('coffeeObject'),
})
const mapDispatchToProps = (dispatch) =>
  Object.assign({},
    getRequestResponseDispatches(dispatch),
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
        <ConnectedAppView/>
      </Provider>
    )
  },
})

module.exports = App
