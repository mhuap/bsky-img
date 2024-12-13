import React, { useState } from 'react';

// const GRADIENTS = {
//   'g1': ['#00FF8F', '#60EFFF'],
//   'g2': ['#0061ff', '#60EFFF'],
//   'g3': ['#00ddff', '#e81cff'],
//   'g4': ['#ff930f', '#fff95b'],
//   'g5': ['#ff0f7b', '#f89b29'],
//   'g6': ['#BD19ED', '#ff0f7b'],
//   'g7': ['#fed1c7', '#fe8dc6'],
//   'g8': ['#7f00ff', '#E75BFF']
// }
type Gradient = {
  id: string,
  start: string,
  end: string
}

const GRADIENTS: Gradient[] = [
  {id: 'g1', start: '#00FF8F', end: '#60EFFF'},
  {id: 'g2', start: '#0061ff', end: '#60EFFF'},
  {id: 'g3', start: '#00ddff', end: '#e81cff'},
  {id: 'g4', start: '#ff930f', end: '#fff95b'},
  {id: 'g5', start: '#ff0f7b', end: '#f89b29'},
  {id: 'g6', start: '#BD19ED', end: '#ff0f7b'},
  {id: 'g7', start: '#fed1c7', end: '#fe8dc6'},
  {id: 'g8', start: '#7f00ff', end: '#E75BFF'}
]

function GradientColor({
  handleGradientChange, gradient
} : {
  handleGradientChange: (e: any) => void,
  gradient: string,
}) {

  return (<div className='gradient-tab'>
      {GRADIENTS.map(g => {
        return <GradientSwatch id={g.id} key={g.id}
                changed={handleGradientChange}
                isSelected={gradient === g.id}
                />
      })}
    </div>
  )
}

function GradientSwatch({
  id, isSelected, changed
} : {
  id: string,
  isSelected: boolean,
  changed: (e: any) => void
}) {
  // const colorA = GRADIENTS[id][0];
  // const colorB = GRADIENTS[id][1];
  const colorA = GRADIENTS.find(g => g.id === id)?.start;
  const colorB = GRADIENTS.find(g => g.id === id)?.end;
  const background = `linear-gradient(to right, ${colorA}, ${colorB})`;

  return (
    <div>
      <input id={id} type='radio' value={id} checked={isSelected} onChange={changed}/>
      <label tabIndex={0}
        style={{background}}
        className='gradient-swatch'
        htmlFor={id}
      />
    </div>
  )
}

export default GradientColor;
export { GRADIENTS };
