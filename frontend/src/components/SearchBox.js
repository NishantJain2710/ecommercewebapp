import React,{useState} from 'react'
const SearchBox = ({history}) => {
    const [keyword, setKeyWord] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            console.log('hello')
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input type='search' name='q' className='search' onChange={(e)=> setKeyWord(e.target.value)} placeholder='Search Products...'/>
            <button type='submit' className='search-btn'>Search</button>
        </form>
    )
}

export default SearchBox
