import React, { Component } from 'react';

import {ComposedChart, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Text, Label} from 'recharts';

import SizeMe from 'react-sizeme';

class Stage extends Component {
  render() {

    const props = this.props,
    { viewMode, brushState } = props,
    { width, height } = this.props.size;

    const brush = (viewMode === 'monthly') ? (
      <Brush key="brush" {...brushState} dataKey='name' height={30} stroke="rgb(100, 100, 100)" />
    ) : undefined;

    const yLabelCoords = {
      x: 10,
      y: height / 2
    };

    return ( 
      <div className="stage">
        <ComposedChart {...props} width={width} height={height} barGap={0} barCategoryGap={'0%'} stackOffset="sign">
         <XAxis dataKey="index" fontSize=".8em" />
         <YAxis unit="Profiles">
         </YAxis>
         <text {...yLabelCoords} transform={`rotate(-90 ${yLabelCoords.x} ${yLabelCoords.y})`} fill="rgb(100, 100, 100)" >Total number or profiles</text>
         <YAxis yAxisId="right" orientation="right" stroke="#40975c" />

         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip content={<CustomTooltip/>} />
         <Legend verticalAlign="bottom" horizontalAlign="center" wrapperStyle={{lineHeight: '40px'}}/>
         <ReferenceLine y={0} stroke='#000'/>

         {brush}

         <Bar dataKey="Added" fill="#8969ea" />
         <Bar dataKey="Removed" fill="#b2b7ba"  />
         <Line  type='monotone' dataKey='Selection size' stroke='#3c84f5' />
        </ComposedChart>
      </div>
    );
  }
}

export default SizeMe({ monitorWidth: true, monitorHeight: true })(Stage);






function CustomTooltip(props) {

  const { payload, label } = props;

  const items = Object.entries(payload).map((value, index) => {
    const item = payload[index],
    {dataKey, fill, stroke} = item,
    val = Math.round((item.payload[dataKey] * 100) / 100)

    let label = dataKey;

    return (
      <li key={label}>
        <span className="label" style={{
          color: stroke || fill
        }}>{label}:</span> <span className="value">{val}</span>
      </li>
    );

  });

  return (
    <div className="recharts-tooltip-wrapper">
      <div className="recharts-default-tooltip">
        <ul className="recharts-tooltip-item-list">{items}</ul>
      </div>
    </div>
  );
}
