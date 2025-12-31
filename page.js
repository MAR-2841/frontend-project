"use client";

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from "./CartContext";

const cappuccinoData = {
  origin: "Around 1901–1905: Café culture in Italy started popularizing espresso-based drinks with milk froth.",
  brewing: [
    "Water temperature: ~90–96°C",
    "Pressure: ~9 bars",
    "Brewing time: 25–30 seconds",
    "Coffee grind: Very fine",
  ],
  taste: [
    "Strong, rich, and intense flavor",
    "Slightly bitter but aromatic",
    "Often topped with a golden-brown foam layer called “Crema”",
  ],
  pricing: [
    { size: 'Small (200 ml)', price: 750 },
    { size: 'Medium (300 ml)', price: 795 },
    { size: 'Large (400 ml)', price: 900 },
  ]
};

const DetailSection = ({ title, content }) => (
  <div>
    <h2 className='font-bold'>{title}:</h2>
    {Array.isArray(content) ? (
      content.map((item, index) => <p key={index}>{item}</p>)
    ) : (
      <p>{content}</p>
    )}
  </div>
);

function Cappuccino() {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(cappuccinoData.pricing[0]);

  const handleAddToCart = () => {
    const itemToAdd = {
      name: 'Cappuccino',
      size: selectedSize.size,
      price: selectedSize.price,
      id: `cappuccino-${selectedSize.size}-${Date.now()}` // Unique ID for each item
    };
    addToCart(itemToAdd);
  };
  return (
    <main className='bg-white min-h-screen w-full flex justify-center p-4'>
      <div className='bg-amber-100 h-min w-full max-w-lg rounded-2xl p-4 shadow-lg'>
        <div className='flex items-center justify-center text-4xl text-amber-950 gap-2 mb-4'>
          <FontAwesomeIcon icon={faCoffee} className="h-8 w-8" />
          <h1 className='font-bold text-black'>Cappuccino</h1>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <div className="relative h-64 w-full sm:w-1/3 flex-shrink-0">
            <Image
              src="/PROJECTUI/Ca-plant.jpg"
              alt="A cappuccino with a plant in the background"
              layout="fill"
              objectFit="cover"
              className='rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <DetailSection title="Origin" content={cappuccinoData.origin} />
            <DetailSection title="Brewing Method" content={cappuccinoData.brewing} />
            <DetailSection title="Taste" content={cappuccinoData.taste} />
          </div>
        </div>

        <div className='mt-4'>
          <div>
            <h2 className='font-bold'>Price:</h2>
            <div className='flex flex-col'>
              {cappuccinoData.pricing.map((option) => (
                <label key={option.size} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='price'
                    value={option.size}
                    checked={selectedSize.size === option.size}
                    onChange={() => setSelectedSize(option)}
                  />
                  {`${option.size}: Rs ${option.price} per cup`}
                </label>
              ))}
            </div>
          </div>
          <div className='font-bold mt-4 flex justify-between items-center'>
            <Link href="/project.ui/PROJECTUI" passHref>
              <button className='bg-gray-300 p-2 rounded-2xl hover:bg-gray-400 transition-colors'>
                BACK TO MENU
              </button>
            </Link>
            <button onClick={handleAddToCart} className='bg-green-400 p-2 rounded-2xl hover:bg-green-500 transition-colors'>
              ADD TO ORDER
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cappuccino;