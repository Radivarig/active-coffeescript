module.exports = {

  getBlockType (editorState) {
    const selection = editorState.getSelection()
    return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  },

}
