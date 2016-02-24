/**
 * @generated
 */
var React = require("React");
var Layout = require("DocsLayout");
var content = `
This article discusses the API and props of the core controlled contentEditable
component itself, \`Editor\`. Props are defined within
[\`DraftEditorProps\`](https://github.com/facebook/draft-js/blob/master/src/component/base/DraftEditorProps.js).

## Props

### Basics

See [API Basics](/draft-js/docs/quickstart-api-basics.html) for an introduction.

#### editorState
\`\`\`
editorState: EditorState
\`\`\`
The \`EditorState\` object to be rendered by the \`Editor\`.

#### onChange
\`\`\`
onChange: (editorState: EditorState) => void
\`\`\`
The \`onChange\` function to be executed by the \`Editor\` when edits and selection
changes occur.

### Presentation (Optional)

#### placeholder
\`\`\`
placeholder?: string
\`\`\`
Optional placeholder string to display when the editor is empty.

Note: You can use CSS to style or hide your placeholder as needed. For instance,
in the [rich editor example](https://github.com/facebook/draft-js/tree/master/examples/rich),
the placeholder is hidden when the user changes block styling in an empty editor.
This is because the placeholder may not line up with the cursor when the style
is changed.

#### textAlignment
\`\`\`
textAlignment?: DraftTextAlignment
\`\`\`
Optionally set the overriding text alignment for this editor. This alignment value will
apply to the entire contents, regardless of default text direction for input text.

You may use this if you wish to center your text or align it flush in one direction
to fit it within your UI design.

If this value is not set, text alignment will be based on the characters within
the editor, on a per-block basis.

#### blockRendererFn
\`\`\`
blockRendererFn?: (block: ContentBlock) => ?Object
\`\`\`
Optionally set a function to define custom block rendering. See
[Advanced Topics: Block Components](/draft-js/docs/advanced-topics-block-components.html)
for details on usage.

#### blockStyleFn
\`\`\`
blockStyleFn?: (block: ContentBlock) => string
\`\`\`
Optionally set a function to define class names to apply to the given block
when it is rendered. See
[Advanced Topics: Block Styling](/draft-js/docs/advanced-topics-block-styling.html)
for details on usage.

#### customStyleMap
\`\`\`
customStyleMap?: Object
\`\`\`
Optionally define a map of inline styles to apply to spans of text with the specified
style. See
[Advanced Topics: Inline Styles](/draft-js/docs/advanced-topics-inline-styles.html)
for details on usage.

### Behavior (Optional)

#### readOnly
\`\`\`
readOnly?: boolean
\`\`\`
Set whether the editor should be rendered as static DOM, with all editability
disabled.

This is useful when supporting interaction within
[custom block components](/draft-js/docs/advanced-topics-block-components.html)
or if you just want to display content for a static use case.

Default is \`false\`.

#### spellCheck
\`\`\`
spellCheck?: boolean
\`\`\`
Set whether spellcheck is turned on for your editor.

Note that in OSX Safari, enabling spellcheck also enables autocorrect, if the user
has it turned on. Also note that spellcheck is always disabled in IE, since the events
needed to observe spellcheck events are not fired in IE.

Default is \`false\`.

#### stripPastedStyles
\`\`\`
stripPastedStyles?: boolean
\`\`\`
Set whether to remove all information except plaintext from pasted content.

This should be used if your editor does not support rich styles.

Default is \`false\`.

### DOM and Accessibility (Optional)

#### tabIndex
#### ARIA props

These props allow you to set accessibility properties on your editor. See
[DraftEditorProps](https://github.com/facebook/draft-js/blob/master/src/component/base/DraftEditorProps.js) for the exhaustive list of supported attributes.

### Cancelable Handlers (Optional)

These prop functions are provided to allow custom event handling for a small
set of useful events. By returning true from your handler, you indicate that
the event is handled and the Draft core should do nothing more with it. By returning
false, you defer to Draft to handle the event.

#### handleReturn
\`\`\`
handleReturn?: (e: SyntheticKeyboardEvent) => boolean
\`\`\`
Handle a \`RETURN\` keydown event. Example usage: Choosing a mention tag from a
rendered list of results to trigger applying the mention entity to your content.

#### handleKeyCommand
\`\`\`
handleKeyCommand?: (command: string) => boolean
\`\`\`
Handle the named editor command. See
[Advanced Topics: Key Bindings](/draft-js/docs/advanced-topics-key-bindings.html)
for details on usage.

#### handleBeforeInput
\`\`\`
handleBeforeInput?: (e: SyntheticInputEvent) => boolean
\`\`\`
Handle a \`beforeInput\` event before character insertion occurs within the editor.
Example usage: After a user has typed \`- \` at the start of a new block, you might
convert that \`ContentBlock\` into an \`unordered-list-item\`.

At Facebook, we also use this to convert typed ASCII quotes into "smart" quotes,
and to convert typed emoticons into images.

#### handlePastedFiles
\`\`\`
handlePastedFiles?: (files: Array<Blob>) => boolean
\`\`\`
Handle files that have been pasted directly into the editor.

### Key Handlers (Optional)

These prop functions expose common useful key events. Example: At Facebook, these are
used to provide keyboard interaction for mention results in inputs.

#### onEscape
\`\`\`
onEscape?: (e: SyntheticKeyboardEvent) => void
\`\`\`

#### onTab
\`\`\`
onTab?: (e: SyntheticKeyboardEvent) => void
\`\`\`

#### onUpArrow
\`\`\`
onUpArrow?: (e: SyntheticKeyboardEvent) => void
\`\`\`

#### onDownArrow
\`\`\`
onDownArrow?: (e: SyntheticKeyboardEvent) => void
\`\`\`
`
var Post = React.createClass({
  statics: {
    content: content
  },
  render: function() {
    return <Layout metadata={{"id":"api-reference-editor","title":"Editor Component","layout":"docs","category":"API Reference","next":"api-reference-editor-state","permalink":"docs/api-reference-editor.html"}}>{content}</Layout>;
  }
});
module.exports = Post;
