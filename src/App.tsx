import React from 'react';
import CarouselWidget from './CarouselWidget';
import './App.css';
import city from './images/city.jpg';
import lake from './images/lake.jpg';
import racing from './images/racing.jpg';

function App() {
  const exampleData: Array<{img: any, text: string}> = [
    {img: city, text: ''},
    {img: lake, text: 'Nice lake'},
    {img: racing, text: 'It is a really fast car'}
  ];

  return (
    <CarouselWidget images={exampleData}/>
  );
}

export default App;
