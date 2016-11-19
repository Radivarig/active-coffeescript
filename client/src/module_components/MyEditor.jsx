import React, { Component } from 'react'

import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import editorStyles from 'css/editorStyles.css'

import { CoffeeObjectMentions, coffeeObjectMentionsPlugin } from 'DraftPlugins/CoffeeObjectMentions'

const plugins = [
  coffeeObjectMentionsPlugin,
]

export const MyEditor = React.createClass({
  getInitialState () {
    return {
      editorState: EditorState.createEmpty(),
    }
  },

  onChange (editorState) {
    this.setState({
      editorState,
    })
  },

  render () {
    return (
      <div>
        <div className='editor'>

          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element }}
          />

          <CoffeeObjectMentions />

        </div>

      </div>
    )
  },
})
