import React, { Component } from 'react'
import { fromJS } from 'immutable'

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import 'css/mentionsStyles.css'

const mentions = fromJS([
  {name: 'test1'},
  {name: 'test2'},
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

const SuggestionEntry = (props) => {

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

export const coffeeObjectMentionsPlugin = createMentionPlugin({
  mentions,
  mentionComponent,
  // positionSuggestions, not working (?)
  entityMutability: 'IMMUTABLE',
  theme: {mentionSuggestionsEntryFocused: 'mentionSuggestionsEntryFocused'},
  mentionPrefix: '@',
  mentionTrigger: '@',
})

const { MentionSuggestions } = coffeeObjectMentionsPlugin

export const CoffeeObjectMentions = React.createClass({
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
      entryComponent={SuggestionEntry}
    />
    )
  },
})
