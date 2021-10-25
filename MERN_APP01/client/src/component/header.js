import React from 'react'
import './header.css'
function Header(){
    return (
        <div>
            <nav class="header">
                <a className="logo" href="#default"><i className="fa fa-handshake-o icon"></i>InstaClone</a>
        <div class="header-right">
            
            <a href="/login">Logout</a>
        </div>
        </nav>
            </div>

    )
}
export default Header