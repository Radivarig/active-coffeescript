import React, { Component } from 'react'
import { fromJS } from 'immutable'

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import 'css/mentionsStyles.css'

import CoffeeScriptToObject from 'coffeescript-to-object'
import MentionComponent from 'MentionComponent'

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
  mentionComponent: MentionComponent,
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
      suggestions: defaultSuggestionsFilter(value, this.state.mentions),
    })
  },

  getInitialState () {
    const mentions = fromJS([])
    return {
      mentions,
      suggestions: mentions,
    }
  },

  render () {
    const onSuccess = (coffeeObject) => {
      const propertyNames = Object.getOwnPropertyNames(coffeeObject)
      const mentions = fromJS(propertyNames.map((x, i) => ({name: x})))
      this.setState({mentions})
      this.props.onSuccess(coffeeObject)
    }

    return (
      <div>
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          entryComponent={SuggestionEntry}
        />
        <CoffeeScriptToObject
          codeText={this.props.codeText}
          onSuccess={onSuccess}
          onError={this.props.onError}
        />
      </div>
    )
  },
})
