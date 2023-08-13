import React, { useState } from "react";
import FileSelector from "components/FileSelector/FileSelector";
import Editor from "components/Editor/Editor";
import "./App.css";
import { stripXMLDeclaration } from "helpers/transformers";
import { IFile } from "types";

function App() {
  const [file, setFile] = useState<IFile>();

  function handleSelect(e: IFile) {
    const { title, contents } = e;
    const cleanedContents = stripXMLDeclaration(contents);
    setFile({ title, contents: cleanedContents });
  }

  return (
    <div className="App">
      {file ? (
        <Editor
          contents={file.contents}
          fileName={file.title}
          onClose={() => setFile(undefined)}
        />
      ) : (
        <FileSelector onSelect={(e: IFile) => handleSelect(e)} />
      )}
    </div>
  );
}

export default App;
