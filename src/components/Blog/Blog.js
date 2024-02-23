import React, { useState, useEffect } from 'react';
import Card from "../Card/Card"
import './Blog.css';
import axios from 'axios';
import SavedBlogs from "../../assets/blogs.json"

function Blog() {
  const [blogs, setBlogs] = useState()
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [autor, setAutor] = useState()
  const [viewState, setViewState] = useState("list")

    useEffect(() => {
    if(window.navigator.onLine){
    axios.get('http://localhost:3001/', {headers: {"Access-Control-Allow-Origin": "*"}})
      .then(response => {
        setBlogs(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener blogs:', error);
      });
    } else{
      setBlogs(SavedBlogs);
      setFilteredData(SavedBlogs);
    }

  }, []); 

    const addBlog = () => {
      const postBlog = { 
          title: title,
          author: autor,
          date: new Date().toISOString().slice(0, 10)
          ,
          content: content     
      }
      axios.post('http://localhost:3001', postBlog ,{ headers: {"Access-Control-Allow-Origin": "*"}})
        .then(response => {
          setBlogs(response.data)
          setFilteredData(response.data)
          setViewState("list")
        }).catch(error => {
          console.error('Error al postear blog', error)
        })
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterData(e.target.value);
  };

  const handleViewChange = (view) => {
    setViewState(view)
  }

  const filterData = (term) => {
    const filtered = blogs.filter(item => {
      return (
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.author.toLowerCase().includes(term.toLowerCase()) ||
        item.content.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      {viewState === "list"
      ? <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      : null
      }
      {viewState === "list"
        ? window.navigator.onLine ? <button onClick={e => handleViewChange("add")}>Add Blog</button> : <button>No internet connection</button>
        : <button className='list-blogs-button' onClick={e => handleViewChange("list")}>List of Blogs</button>
      }
      {viewState === "add"
      ? <div>
        <p className="title-field">Title</p>
          <input className="form-button" onChange={e => setTitle(e.target.value)} type="text"></input>
        <div className="content-field">
          <p>Content</p>
          <input className="form-button" onChange={e => setContent(e.target.value)} type="text"></input>
        </div>
        <div>
          <p className="author-field">Author</p>
          <input className="form-button" onChange={e => setAutor(e.target.value)} type="text"></input>
        </div>
        <button className="save-button" onClick={addBlog}>
          Save Blog
        </button>
      </div>
      : <div className="card">
        {
          filteredData.map((blog, index) => {
            return <Card key={"blog"+index} content={blog} />
          })
        }
      </div>
      }
    </div>
  );
}

export default Blog;