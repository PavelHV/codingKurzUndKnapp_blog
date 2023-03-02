import Head from 'next/head'
import { PostCard, Categories, PostWidget, Header } from '../components'
import {getPosts, getCategories} from "../services"
import Image from 'next/image'
import { useState, useEffect} from 'react'

//Letzte Änderung 22/02/2023
//Vom Youtube-Video https://www.youtube.com/watch?v=HYv55DhgTuA
//Timestamp 2:00:00 nächster Stamp wäre "author"

export default function Home({posts}, props){
  console.log("POSTS________")
  console.log(posts)
  const [inputPostFilter, setInputPostFilter] = useState("")

  const [filter, setFilter] = useState("")
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  const filter_button_handler = (categoryName)=>{
    setFilter(categoryName)
    setInputPostFilter("")
  }
  return (
    <>
    
      <Header postFilter={inputPostFilter} handlePostFilter = {(newValue)=>{
        setInputPostFilter(newValue)
    }} />
      <section className='main_section'>
        <div className="search_filter_container">
          
        <button className={'filter_button '+ ((filter==''||filter == 'alle')?'active':'')} onClick={()=>filter_button_handler("alle")}>Alle</button>
          {categories.map((category, index)=>(
            <button key={index} className={'filter_button '+ ((filter==category.name) && inputPostFilter===""?'active':'')} onClick={()=>filter_button_handler(category.name)}>{category.name}</button>
          ))}
            {/* <button className="filter_button active" onClick={()=>setFilter("alle")}>Alle</button>
            <button className="filter_button" onClick={()=>setFilter("html")}>HTML</button>
            <button className="filter_button" onClick={()=>setFilter("css")}>CSS</button>
            <button className="filter_button" onClick={()=>setFilter("php")}>JavaScript</button>
            <button className="filter_button" onClick={()=>setFilter("alle")}>PHP</button> */}
        </div>
        <div className='suggestions_grid'>
         
          {
            filter !== "" && filter !== "alle" && inputPostFilter === ""?
              posts.map((post, index)=>(
                filter==post.node.categories[0].name
                ?
                  <PostCard post={post.node} key={post.node.title} />
                :
                  null
              ))
            :
            posts.map((post, index)=>(
              post.node.categories[0].name.toLowerCase().includes(inputPostFilter.toLowerCase())
              ||
              post.node.title.toLowerCase().includes(inputPostFilter.toLowerCase())
              ?
              <>
             
                <PostCard post={post.node} key={post.node.title} />
              </>
              :
              null
            ))
          }
        </div>
       
      </section>
      
    </>
  )
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];
  return {
    props:{posts}
  }
}