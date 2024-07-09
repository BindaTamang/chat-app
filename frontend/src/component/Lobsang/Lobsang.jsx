import React, { useState, useRef } from 'react';
import "./style.scss";
import clave from '../../logos/clave.png';
import bigint from '../../logos/bigint.svg';
import libera from '../../logos/libera.png';
import syncswap from '../../logos/syncswap.svg';
import moodymadness from '../../logos/moodymadness.svg';
import zkmarkets from '../../logos/zkmarkets.svg';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import CardCarousel from '../card/Card';

export default function Lobsang() {
  const logos = [
    { logo: clave },
    { logo: bigint },
    { logo: libera },
    { logo: syncswap },
    { logo: moodymadness },
    { logo: zkmarkets },
    { logo: clave },
    { logo: bigint },
    { logo: libera },
    { logo: syncswap },
    { logo: moodymadness },
    { logo: zkmarkets }
  ];

  const [livePoint, setLivePoint] = useState([0, 1, 2]);
  const [movingIndex, setMovingIndex] = useState(0);
  const cardRefs = useRef([]);

  const changePoint = (index) => {
    const currentIndices = [...livePoint];
    const targetIndices = index <= 2 ? [0, 1, 2] : [index - 2, index - 1, index];

    const steps = [];
    let step = [...currentIndices];

    for (let i = 0; i < Math.abs(currentIndices[2] - targetIndices[2]); i++) {
      step = step.map((item, idx) => (item < targetIndices[idx] ? item + 1 : item - 1));
      steps.push([...step]);
    }

    let delay = 0;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setLivePoint(step);
      }, delay);
      delay += 100;
    });

    if (index <= 2) {
      setMovingIndex(0);
    } else {
      setMovingIndex(index);
    }
    console.log("cardfed", cardRefs.current[index])
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <div className='Lobsang'>
      <h1>Powering the world's largest ZK network</h1>
      <h1>Explore the ZKsync Ecosystem</h1>
      <div className='scroll-component'>
        <div className='Circle'>
          <div className='small-circle'>
            <div className='icon'>
              <IoIosArrowRoundBack />
            </div>
          </div>
        </div>
        {logos.map((item, index) => (
          <div
            key={index}
            className={`ecosystem-header-icon-item ${livePoint.includes(index) ? 'live' : ''}`}
            onClick={() => changePoint(index)}
          >
            <img src={item.logo} style={{ width: "50px" }} alt="" />
            <div className={`triangle-container ${livePoint.includes(index) ? 'live' : ''}`}>
              <TiArrowSortedDown color='white' size={28} />
            </div>
          </div>
        ))}
        <div className='Circle' onClick={() => changePoint((movingIndex + 1) % logos.length)}>
          <div className='small-circle'>
            <div className='icon'>
              <IoIosArrowRoundForward />
            </div>
          </div>
        </div>
      </div>
      <div className='card-component'>
        <div className='cards'>
          {logos.map((item, index) => (
            <div
              key={index}
              className={`ecosystem-body-card `}
              ref={el => cardRefs.current[index] = el}
            >
              <div className='card'>
                <img src={item.logo} style={{ width: "50px" }} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <CardCarousel />
    </div>
  );
}
