import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./home.css"

function Home(props) {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Navbar handle={props.handle} />
      </div>
    </div>
  )
}

export default Home