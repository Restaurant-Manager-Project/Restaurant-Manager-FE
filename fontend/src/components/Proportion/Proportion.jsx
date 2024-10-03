import React from 'react'
import './Proportion.css'
import { assets } from '../../assets/assets'

const Proportion = () => {
    return (
        <div className='proportion'>
            <h1>Special Offers</h1>
            <div className="proportion-content">
                <div className="proportion__left">
                    <h2>Making by children</h2>
                    <p>🍕 Let your little chefs unleash their creativity and have a blast making their own pizzas! Join us for a fun-filled pizza-making party. What's included:
                        Fresh ingredients and pizza dough
                        Fun toppings like pepperoni, mushrooms, olives, and more!
                        A pizza-making demonstration by a professional chef
                        Games and activities for kids
                        Imagine the excitement on your child's face as they create their very own masterpiece. Our pizza-making party is designed to spark creativity, foster teamwork, and provide a memorable experience for children of all ages.
                        Our professional chef will guide your little ones through the pizza-making process, from rolling out the dough to adding their favorite toppings. With a variety of fresh ingredients and fun toppings to choose from, your child can let their imagination run wild.
                        After creating their pizzas, everyone will get to enjoy their delicious creations. We'll also have fun games and activities to keep the kids entertained while their pizzas are baking.</p>
                </div>
                <div className="proportion__right">
                    <img src={assets.khuyenmai2} alt='' />
                </div>
            </div>
            <div className="proportion-content">
                <div className="proportion__right">
                    <img src={assets.khuyenmai1} alt='' />
                </div>
                <div className="proportion__left">
                    <h2>Pizza Day</h2>
                    <p>🍕 Craving a slice of heaven? Join us for our epic pizza party!
                        Indulge in a culinary adventure like no other as you savor the flavors of our freshly baked pizzas, crafted with the finest ingredients. From classic pepperoni to exotic flavor combinations, our menu offers something to tantalize every taste bud.
                        Whether you're a pizza purist or an adventurous foodie, our pizzas are sure to satisfy your cravings. Each slice is a masterpiece, bursting with flavor and texture.
                        Join us for a night of delicious food, good company, and unforgettable memories. Our pizza party is the perfect opportunity to unwind, relax, and enjoy a slice of heaven.
                        Don't miss out! Mark your calendars and get ready for a pizza party you won't soon forget.</p>
                </div>
            </div>
            <div className="proportion-content">
                <div className="proportion__left">
                    <h2>Pizza Perks Program!</h2>
                    <p>Earn delicious rewards with our new Pizza Perks program! Join now and start earning points with every purchase.
                        Become a member of our Pizza Perks program and unlock a world of delicious rewards. With every purchase, you'll earn points that can be redeemed for free pizza, exclusive discounts, and other exciting surprises.
                        How it works:
                        Enjoy free pizza: Redeem your points for delicious free pizza, perfect for a night in or a casual gathering.
                        Get exclusive discounts: Take advantage of exclusive discounts on your favorite pizzas and sides.
                        Be the first to know: Stay up-to-date on the latest news, promotions, and special events from our pizza shop.
                        Join now and start earning rewards today!</p>
                </div>
                <div className="proportion__right">
                    <img src={assets.khuyenmai3} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Proportion
