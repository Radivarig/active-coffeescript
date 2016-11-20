import React, { Component } from 'react'
import { fromJS } from 'immutable'

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import 'css/mentionsStyles.css'

const mentions = fromJS([
  {name: 'test3'},
  {name: 'test4'},
])

const mentionComponent = (props) =>
// TODO
// if (exists) show variable value
// else show variable name in red
  (
    <span className={props.className}>
      {props.mentionPrefix}
      {props.decoratedText}
    </span>
  )

const Entry = (props) => {

  const {
    mention,
    theme,
    searchValue,
    ...parentProps
  } = props

  return (
    <div {...parentProps}>
      {mention.get('name')}
    </div>
  )
}

export const mentionsPlugin = createMentionPlugin({
  mentions,
  mentionComponent,
  // positionSuggestions, not working (?)
  entityMutability: 'IMMUTABLE',
  theme: {mentionSuggestionsEntryFocused: 'mentionSuggestionsEntryFocused'},
  mentionPrefix: '#',
  mentionTrigger: '#',
})

const { MentionSuggestions } = mentionsPlugin

export const Mentions = React.createClass({
  onSearchChange ({value}) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    })
  },

  getInitialState () {
    return {
      suggestions: mentions,
    }
  },

  render () {

    return (
    <MentionSuggestions
      onSearchChange={this.onSearchChange}
      suggestions={this.state.suggestions}
      entryComponent={Entry}
    />
    )
  },
})
