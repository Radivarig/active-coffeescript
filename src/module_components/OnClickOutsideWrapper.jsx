import React from 'react'
import onClickOutside from 'react-onclickoutside'

export const OnClickOutsideWrapper = onClickOutside(React.createClass({
  handleClickOutside (e) {
    this.props.handleClickOutside(e)
  },

  render () {
    const {
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
