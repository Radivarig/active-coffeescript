import React, { Component } from 'react'

import { EditorState, RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import editorStyles from 'css/editorStyles.css'

import blockLogic from 'blockLogic'
import { OnClickOutsideWrapper } from 'OnClickOutsideWrapper'

import { UndoButton, RedoButton, undoPlugin } from 'DraftPlugins/Undo'
import { Mentions, mentionsPlugin } from 'DraftPlugins/Mentions'
import { CoffeeObjectMentions, coffeeObjectMentionsPlugin } from 'DraftPlugins/CoffeeObjectMentions'

const plugins = [
  undoPlugin,
  mentionsPlugin,
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

  handleToggleBlock (blockType, isHover) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  },

  getCodeText () {
    var contentState = this.state.editorState.getCurrentContent()
    var codeText = ''
    contentState.getBlockMap().forEach((x) => {
      if (x.getType() === 'code-block')
        codeText += '\n' + x.getText()
    })
    return codeText
  },

  getReadOnly () {
    return ! this.state.isEdit
  },

  handleDoubleClickEditor (e) {
    if (this.state.isEdit)
      return
    if (this.firstClick) {
      // double click happened
      this.setState({isEdit: true})
    }
    else {
      this.firstClick = true
      setTimeout(() => (this.firstClick = false), 500)
    }
  },

  handleClickOutsideEditor (e) {
    this.setState({isEdit: false})
  },

  render () {
    const {editorState} = this.state

    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    const editorPlaceholder = this.state.isEdit ? 'Type ...'
      : 'Double click to enter edit mode ...'

    return (
      <OnClickOutsideWrapper
        onClick={this.handleDoubleClickEditor}
        handleClickOutside={this.handleClickOutsideEditor}
      >

      <div className='RichEditor-root'>

        <button
          onClick={() => this.setState({isEdit: !this.state.isEdit})}
          style={{backgroundColor: this.state.isEdit ? 'grey' : ''}}
        >
          Edit mode
        </button>
        <br/>

        <blockLogic.BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.handleToggleBlock}
        />

        <div className={className}>

          <Editor
            placeholder={editorPlaceholder}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element }}
            blockStyleFn={blockLogic.getBlockStyle}
            readOnly={this.getReadOnly()}
          />

          <CoffeeObjectMentions
            codeText={this.getCodeText()}
            onSuccess={(coffeeObject) => {}}
            onError={(error) => {}}
          />
          <Mentions />

        </div>

        <div className='options'>
          <UndoButton />
          <RedoButton />
        </div>

      </div>

      </OnClickOutsideWrapper>
    )
  },
})
