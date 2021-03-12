import React from 'react'
import { Link } from 'react-router-dom'
import {CategoryNames, Fashion,Electronics,Appliances,beautyToysAndMore,Home} from '../data/categories'

const Category = () => {
    return (
           <>
           <div className='name-tag'><i className="fas fa-angle-double-left"/> CATEGORIES <i className="fas fa-angle-double-right"/></div>
            <div className='row category'>
                <div className=' dropDown column-lg-6' >
                    <div className='card'>
                        <img src='./img/Mobile.jpg' alt='Mobile Phones' className='card-image'/>
                        <div className='card-title'><Link to='/category/electronics/mobile'>Mobiles</Link></div>
                    </div>
                </div>
                {CategoryNames.map((category)=>(
                    <div key={category.name} className='category dropDown column-lg-6' >
                        <div  className='card'>
                            <img src={category.img} alt={category.name} className='card-image'/>
                            <div className='card-title'><i className="fas fa-angle-down"></i>{category.name}</div>
                        </div>
                        <div className='dropDown-content'>
                            {category.name === 'Fashion' &&( Fashion.map((Fashion)=>(<Link key={Fashion.link} to= {`/category/${category.link}/${Fashion.link}`} >{Fashion.name}</Link>)))}
                            {category.name === 'Home'&&( Home.map((Home)=>(<Link key={Home.link} to= {`/category/${category.link}/${Home.link}`} >{Home.name}</Link>)))}
                            {category.name === 'Electronics' &&( Electronics.map((Electronics)=>(<Link key={Electronics.link} to= {`/category/${category.link}/${Electronics.link}`} >{Electronics.name}</Link>)))}
                            {category.name === 'Appliances' &&( Appliances.map((Appliances)=>(<Link key={Appliances.link} to= {`/category/${category.link}/${Appliances.link}`} >{Appliances.name}</Link>)))}
                            {category.name === 'Beauty,Toys & More' && ( beautyToysAndMore.map((More)=>(<Link key={More.link} to= {`/category/${category.link}/${More.link}`} >{More.name}</Link>)))}
                        </div>
                    </div>
                ))}
            </div>
            </>
    )
}

export default Category
