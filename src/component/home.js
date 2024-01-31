import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Banner from '../Utils/Banner'

import RowList from '../Row/Rowlist'

const Home = () => {
  return (
    <>
      <Header />
      <Banner/>
      
      <RowList/>
      <Footer />

    </>
  )
}

export default Home