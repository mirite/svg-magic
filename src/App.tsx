import {useState} from "react";
import FileSelector from "./components/FileSelector/FileSelector";
import FileDisplay from "./components/FileDisplay/FileDisplay";
import './App.css'

function App() {

	const [file, setFile] = useState<string>("");

	function handleSelect(e: string) {
		setFile(e);
	}

	return (
		<div className="App">
			<FileSelector onSelect={(e: string) => handleSelect(e)}/>
			{file && <FileDisplay contents={file}/>}
		</div>
	)
}

export default App
