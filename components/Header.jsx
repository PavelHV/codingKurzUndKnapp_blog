import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { getCategories } from '../services'

const Header = (props) => {
    
  return (

    <>
    <nav>
        <Link href="/">
            <img className="logo" src="/images/brand-logo_dark-mode_transparent-bg.png" alt="Coding - kurz und knapp"/>
        </Link>
        <div className="searchbar">
            <svg fill="var(--text-color-2)" xmlns="http://www.w3.org/2000/svg" height="35" width="35"
                viewBox="0 0 50 50">
                <path
                    d="M39.8 42.3 26.55 29.1q-1.45 1.25-3.45 1.95t-4.25.7q-5.5 0-9.325-3.8-3.825-3.8-3.825-9.2 0-5.4 3.825-9.2 3.825-3.8 9.225-3.8 5.4 0 9.2 3.8 3.8 3.8 3.8 9.2 0 2.15-.7 4.15-.7 2-2.05 3.75L42.3 39.8Zm-21-13.95q3.95 0 6.725-2.825Q28.3 22.7 28.3 18.75t-2.775-6.775Q22.75 9.15 18.8 9.15q-4.05 0-6.85 2.825t-2.8 6.775q0 3.95 2.8 6.775t6.85 2.825Z" />
            </svg>
            <input type="text" placeholder="Suche nach einem Tutorial (z.B. CSS Flexbox)" value={props.postFilter} onChange={(e)=>props.handlePostFilter(e.target.value)}/>
        </div>
        <ul>
            <li><button id="search_button">
                <svg fill="var(--text-color-2)" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M39.8 42.3 26.55 29.1q-1.45 1.25-3.45 1.95t-4.25.7q-5.5 0-9.325-3.8-3.825-3.8-3.825-9.2 0-5.4 3.825-9.2 3.825-3.8 9.225-3.8 5.4 0 9.2 3.8 3.8 3.8 3.8 9.2 0 2.15-.7 4.15-.7 2-2.05 3.75L42.3 39.8Zm-21-13.95q3.95 0 6.725-2.825Q28.3 22.7 28.3 18.75t-2.775-6.775Q22.75 9.15 18.8 9.15q-4.05 0-6.85 2.825t-2.8 6.775q0 3.95 2.8 6.775t6.85 2.825Z"/></svg>
            </button></li>
            <li>
                <button className="darkmode_button" onClick={()=>{
                    
                    if(localStorage.getItem("darkmode")==="true"){
                        localStorage.setItem("darkmode", false)
                        document.body.classList.remove("darkmode");
                    }else{
                        localStorage.setItem("darkmode", true)
                        document.body.classList.add("darkmode");
                    }
                    }}>
                <svg fill="var(--text-color-2)" xmlns="http://www.w3.org/2000/svg" height="30" width="30"
                    viewBox="0 0 50 50">
                    <path
                        d="M24 42q-7.5 0-12.75-5.25T6 24q0-7.5 5.25-12.75T24 6q.4 0 .85.025.45.025 1.15.075-1.8 1.6-2.8 3.95-1 2.35-1 4.95 0 4.5 3.15 7.65Q28.5 25.8 33 25.8q2.6 0 4.95-.925T41.9 22.3q.05.6.075.975Q42 23.65 42 24q0 7.5-5.25 12.75T24 42Zm0-3q5.45 0 9.5-3.375t5.05-7.925q-1.25.55-2.675.825Q34.45 28.8 33 28.8q-5.75 0-9.775-4.025T19.2 15q0-1.2.25-2.575.25-1.375.9-3.125-4.9 1.35-8.125 5.475Q9 18.9 9 24q0 6.25 4.375 10.625T24 39Zm-.2-14.85Z" />
                </svg>
            </button></li>
        </ul>
    </nav>
    </>
  )
}

export default Header