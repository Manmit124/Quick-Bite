"use client"
import MenuItem from '@/app/component/layout/MenuItem';
import React, { useEffect, useState } from 'react'

const Menushowpage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
           <h1 className=' text-white text-primary font-bold text-4xl italic"'>{c.name}</h1>
          </div>
          <div className=" gap-4 mt-6 mb-12 grid  sm:grid-cols-3 lg:grid-cols-5">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Menushowpage
