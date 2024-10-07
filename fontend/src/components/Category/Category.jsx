import React from 'react'
import './Category.css'
import {menu_list} from '../../assets/assets.js'

const Category = () => {
  return (
    <div className='category' id='category'>
      <div className="menu-list">
        {menu_list.map((item, index) => {
          return (
            <div className="menu-list-item" key={index}>
              <img src={item.menu_image} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Category
