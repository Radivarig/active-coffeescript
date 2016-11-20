import React from 'react'
import { Provider, connect } from 'react-redux'
import getReduxStore from 'getReduxStore'
import { getRequestResponseDispatches } from 'reducers/requestResponse'

const AppView = React.createClass({
  render () {
    const style = {
      backgroundColor: 'yellow',
    }

    const varname = this.props.decoratedText.slice(1)

    let payload =
      <span>
        {varname}
      </span>

    const propertyNames = Object.getOwnPropertyNames(this.props.coffeeObject)

    console.log('varname', this.props.mentionPrefix, varname, propertyNames)
    if (propertyNames.indexOf(varname) > -1) {
      if (! this.props.isEdit) {
        payload =
          <span>
            {this.props.coffeeObject[varname]}
          </span>
      }
    }
    else {
      style.backgroundColor = 'red'
    }

    return (
      <span style={style} className={this.props.className}>
        {payload}
      </span>
    )
  },
})

const mapStateToProps = (state) => {
  const s = state.requestResponse
  return {
    coffeeObject: s.get('coffeeObject'),
    isEdit: s.get('isEdit'),
  }
}
const mapDispatchToProps = (dispatch) =>
   Object.assign(getRequestResponseDispatches(dispatch), {
   })

const ConnectedAppView = connect(
  mapStateToProps,
  mapDispatchToProps
) (AppView)

const App = React.createClass({
  render () {
    console.log('govn', this.props)
    return (
      <Provider store={getReduxStore()}>
        <ConnectedAppView {...this.props} />
      </Provider>
    )
  },
})

module.exports = App
