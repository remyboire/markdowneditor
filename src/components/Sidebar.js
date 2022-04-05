import React from 'react'
import './sidebar.css'
import { nanoid } from 'nanoid'
import iconDoc from '../assets/icon-document.svg'
import iconDark from '../assets/icon-dark-mode.svg'
import { ReactComponent as IconDark } from '../assets/icon-dark-mode.svg'
import { ReactComponent as IconLight } from '../assets/icon-light-mode.svg'
// import iconLight from '../assets/icon-light-mode.svg'

import iconDelete from '../assets/icon-delete.svg'
import ModalUse from './ModalUse'
import Modal from './Modal'

export default function Sidebar(props) {
	const { docs, currentDoc, handleNewDoc, handleSelectDoc, handleDeleteDoc, viewSidebar, theme, switchTheme } = props
	const { isShowing, toggleModal } = ModalUse()

	const docsNames = docs.map((doc) => (
		<li className={`documents-infos ${currentDoc === doc.id ? 'active' : ''}`} key={nanoid()} onClick={() => handleSelectDoc(doc.id)}>
			<div className='documents-infos-icon' onClick={toggleModal}>
				<img className='document-icon' src={iconDoc} alt='' />
				<img className='document-delete ' src={iconDelete} alt='delete document' />
			</div>
			<div className='documents-infos-text'>
				<div className='documents-infos-date'>{doc.createdAt}</div>
				<div className='documents-infos-name'>{doc.name}</div>
			</div>
		</li>
	))

	return (
		<>
			<nav className={viewSidebar ? 'sidebar sidebar-open' : 'sidebar'} role='navigation'>
				<h1 className='logo logo-mobile'>MARKDOWN</h1>
				<h2 className='heading-S color-500'>MY DOCUMENTS</h2>
				<button className='button width-100' onClick={handleNewDoc}>
					+ New Document
				</button>
				<ul className='documents-list'>{docsNames}</ul>
				<div className='dark-mode-toggle'>
					{/* <img className={`icon icon-dark ${theme === 'dark' ?? 'selected'}`} src={iconDark} alt='' />
}
					{/* <img className={`icon icon-light ${theme === 'dark' ?? 'selected'}`} src={iconLight} alt='' /> */}
					<div className={`icon icon-dark ${theme === 'dark' ? 'selected' : ''}`}>
						<IconDark fill='var(--dark-mode-color)' />
					</div>
					<div className={`toggle ${theme === 'dark' ? 'dark' : 'light'}`} onClick={switchTheme}></div>
					<div className={`icon icon-light ${theme === 'light' ? 'selected' : ''}`}>
						<IconLight fill='var(--dark-mode-color)' />
					</div>
				</div>
				{/* <div className='dark-mode-toggle'>
					<img className={`icon icon-dark ${theme === 'dark' ?? 'selected'}`} src={iconDark} alt='' />
					<div className={`toggle ${theme === 'dark' ? 'dark' : 'light'}`} onClick={switchTheme}></div>
					<img className={`icon icon-light ${theme === 'dark' ?? 'selected'}`} src={iconLight} alt='' />
				</div> */}
				{/* <span className='dark-mode-toggle' onClick={switchTheme}>
					toggle dark mode
				</span> */}
			</nav>
			<Modal isShowing={isShowing} hide={toggleModal} handleDeleteDoc={handleDeleteDoc} docs={docs} currentDoc={currentDoc} />
		</>
	)
}
