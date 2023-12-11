import React from 'react';

const InfoSvg = () => {
	return (
		<>
			<svg
				className='h-[1rem] fill-current text-[rgb(255,102,99)] group-hover:opacity-100 '
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'>
				<path d='M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z' />
			</svg>
		</>
	);
};

export default InfoSvg;
