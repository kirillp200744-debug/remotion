import React, {createContext, useContext} from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const C = {
	bg: '#F5F0E6',
	ink: '#1D2B24',
	green: '#1F5C43',
	leaf: '#3E9B5F',
	lime: '#A9D46F',
	orange: '#E97C2F',
	red: '#C8473B',
	muted: '#5E6B63',
	card: '#FFFFFF',
};

export const FONT = 'Inter, sans-serif';

// Offset (in seconds) of the current slide inside its voice block,
// so that every `at` can be written as the timestamp in the voice-over.
const OffsetCtx = createContext(0);

export const useLocalSeconds = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const offset = useContext(OffsetCtx);
	return frame / fps + offset;
};

export const Slide: React.FC<{
	from: number;
	to: number;
	children: React.ReactNode;
	bg?: string;
}> = ({from, to, children, bg}) => {
	const {fps} = useVideoConfig();
	return (
		<Sequence
			from={Math.round(from * fps)}
			durationInFrames={Math.round((to - from) * fps)}
		>
			<OffsetCtx.Provider value={from}>
				<SlideFade bg={bg ?? C.bg}>{children}</SlideFade>
			</OffsetCtx.Provider>
		</Sequence>
	);
};

const SlideFade: React.FC<{children: React.ReactNode; bg: string}> = ({
	children,
	bg,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = interpolate(
		frame,
		[0, 9, durationInFrames - 9, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	return (
		<AbsoluteFill style={{backgroundColor: bg, opacity, fontFamily: FONT}}>
			{children}
		</AbsoluteFill>
	);
};

export const useAppear = (at: number) => {
	const t = useLocalSeconds();
	const {fps} = useVideoConfig();
	const p = spring({
		frame: Math.round((t - at) * fps),
		fps,
		config: {damping: 16, stiffness: 120, mass: 0.8},
	});
	return t < at ? 0 : p;
};

export const Appear: React.FC<{
	at: number;
	children: React.ReactNode;
	dy?: number;
	dx?: number;
	scale?: boolean;
	style?: React.CSSProperties;
}> = ({at, children, dy = 40, dx = 0, scale, style}) => {
	const p = useAppear(at);
	return (
		<div
			style={{
				opacity: p,
				transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${
					scale ? 0.6 + 0.4 * p : 1
				})`,
				...style,
			}}
		>
			{children}
		</div>
	);
};

export const Photo: React.FC<{
	src: string;
	at?: number;
	style?: React.CSSProperties;
	zoom?: 'in' | 'out';
	contain?: boolean;
	radius?: number;
}> = ({src, at = 0, style, zoom = 'in', contain, radius = 28}) => {
	const t = useLocalSeconds();
	const p = useAppear(at);
	const k = interpolate(t - at, [0, 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.quad),
	});
	const s = contain ? 1 + 0.03 * k : zoom === 'in' ? 1 + 0.12 * k : 1.12 - 0.12 * k;
	return (
		<div
			style={{
				position: 'absolute',
				overflow: 'hidden',
				borderRadius: radius,
				boxShadow: '0 30px 60px rgba(20,40,30,0.25)',
				backgroundColor: contain ? '#fff' : '#ddd',
				opacity: p,
				transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`,
				...style,
			}}
		>
			<Img
				src={staticFile(src)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: contain ? 'contain' : 'cover',
					transform: `scale(${s})`,
				}}
			/>
		</div>
	);
};

export const Kicker: React.FC<{children: React.ReactNode; at?: number; color?: string}> = ({
	children,
	at = 0,
	color = C.leaf,
}) => (
	<Appear at={at} dy={20}>
		<div
			style={{
				display: 'inline-block',
				fontSize: 26,
				fontWeight: 700,
				letterSpacing: 3,
				textTransform: 'uppercase',
				color,
				borderBottom: `4px solid ${color}`,
				paddingBottom: 8,
			}}
		>
			{children}
		</div>
	</Appear>
);

export const Title: React.FC<{
	children: React.ReactNode;
	at?: number;
	size?: number;
	color?: string;
	style?: React.CSSProperties;
}> = ({children, at = 0, size = 64, color = C.ink, style}) => (
	<Appear at={at}>
		<div
			style={{
				fontSize: size,
				fontWeight: 800,
				lineHeight: 1.12,
				color,
				letterSpacing: -1,
				...style,
			}}
		>
			{children}
		</div>
	</Appear>
);

export const Bullet: React.FC<{
	at: number;
	children: React.ReactNode;
	color?: string;
	size?: number;
	mark?: React.ReactNode;
}> = ({at, children, color = C.leaf, size = 38, mark}) => (
	<Appear at={at} dx={-60} dy={0}>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 24,
				fontSize: size,
				fontWeight: 600,
				color: C.ink,
				lineHeight: 1.2,
			}}
		>
			<div
				style={{
					flexShrink: 0,
					width: size * 1.3,
					height: size * 1.3,
					borderRadius: '50%',
					backgroundColor: color,
					color: '#fff',
					fontSize: size * 0.7,
					fontWeight: 800,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{mark ?? <Check />}
			</div>
			<div>{children}</div>
		</div>
	</Appear>
);

export const Check: React.FC = () => (
	<svg width="60%" height="60%" viewBox="0 0 24 24">
		<path
			d="M4 12.5l5 5L20 6.5"
			fill="none"
			stroke="#fff"
			strokeWidth={3.2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const Cross: React.FC = () => (
	<svg width="60%" height="60%" viewBox="0 0 24 24">
		<path
			d="M6 6l12 12M18 6L6 18"
			fill="none"
			stroke="#fff"
			strokeWidth={3.2}
			strokeLinecap="round"
		/>
	</svg>
);

export const Chip: React.FC<{at: number; children: React.ReactNode; color?: string; size?: number}> = ({
	at,
	children,
	color = C.red,
	size = 34,
}) => (
	<Appear at={at} scale dy={0}>
		<div
			style={{
				display: 'inline-block',
				padding: '16px 30px',
				borderRadius: 999,
				backgroundColor: color,
				color: '#fff',
				fontSize: size,
				fontWeight: 700,
				boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
			}}
		>
			{children}
		</div>
	</Appear>
);

export const CountUp: React.FC<{at: number; to: number; dur?: number; format?: (n: number) => string}> = ({
	at,
	to,
	dur = 1.2,
	format = (n) => String(n),
}) => {
	const t = useLocalSeconds();
	const v = interpolate(t, [at, at + dur], [0, to], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	return <>{format(Math.round(v))}</>;
};

export const Pad: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
	children,
	style,
}) => (
	<div style={{position: 'absolute', left: 120, right: 120, top: 110, bottom: 110, ...style}}>
		{children}
	</div>
);

export const Leaf: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({
	size = 80,
	color = C.leaf,
	style,
}) => (
	<svg width={size} height={size} viewBox="0 0 64 64" style={style}>
		<path
			d="M54 8C26 8 10 22 10 42c0 5 1.5 9 4 13 2-12 10-22 24-28-11 8-17 17-19 30 4 2 8 3 12 3 18 0 27-17 23-52z"
			fill={color}
		/>
	</svg>
);
