import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isShowing, hide, handleDeleteDoc, docs, currentDoc }) =>
	isShowing
		? ReactDOM.createPortal(
				<>
					<div className='modal-overlay'>
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
									id='deleteConfirmed'
									onClick={() => {
										hide()
										handleDeleteDoc(currentDoc)
									}}
								>
									DELETE DOCUMENT
								</button>
							</div>
						</div>
					</div>
					<style jsx='true'>{`
						.modal-overlay {
							position: fixed;
							top: 0;
							left: 0;
							width: 100vw;
							height: 100vh;
							z-index: 1040;
							background-color: rgba(0, 0, 0, 0.5);
						}

						.modal-wrapper {
							position: fixed;
							top: 0;
							left: 0;
							z-index: 1050;
							width: 100%;
							height: 100%;
							overflow-x: hidden;
							overflow-y: auto;
							outline: 0;
							display: flex;
							align-items: center;
						}

						.modal {
							z-index: 100;
							background: #fff;
							position: relative;
							margin: auto;
							border-radius: 5px;
							max-width: 500px;
							width: 80%;
							padding: 1rem;
						}

						.modal-header {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}

						.modal-close-button {
							font-size: 1.4rem;
							font-weight: 700;
							color: #000;
							cursor: pointer;
							border: none;
							background: transparent;
						}
					`}</style>
				</>,
				document.body
		  )
		: null

export default Modal
