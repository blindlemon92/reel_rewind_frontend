export interface Item {
	key: string;
	value: JSX.Element;
}

export interface NewsStory {
	title: string;
	intro: JSX.Element;
	items: Item[];
	outro: JSX.Element;
}

export const Data = () => {
	const story: NewsStory = {
		title: 'TEN DIMES: Best of VHS',
		intro: (
			<p>
				Ah the video cassette.. Priceless, worthless, and now gaining in
				popularity, vhs are here to stay: especially if we have anything to do
				with it! Take a look at the ten best films ever put on magnetic tape.
			</p>
		),
		items: [
			{
				key: 'Star Wars (1977)',
				value: (
					<p>
						George Lucas' epic space opera, "Star Wars," takes the top spot the
						list. The original 1977 release of this groundbreaking film on VHS
						introduced a whole generation to the Jedi, the Force, and a galaxy
						far, far away.
					</p>
				),
			},
			{
				key: 'E.T. the Extra-Terrestrial (1982)',
				value: (
					<p>
						Steven Spielberg's heartwarming tale of a young boy and his alien
						friend captivated audiences in the '80s. "E.T. the
						Extra-Terrestrial" remains a timeless classic, and its VHS release
						is a cherished memory for all who hold it.
					</p>
				),
			},
			{
				key: 'Jurassic Park (1993)',
				value: <p>I mean duh...</p>,
			},
			{
				key: 'The Lion King (1994)',
				value: (
					<p>
						Disney's "The Lion King" holds a special place in the hearts of both
						kids and adults. The VHS release allowed families to enjoy the
						unforgettable journey of Simba and his friends in the comfort of
						their homes..
					</p>
				),
			},
			{
				key: 'Ghostbusters (1984)',
				value: (
					<p>
						'Do y'all text?' This supernatural comedy has provided countless
						hours of laughter and spookiness over the years.
					</p>
				),
			},
			{
				key: 'Back to the Future (1985)',
				value: (
					<p>
						Marty McFly and Doc Brown's time-traveling escapades in "Back to the
						Future" made for an unforgettable cinematic experience.
					</p>
				),
			},
			{
				key: 'The Goonies (1985)',
				value: (
					<p>
						"Goonies never say die!" The treasure-hunting, pirate ship-seeking
						gang of misfits in "The Goonies". Childhood in a box.
					</p>
				),
			},
			{
				key: 'Terminator 2: Judgment Day (1991)',
				value: (
					<p>
						James Cameron's sci-fi masterpiece "Terminator 2: Judgment Day" took
						the action genre to new heights
					</p>
				),
			},
			{
				key: 'Indiana Jones and the Last Crusade (1989)',
				value: (
					<p>
						Harrison Ford's iconic portrayal of Indiana Jones continued in "The
						Last Crusade." This adventure-packed film was a VHS library
						essential.
					</p>
				),
			},
			{
				key: 'The Breakfast Club (1985)',
				value: (
					<p>
						John Hughes' coming-of-age classic "The Breakfast Club" is a
						timeless representation of teenage angst and camaraderie. Watching
						it on VHS allowed viewers to feel like a part of the Breakfast Club
						themselves.
					</p>
				),
			},
		],
		outro: (
			<p>
				Well what do you think? How wrong are we? Let us know by clicking the
				button below!
			</p>
		),
	};

	return story;
};
