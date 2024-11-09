import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Proportion from '../../components/Proportion/Proportion'
import { useParams } from 'react-router-dom'
import LoginPopUp from '../../components/LoginPopup/LoginPopup'

const Home = () => {
  const { qr_code } = useParams();
  
  return (
    <div>
      < Header />
      < Proportion />
      {qr_code && <LoginPopUp />}
    </div>
  )
}

export default Home
