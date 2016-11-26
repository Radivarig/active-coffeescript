import React from 'react'
import draftHelpers from 'draftHelpers'

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Quote', style: 'blockquote'},
  {label: '•', style: 'unordered-list-item'},
  {label: '1.', style: 'ordered-list-item'},
  {label: 'Code', style: 'code-block'},
]

const blockLogic = {
  BLOCK_TYPES,

  getBlockStyle (block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote'
      default: return null
    }
  },

  BlockStyleControls (props) {
    const {editorState} = props
    const blockType = draftHelpers.getBlockType(editorState)

    const controls = (type, key) => {
      const active = type.style === blockType
      return (
        <button
          key={key}
          style={{backgroundColor: active ? 'grey' : ''}}
          onClick={() => props.onToggle(type.style)}
        >
          {type.label}
        </button>
      )
    }

    return (
      <div className='RichEditor-controls'>
        <span>
          {BLOCK_TYPES.map(controls)}
        </span>
      </div>
    )
  },
}

module.exports = blockLogic
