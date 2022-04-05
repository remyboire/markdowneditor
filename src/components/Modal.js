import React from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

const Modal = ({ isShowing, hide, handleDeleteDoc, docs, currentDoc }) =>
	isShowing
		? ReactDOM.createPortal(
				<>
					<div className='modal-overlay' data-theme={document.querySelector('.App').getAttribute('data-theme')}>
						<div className='modal-wrapper'>
							<div className='modal'>
								<div className='modal-header'>
									<h3>Delete this document?</h3>
									<button type='button' className='modal-close-button' onClick={hide}>
										<span>&times;</span>
									</button>
								</div>
								<div className='modal-body'>
									Are you sure you want to delete the <em>'{Object.getOwnPropertyDescriptors(docs.filter((doc) => doc.id === currentDoc)[0])['name'].value}'</em>{' '}
									document and its contents? This action cannot be reversed.
								</div>
								<button
									className='button'
									id='deleteConfirmed'
									onClick={() => {
										hide()
										handleDeleteDoc(currentDoc)
									}}
								>
									Confirm & Delete
								</button>
							</div>
						</div>
					</div>
				</>,
				document.body
		  )
		: null

export default Modal
