import Head from 'next/head'
import { useState, useEffect} from 'react'
import {useRouter} from "next/router"
import React from 'react'
import {getPosts, getPostDetails} from '../../services'
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Header, Loader} from '../../components'
import moment from 'moment'
// import { CopyBlock, dracula } from 'react-code-blocks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs'



const PostDetails = ({post}) => {
  const router = useRouter()
  if(router.isFallback){
    return <Loader/>
  }
  const [inputPostFilter, setInputPostFilter] = useState("")

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    console.log(obj)
    console.log(type)
    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
      if(obj.code){
        modifiedText = (<SyntaxHighlighter key={index} language="javascript" style={atomOneDark}>{text}</SyntaxHighlighter>);
      }
      // if(obj.code){
      //   modifiedText = (<CopyBlock
      //     text={text}
      //     language='javascript'
         
      //     wrapLines
      //     theme={dracula}
      //   />
      //   )
      // }
    }
    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'heading-two':
            return <h2 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case 'block-quote':
        return <p className='tipp'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>
      case 'iframe':
         return <div key={index} className="embedtool"><iframe src={obj.url}></iframe></div>
      case 'paragraph':
        
        return <div key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</div>;
        
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
     <Header postFilter={inputPostFilter} handlePostFilter = {(newValue)=>{
      setInputPostFilter(newValue)
  }} />
    <div className='article'>
        <h1>{post.title}</h1>
        {post.content.raw.children.map((typeObj, index)=>{
          const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
          return getContentFragment(index, children, typeObj, typeObj.type)
        }
        )}
      
    </div>
    </>
   
  )
}

export default PostDetails



export async function getStaticProps({params}){
    const data = await getPostDetails(params.slug)
    return {
      props:{post: data}
    }
}
export async function getStaticPaths(){
    const posts = await getPosts()
    return {
        paths: posts.map(({node:{slug}}) =>({params:{slug}})),
        fallback: true
    }
}