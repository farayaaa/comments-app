'use client'

import { redirect } from 'next/navigation';


export default function AddData() {

    const handleSubmition = async (event) => {

        event.preventDefault();

        const formData = {
            "name":event.target.inputName.value,
            "email":event.target.inputEmail.value,
            "body":event.target.inputComment.value
        }

        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({'data': formData, 'flag': 'single'}),
        });

        if (formData) {
            redirect('/dashboard')
        } else {
            redirect('/');
        }
    };

    return (
        <div>
            <div className='row m-0 center-screen'>
                <div className='col-lg-12 d-flex justify-content-center'>
                    <div className='col-md-6 card align-items-center p-4'>
                        <div className='card-body w-100'>
                            <form onSubmit={handleSubmition}>
                                <div className="d-flex justify-content-center mb-3 pb-1">
                                    <h3 className="fw-bold mb-0">Create New Comment</h3>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="nameLabel">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="inputName"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="emailLabel">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="inputEmail"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="commentLabel">Comment</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        name="inputComment"
                                        rows="5"
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-primary w-100">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}