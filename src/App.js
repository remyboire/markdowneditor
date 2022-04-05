import React from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import DownloadFile from './components/DownloadFile'
import data from './assets/data'
import { nanoid } from 'nanoid'
import useLocalStorage from 'use-local-storage'

// MARKDOWN EDITOR
// HEADER avec menu burger, logo, document name, delete, save
// editor header -> preview

// SIDEBAR my documents
// toggle dark mode

// const documents is an state object
// each document has a name, content, and a date
// documents are stored in local storage
// local storage is a stringified JSON object

export default function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

	function switchTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}
	const [docs, setDocs] = React.useState(localStorage.getItem('docs') ? JSON.parse(localStorage.getItem('docs')) : data)

	const [currentDoc, setCurrentDoc] = React.useState(localStorage.getItem('currentDoc') ? localStorage.getItem('currentDoc') : docs[0].id)

	const [viewSidebar, setViewSidebar] = React.useState(localStorage.getItem('viewSidebar') ? JSON.parse(localStorage.getItem('viewSidebar')) : false)
	const [changesSaved, setChangesSaved] = React.useState(false)

	const newDoc = {
		id: nanoid(),
		name: 'New Document',
		createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
		modifiedAt: new Date().toLocaleString('en-US'),
		content: '',
	}

	function handleNewDoc() {
		setDocs((prevDocs) => [newDoc, ...prevDocs])
		setCurrentDoc(newDoc.id)
	}
	// console.log(docs)
	function handleSelectDoc(doc) {
		setCurrentDoc(doc)
	}
	function handleChanges(value) {
		console.log('handle changes')
		setToFirstPlace()
		setChangesSaved(() => false)
		setDocs((prevDocs) => {
			const newDocs = [...prevDocs]
			Object.defineProperties(newDocs.filter((doc) => doc.id === currentDoc)[0], {
				content: {
					value: value,
				},
			})
			return newDocs
		})
	}
	function handleChangeName(e) {
		setToFirstPlace()

		setDocs((prevDocs) => {
			const newDocs = [...prevDocs]
			Object.defineProperties(newDocs.filter((doc) => doc.id === currentDoc)[0], {
				name: {
					value: e.target.value,
				},
			})
			return newDocs
		})
	}

	function setToFirstPlace() {
		const newDocs = [...docs]
		const currentDocIndex = newDocs.findIndex((doc) => doc.id === currentDoc)
		const Doc = newDocs.splice(currentDocIndex, 1)
		newDocs.unshift(Doc[0])
		setDocs(newDocs)
	}
	function handleDeleteDoc(doc) {
		const newDocs = [...docs]
		newDocs.splice(
			newDocs.findIndex((document) => document.id === doc),
			1
		)
		console.log(currentDoc)
		console.log(doc)
		if (currentDoc === doc) setCurrentDoc(newDocs[0].id)
		if (newDocs.length === 0) {
			newDocs.push(newDoc)
		}

		setDocs(newDocs)
	}

	function toggleSidebar() {
		setViewSidebar(!viewSidebar)
	}

	React.useEffect(() => {
		localStorage.setItem('currentDoc', currentDoc)
	}, [currentDoc])

	function handleSaveClick() {
		localStorage.setItem('docs', JSON.stringify(docs))
		setChangesSaved(true)
	}

	React.useEffect(() => {
		localStorage.setItem('viewSidebar', viewSidebar)
	}, [viewSidebar])

	return (
		<div className='App' data-theme={theme}>
			<Sidebar
				docs={docs}
				currentDoc={currentDoc}
				handleNewDoc={handleNewDoc}
				handleSelectDoc={handleSelectDoc}
				handleDeleteDoc={handleDeleteDoc}
				viewSidebar={viewSidebar}
				theme={theme}
				switchTheme={switchTheme}
			/>

			<main className={viewSidebar ? 'main sidebar-open' : 'main'} role='main'>
				<Header
					docs={docs}
					currentDoc={currentDoc}
					handleChangeName={handleChangeName}
					handleDeleteDoc={handleDeleteDoc}
					handleSaveClick={handleSaveClick}
					handletoggleSidebar={toggleSidebar}
					changesSaved={changesSaved}
				/>
				<Editor docs={docs} currentDoc={currentDoc} handleChanges={handleChanges} />
				{changesSaved ? <DownloadFile docs={docs} currentDoc={currentDoc} /> : null}
			</main>
		</div>
	)
}
