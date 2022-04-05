import React from 'react'
import './sidebar.css'
import { nanoid } from 'nanoid'
import iconDoc from '../assets/icon-document.svg'

export default function Sidebar(props) {
	const { docs, currentDoc, handleNewDoc, handleSelectDoc, viewSidebar } = props

	const docsNames = docs.map((doc) => (
		<li className={`documents-infos ${currentDoc === doc.id ? 'active' : ''}`} key={nanoid()} onClick={() => handleSelectDoc(doc.id)}>
			<div className='documents-infos-icon'>
				<img src={iconDoc} alt='show preview' />
			</div>
			<div className='documents-infos-text'>
				<div className='documents-infos-date'>{doc.createdAt}</div>
				<div className='documents-infos-name'>{doc.name}</div>
			</div>
		</li>
	))

	return (
		<div className={viewSidebar ? 'sidebar sidebar-open' : 'sidebar'}>
			<h2 className='heading-S color-500'>MY DOCUMENTS</h2>
			<button className='button width-100' onClick={handleNewDoc}>
				+ New Document
			</button>
			<ul className='documents-list'>{docsNames}</ul>
			<span className='dark-mode-toggle'>toggle dark mode</span>
		</div>
	)
}
