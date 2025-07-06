"use client"

import { useState } from 'react'
import { redirect } from 'next/navigation'
import InputForm from '@/components/InputForm';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmition = (event) =>{
        console.log('SUCCESS');
        redirect('/dashboard');
    }

    return (
        <div>
            <div className='container-fluid m-0 primary-background-color'>
                <div className='row m-0 center-screen'>
                    <div className='col-lg-12 d-flex justify-content-center'>
                        <div className='col-md-3 card align-items-center pt-4 pb-4'>
                            <div className='card-body'>
                                <form action={handleSubmition}>
                                    <div className="d-flex justify-content-center mb-3 pb-1">
                                        <h2 className="fw-bold mb-0">Log In</h2>
                                    </div>
                                    <InputForm classes="form-control" type="text" name="inputUsername" holderText="Username"
                                        val={username} onChangeAction={(e) => setUsername (e.target.value)}
                                    />
                                    <InputForm classes="form-control" type="password" name="inputPassword" holderText="Password"
                                        val={password} onChangeAction={(e) => setPassword(e.target.value)}
                                    />
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}