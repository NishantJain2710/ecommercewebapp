import React from 'react'
import { Link } from 'react-router-dom'
const Paginate = ({pages, page, isAdmin=false, keyword = ''}) => {
    var previousPage = 1;
    var nextPage = 1;
    if(page<=1){
        previousPage = 1;
    }else{
        previousPage = page - 1;
    }
    if(page>=pages){
        nextPage = pages;
    }else{
        nextPage = page + 1;
    }
    return pages>1 && (
        <div className='pagination'>
            <Link to={!isAdmin ? keyword ? `/search/${keyword}/page/${previousPage}`: `/page/${previousPage}` : `/admin/productlist/${previousPage}`}>&laquo;</Link>
            {[...Array(pages).keys()].map((x)=>(
                <Link key={x+1} className = { (x+1 === page) ? "active" : ''}  to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}` : `/admin/productlist/${x+1}`} >{x+1}</Link>
            ))}
            <Link to={!isAdmin ? keyword ? `/search/${keyword}/page/${nextPage}`: `/page/${nextPage}` : `/admin/productlist/${nextPage}`}>&raquo;</Link>
        </div>






//         // <div class="pagination">
//         //     {[...Array(pages).keys()].map(x => (
//         //         <Link key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}` : `/admin/productlist/${x+1}`}>
//         //             <Pagination.Item active ={x+1 === page}>{x+1}</Pagination.Item>
//         //         </Link>
//         //     ))}
//             {/* <Pagination>
// {[...Array(pages).keys()].map(x => (
//     <LinkContainer key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}` : `/admin/productlist/${x+1}`}>
//         <Pagination.Item active ={x+1 === page}>{x+1}</Pagination.Item>
//     </LinkContainer>
// ))}
// </Pagination> */}
//         // </div>
    )
}

export default Paginate
