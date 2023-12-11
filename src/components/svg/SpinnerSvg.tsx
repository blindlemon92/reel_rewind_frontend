import React from 'react';

function SpinnerSvg() {
	return (
		<>
			<svg
				className='h-[3rem] invert w-full'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'>
				<path d='M288 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM448 256a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM32 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM75 437a32 32 0 1 0 45.3-45.3A32 32 0 1 0 75 437zm316.8 0A32 32 0 1 0 437 391.8 32 32 0 1 0 391.8 437zM75 75a32 32 0 1 0 45.3 45.3A32 32 0 1 0 75 75z' />
			</svg>
		</>
	);
}

export default SpinnerSvg;
