import React, { useState } from 'react';
import FileSelector from './components/FileSelector/FileSelector';
import FileDisplay from './components/FileDisplay/FileDisplay';
import './App.css';

function App() {
	const [file, setFile] = useState<string>('');

	function handleSelect(e: string) {
		setFile(e);
	}

	return (
		<div className="App">
			{file ? (
				<FileDisplay contents={file} />
			) : (
				<FileSelector onSelect={(e: string) => handleSelect(e)} />
			)}
		</div>
	);
}

export default App;
