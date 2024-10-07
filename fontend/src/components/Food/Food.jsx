import React from 'react'
import './Food.css'
import { food_list } from '../../assets/assets.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Food = () => {
    return (
        <div className='food'>
            <h1>Lẩu:</h1>
            <div className="food-list">
                {food_list.map((item, index) => {
                    return (
                        <div className="food-list-item" key={index}>
                            <div className="img-container">
                                <img src={item.dish_image} />
                                <button className='add'><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                            <h3>{item.dish_name}</h3>
                            <p>{item.dish_price}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Food
