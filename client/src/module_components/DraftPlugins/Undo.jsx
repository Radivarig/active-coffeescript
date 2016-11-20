import createUndoPlugin from 'draft-js-undo-plugin'

export const undoPlugin = createUndoPlugin()
export const { UndoButton, RedoButton } = undoPlugin
