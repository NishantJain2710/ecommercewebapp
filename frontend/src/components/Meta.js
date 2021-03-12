import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Eshop',
    description: 'We sell the best products for cheap price',
    keywords:'ecommerce, electronics, cloths, shoes, shirts,phones'
}

export default Meta
