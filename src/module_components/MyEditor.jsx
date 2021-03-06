import React, { Component } from 'react'

import { EditorState, RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'

import editorStyles from 'css/editorStyles.css'
import codeLineNumberStyles from 'css/codeLineNumberStyles.css'

import PrismDecorator from 'draft-js-prism'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-coffeescript'

import blockLogic from 'blockLogic'
import { OnClickOutsideWrapper } from 'OnClickOutsideWrapper'

import { UndoButton, RedoButton, undoPlugin } from 'DraftPlugins/Undo'
import { Mentions, mentionsPlugin } from 'DraftPlugins/Mentions'
import { CoffeeObjectMentions, coffeeObjectMentionsPlugin } from 'DraftPlugins/CoffeeObjectMentions'

import draftHelpers from 'draftHelpers'

const plugins = [
  undoPlugin,
  mentionsPlugin,
  coffeeObjectMentionsPlugin,
]

export const MyEditor = React.createClass({
  getInitialState () {
    return {
      isFocused: false,
      editorState: EditorState.createEmpty(),
    }
  },

  onChange (editorState) {
    this.setState({
      editorState,
      codeText: this.getCodeText(editorState),
    })
  },

  handleToggleBlock (blockType, isHover) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
    this.setIsEditAndFocus()
  },

  setIsEditAndFocus () {
    if (! this.props.isEdit)
      this.props.setIsEdit(true)
    else this.focus()
  },

  getCodeText (editorState) {
    const contentState = editorState.getCurrentContent()
    let codeText = ''
    contentState.getBlockMap().forEach((x) => {
      if (x.getType() === 'code-block')
        codeText += `\n${x.getText()}`
    })
    return codeText
  },

  getIsReadOnly () {
    return (! this.props.isEdit)
  },

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.isEdit !== this.props.isEdit && this.props.isEdit)
      this.setIsEditAndFocus()
  },

  handleDoubleClickEditor (e) {
    if (this.props.isEdit)
      return
    if (this.firstClick) {
      // double click happened
      this.setIsEditAndFocus()
    }
    else {
      this.firstClick = true
      setTimeout(() => (this.firstClick = false), 500)
    }
  },

  handleClickOutsideEditor () {
    this.setState({isFocused: false}, () =>
      this.props.setIsEdit(false)
    )
  },

  focus () {
    this.setState({isFocused: true}, () =>
      this.editor.focus()
    )
  },

  handleOnBlur () {
    this.setState({isFocused: false})
  },

  toggleIsEdit () {
    this.props.setIsEdit(! this.props.isEdit)
  },

  render () {
    const {editorState} = this.state

    let className = 'RichEditor-editor'
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    const editorPlaceholder = this.props.isEdit ? 'Type ...'
      : 'Double click to enter edit mode ...'

    return (
      <OnClickOutsideWrapper
        onClick={this.handleDoubleClickEditor}
        handleClickOutside={this.handleClickOutsideEditor}
      >
        <div className='RichEditor-root'>

          <button
            onClick={this.toggleIsEdit}
            style={{backgroundColor: this.props.isEdit ? 'grey' : ''}}
          >
          Edit mode
        </button>

          <br />

          <blockLogic.BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.handleToggleBlock}
          />

          <div className={className}>

            <Editor
              placeholder={editorPlaceholder}
              editorState={this.state.editorState}
              onChange={this.onChange}
              onBlur={this.handleOnBlur}
              plugins={plugins}
              decorators={[
                new PrismDecorator({defaultSyntax: 'coffeescript'}),
              ]}
              ref={(editor) => {this.editor = editor}}
              blockStyleFn={blockLogic.getBlockStyle}
              readOnly={this.getIsReadOnly()}
            />

            <CoffeeObjectMentions
              disabled={draftHelpers.getBlockType(editorState) === 'code-block'}
              codeText={this.state.codeText}
              onSuccess={this.props.setCoffeeObject}
              onError={(error) => {console.log({error})}}
            />

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
