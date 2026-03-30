import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function Editor({
  value = "",
  onChange,
  height = 300,
}) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    height: height,
    toolbarSticky: false,

    buttons: [
      "source","|",
      "bold","italic","underline","strikethrough","|",
      "superscript","subscript","|",
      "font","fontsize","brush","paragraph","|",
      "align","|",
      "ul","ol","outdent","indent","|",
      "link","image","video","table","|",
      "hr","eraser","copyformat","|",
      "symbol","fullsize","print","preview","find","about",
      "|",
      "undo","redo"
    ],

    uploader: {
      insertImageAsBase64URI: true, 
    },

    placeholder: "Start typing...",
  }), [height]);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
}