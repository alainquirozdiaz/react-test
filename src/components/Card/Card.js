import { useState } from 'react'
import './Card.css';

function Card(blog) {
  const [viewMore, setViewMore] = useState("hidden")

  const handleViewMore = (view) => {
    setViewMore(view)
  }

  return (
    <div className="card-wrapper">
      <div className="title">
        <h2>
          {blog.content.title}
        </h2>
      </div>
      <div className="content">
        {blog.content.content.length <= 70
          ? blog.content.content
          : <div>{viewMore === "hidden" ? blog.content.content.slice(0, 70) + "..." : blog.content.content} 
              {viewMore === "hidden" 
                ? <div className="view-more" onClick={e => handleViewMore("shown")}>Show More</div>
                : <div className="view-more" onClick={e => handleViewMore("hidden")}>Show Less</div>
              } 
            </div>
        }
      </div>
      <div className="">
        {blog.content.fecha}
        {blog.content.autor}
      </div>
    </div>
  );
}

export default Card;
