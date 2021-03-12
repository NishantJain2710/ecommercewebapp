import React from 'react'

const Message = ({variant, children}) => {
    var bgColor =  ''
    var color = ''
    if(variant==='danger'){
        bgColor = '#ff4d4d'
        color = '#ffffe6'
    }else if(variant==='success'){
        bgColor = '#00cc00'
        color = '#ffffe6'
    }else if(variant ==='info'){
        bgColor = '#CEF6CE'
        color = '#070B19'
    }
    return (
        <>
             <div className="alert" style={{backgroundColor:bgColor , color:color}}>{children}</div> 
        </>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
