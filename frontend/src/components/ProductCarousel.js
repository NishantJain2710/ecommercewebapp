import React from 'react'

const ProductCarousel = () => {
    var counter=2;
    setInterval(function(){
        if(document.getElementById('radio'+counter)){
            document.getElementById('radio'+counter).checked =true;
            counter++;
            if(counter > 3){
            counter = 1;
            }
        }else{
            counter = 1;
        }
    },8000);
    
     return ( 
        <>
            <div className='slider'>
                <div className='slides'>
                    <input type='radio' name='radio-btn' id='radio1'/>
                    <input type='radio' name='radio-btn' id='radio2' />
                    <input type='radio' name='radio-btn' id='radio3' />

                    <div className='slide first'>
                        <img src='./img/slider/image1.jpg' alt=''/>
                    </div>
                    
                    <div className='slide'>
                        <img src='./img/slider/image2.jpg'alt='' />
                    </div>
                    
                    <div className='slide'>
                        <img src='./img/slider/image3.jpg' alt=''/>
                    </div>
                    <div className='navigation-auto'>
                        <div className='auto-btn1'></div>
                        <div className='auto-btn2'></div>
                        <div className='auto-btn3'></div>
                    </div>
                </div>
                <div className='navigation-manual'>
                    <label htmlFor='radio1' className='manual-btn'></label>
                    <label htmlFor='radio2' className='manual-btn'></label>
                    <label htmlFor='radio3' className='manual-btn'></label>
                </div>
            </div>
        </>
     )

   
}

export default ProductCarousel