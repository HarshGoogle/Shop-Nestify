// MiddleBar.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MiddleBar.css';
import phone from './White and Blue Clean Phone Notification Facebook Post.gif'
import clothes from './Beige Minimalist Online Shop New Collection Instagram Post.gif'
import homedecor from './decoration.png'
import beauty_personal_care from './beautyProducts.webp'
import Books_and_Media from './Books background simple colorful phone wallpaper.gif'
import Toys_and_Games from './toysandgames.jpg'
import Sports_and_Outdoors from './Sports & Outdoors.webp'
import Jewelry_and_Watches from './Jewelry & Watches.avif';

const categories = [
  { id: 1, to: "/phone", imgSrc: phone, categoryName: "Phone" },
  { id: 2, to: "/homedecor", imgSrc: homedecor, categoryName: "Home Decor" },
  { id: 3, to: "/clothes", imgSrc: clothes, categoryName: "Clothes" },
  { id: 4, to: "/beauty&personalcare", imgSrc: beauty_personal_care, categoryName: "Beauty Care" },
  { id: 5, to: "/books&media", imgSrc: Books_and_Media, categoryName: "Books " },
  { id: 6, to: "/toys&games", imgSrc: Toys_and_Games, categoryName: "Toys" },
  { id: 7, to: "/sports&outdoors", imgSrc: Sports_and_Outdoors, categoryName: "Sports " },
  { id: 8, to: "/jewelry&watches", imgSrc: Jewelry_and_Watches, categoryName: "Jewelry " }
];



export default function MiddleBar(props) {
  const [currentCategory, setCurrentCategory] = useState("");

  const Category = (val) => {
    if (val == "get") {
      return currentCategory;
    }
    setCurrentCategory(val);
  }

  useEffect(() => {
    categories.map((category) => {
      if (category.id == currentCategory) {
        const element = document.getElementById(category.id);
        const elementImage = document.getElementById(`${category.id}-image`);
        element.classList.add("current-category");
        elementImage.classList.add("current-category-image")
      } else {
        const element = document.getElementById(category.id);
        const elementImage = document.getElementById(`${category.id}-image`);
        element.classList.remove("current-category");
        elementImage.classList.remove("current-category-image")
      }
    })
  }, [Category("get")])
  useEffect(() => {
    if (props.navlink("get") == "Home" && currentCategory != "") {
      const element = document.getElementById(currentCategory);
      const elementImage = document.getElementById(`${currentCategory}-image`);
      element.classList.remove("current-category");
      elementImage.classList.remove("current-category-image")
    }
  }, [props.navlink("get")])
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {categories.map((category, index) => (
          <Link key={index} className={`category`} to={category.to} onClick={() => { Category(category.id) }}>
            <img src={category.imgSrc} className="category-image" id={`${category.id}-image`} alt={category.categoryName} />
            <div className="category-name" id={`${category.id}`}>{category.categoryName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
