import React from 'react';

const HorizontalScrollSvg = () => {
	return (
		<>
			<svg
				className='h-[1.5rem] w-full flex invert opacity-25 animate-pulse group-hover:opacity-100 '
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'>
				<path d='M499.3 267.3l10.9-10.9-10.4-11.3-96-104-10.9-11.8-23.5 21.7 10.9 11.8L451.5 240 62.6 240l68.7-68.7L142.6 160 120 137.4l-11.3 11.3-96 96L1.4 256l11.3 11.3 96 96L120 374.6 142.6 352l-11.3-11.3L62.6 272l386.7 0-68.7 68.7L369.4 352 392 374.6l11.3-11.3 96-96z' />
			</svg>
		</>
	);
};

export default HorizontalScrollSvg;
