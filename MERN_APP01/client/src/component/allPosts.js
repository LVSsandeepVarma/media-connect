import React from 'react'
import Postsslist from './posts'
 import Header from './header'
function allPosts(){
    return(
        <div>
             <div>
            <Header/>
        </div>
        <div>
            <Postsslist/>
        </div>
        </div>
    )
}
export default allPosts