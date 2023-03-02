import React from 'react'
import moment from 'moment'
import Link from 'next/link'
const PostCard = ({post}) => {
  return (
    <Link className="suggestion" href={`/post/${post.slug}`}>
      <img className="thumbnail" src={post.featuredImage.url} alt={post.title}/>
      <div className="suggestion_text">
          <p className="suggestion_title">{post.title}</p>
          <div className="suggestion_information">
              <span>1039 Aufrufe</span>
              <span>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
          </div>
      </div>
    </Link>
  )
}

export default PostCard