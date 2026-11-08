import React from 'react';
import {Composition} from 'remotion';
import {Slideshow, TOTAL_SECONDS} from './Slideshow';

const FPS = 30;

export const RemotionRoot: React.FC = () => (
	<Composition
		id="Slideshow"
		component={Slideshow}
		durationInFrames={Math.ceil(TOTAL_SECONDS * FPS)}
		fps={FPS}
		width={1920}
		height={1080}
	/>
);
