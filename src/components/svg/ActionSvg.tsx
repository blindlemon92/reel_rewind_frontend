import React from 'react';

const ActionSvg = () => {
	return (
		<>
			<svg
				className='hover:scale-[1.3] mx-2 p-1 fill-current text-slate-300 rounded h-[2rem] hover:border hover:shadow-xl hover:bg-purple-400 drop-shadow-xl'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 576 512'>
				<path d='M528 56V32H480V56v8H24 0V88 216v24H24 92L44 432 32 480H81.5 208l32-128H344h16.9l5.7-15.9L400.9 240H440h9.9l7-7 25-25H552h24V184 88 64H552 528V56zM252 304l16-64h81.9l-22.9 64H252zm-33.5-64l-48 192h-77l48-192h77zM280 192H230.5 104 48V112H480h48v48H472h-9.9l-7 7-25 25H280z' />
			</svg>
		</>
	);
};

export default ActionSvg;
