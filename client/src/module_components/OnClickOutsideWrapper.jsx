import React from 'react'
import onClickOutside from 'react-onclickoutside'

export const OnClickOutsideWrapper = onClickOutside(React.createClass({
  handleClickOutside (e) {
    this.props.handleClickOutside(e)
  },

  render () {
    let {
      handleClickOutside,
      disableOnClickOutside,
      enableOnClickOutside,
      ...rest
    } = this.props
    return (
      <span {...rest}>
        {this.props.children}
      </span>
    )
  },
}))
