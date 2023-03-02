import Head from 'next/head'

import '../styles/styles.css'
import type { AppProps } from 'next/app'
import React, {useEffect, useState} from 'react'
import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
 
  useEffect(()=>{
    if(localStorage.getItem("darkmode") === "true"){
      document.body.classList.add("darkmode");
    }
  }, [])
  return (
    <>
  
    
     <Head>
      <title>Coding2go-Blog</title>

     </Head>
    <Component {...pageProps} />
    </>
   
  )
}

export default MyApp
