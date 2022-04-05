import React from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import './editor.css'
import iconShowPreview from '../assets/icon-show-preview.svg'
import iconHidePreview from '../assets/icon-hide-preview.svg'

const converter = new Showdown.Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true,
})

export default function Editor(props) {
	const { docs, currentDoc, handleChanges } = props

	const [selectedTab, setSelectedTab] = React.useState(localStorage.getItem('tab') || 'write')

	function toggleSelectedTab() {
		setSelectedTab(selectedTab === 'write' ? 'preview' : 'write')
	}

	React.useEffect(() => {
		localStorage.setItem('tab', selectedTab)
	}, [selectedTab])

	// get current doc
	const content = Object.getOwnPropertyDescriptors(docs.filter((doc) => doc.id === currentDoc)[0])['content'].value

	return (
		<div className='editor-container'>
			<div className={selectedTab + ' editor-header'}>
				<div className='editor-header-left'>MARKDOWN</div>
				<div className='editor-header-right'>
					<div className='title'>PREVIEW</div>
					<button className='preview-icon' onClick={toggleSelectedTab}>
						<img src={selectedTab === 'preview' ? iconHidePreview : iconShowPreview} alt='show preview' />
					</button>
				</div>
			</div>
			<div className={'react-mde-wrapper ' + selectedTab}>
				<ReactMde
					value={content}
					loadingPreview={<div>Loading...</div>}
					onChange={handleChanges}
					selectedTab={'preview'}
					onTabChange={setSelectedTab}
					toolbarCommands={[['bold', 'italic']]}
					generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
				/>
			</div>
		</div>
	)
}
