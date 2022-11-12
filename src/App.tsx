import React, { useState } from 'react';
import FileSelector from './components/FileSelector/FileSelector';
import Editor from './components/Editor/Editor';
import './App.css';
import { stripXMLDeclaration } from './helpers/transformers';

function App() {
	const [file, setFile] = useState<string>('');

	function handleSelect(e: string) {
		setFile(stripXMLDeclaration(e));
	}

	return (
		<div className="App">
			{file ? (
				<Editor contents={file} onClose={() => setFile('')} />
			) : (
				<FileSelector onSelect={(e: string) => handleSelect(e)} />
			)}
		</div>
	);
}

export default App;
