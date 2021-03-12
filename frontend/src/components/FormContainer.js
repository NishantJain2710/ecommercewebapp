import React from 'react'
const FormContainer = ({children}) => {
    return (
        <div className='container'>
            <div className='row-form'>
                <div className='col-form'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormContainer