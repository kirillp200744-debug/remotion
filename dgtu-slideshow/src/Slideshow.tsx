import React from 'react';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	Appear,
	Bullet,
	C,
	Chip,
	CountUp,
	Cross,
	FONT,
	Kicker,
	Leaf,
	Pad,
	Photo,
	Slide,
	Title,
} from './ui';

const GAP = 0.6;
const INTRO = 9;
const OUTRO = 3;

// Длительности голосовых (сек) в порядке текста презентации.
const VOICE = [40.48, 28.92, 12.52, 16.36, 7.8, 21.32, 41.76, 28.9];

const blockStarts = VOICE.reduce<number[]>(
	(acc, d, i) => [...acc, acc[i] + d + GAP],
	[INTRO],
);

export const TOTAL_SECONDS = blockStarts[VOICE.length] + OUTRO;

const blockLen = (i: number) => VOICE[i] + GAP + (i === VOICE.length - 1 ? OUTRO : 0);

const fontFaces = [
	['Regular', 400],
	['Medium', 500],
	['SemiBold', 600],
	['Bold', 700],
	['ExtraBold', 800],
]
	.map(
		([name, weight]) =>
			`@font-face{font-family:Inter;font-weight:${weight};src:url(${staticFile(
				`fonts/Inter-${name}.otf`,
			)}) format('opentype');}`,
	)
	.join('');

// ---------- Вступление (без озвучки) ----------
const Intro: React.FC = () => (
	<>
		<Slide from={0} to={4.6} bg={C.green}>
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 160px', color: '#fff'}}>
				<Appear at={0.2} dy={0} scale>
					<Leaf size={110} color={C.lime} />
				</Appear>
				<Kicker at={0.4} color={C.lime}>
					Проект ДГТУ
				</Kicker>
				<div style={{height: 30}} />
				<Title at={0.7} size={92} color="#fff">
					Органическое питание
					<br />
					для здорового потомства
				</Title>
				<div style={{height: 30}} />
				<Appear at={1.4}>
					<div style={{fontSize: 36, opacity: 0.85, fontWeight: 500}}>
						Первичная профсоюзная организация работников ДГТУ
					</div>
				</Appear>
			</AbsoluteFill>
		</Slide>
		<Slide from={4.6} to={INTRO}>
			<Pad style={{display: 'flex', alignItems: 'center', gap: 100}}>
				<div style={{flex: 1}}>
					<Kicker at={4.7}>По данным статистики</Kicker>
					<div style={{height: 20}} />
					<Appear at={4.8}>
						<div style={{fontSize: 190, fontWeight: 800, color: C.green, letterSpacing: -6}}>
							≈<CountUp at={4.9} to={50000} dur={1.6} format={(n) => n.toLocaleString('ru-RU')} />
						</div>
					</Appear>
					<Title at={5.2} size={52}>
						обучающихся в ДГТУ
					</Title>
				</div>
				<div style={{flex: 1}}>
					<Appear at={6.2}>
						<div style={{fontSize: 38, lineHeight: 1.4, color: C.ink, fontWeight: 500}}>
							сталкиваются с комплексом{' '}
							<b style={{color: C.red}}>проблем неправильного питания</b>, которые снижают
							качество жизни и влияют на{' '}
							<b style={{color: C.green}}>здоровье будущего потомства</b>
						</div>
					</Appear>
				</div>
			</Pad>
		</Slide>
	</>
);

// ---------- 1. Проблема ----------
const V1: React.FC = () => (
	<>
		<Slide from={0} to={7.8}>
			<Pad style={{display: 'flex', alignItems: 'center', gap: 90}}>
				<div style={{flex: 1.1}}>
					<Kicker at={0.1}>Медицинские обследования в вузах России</Kicker>
					<div style={{height: 20}} />
					<Appear at={3.0}>
						<div style={{fontSize: 230, fontWeight: 800, color: C.red, letterSpacing: -8, lineHeight: 1}}>
							<CountUp at={3.2} to={70} dur={2.4} />%
						</div>
					</Appear>
					<div style={{height: 20}} />
					<Title at={3.4} size={52}>
						студентов имеют проблемы
						<br />
						с желудочно-кишечным трактом
					</Title>
				</div>
				<Photo src="img/01.jpg" at={0.4} contain style={{position: 'relative', width: 760, height: 760}} />
			</Pad>
		</Slide>

		<Slide from={7.8} to={18.3}>
			<Photo src="img/02.jpg" at={0} style={{left: 0, top: 0, width: 960, height: 1080, borderRadius: 0}} />
			<Photo src="img/04.jpg" at={9.2} style={{left: 0, top: 0, width: 960, height: 1080, borderRadius: 0}} />
			<Photo src="img/03.jpg" at={10.1} style={{left: 0, top: 0, width: 960, height: 1080, borderRadius: 0}} />
			<Photo src="img/06.jpg" at={12.2} style={{left: 0, top: 0, width: 960, height: 1080, borderRadius: 0}} />
			<div style={{position: 'absolute', left: 1040, right: 100, top: 130}}>
				<Kicker at={8.0} color={C.red}>
					Неправильное питание
				</Kicker>
				<div style={{height: 34}} />
				<div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
					<Bullet at={9.2} color={C.orange} size={40} mark="•">
						перекусы на ходу
					</Bullet>
					<Bullet at={10.1} color={C.orange} size={40} mark="•">
						фастфуд
					</Bullet>
					<Bullet at={10.6} color={C.orange} size={40} mark="•">
						пропуск приёмов пищи
					</Bullet>
				</div>
				<div style={{height: 50}} />
				<Title at={11.1} size={44} color={C.muted}>
					провоцирует:
				</Title>
				<div style={{height: 24}} />
				<div style={{display: 'flex', flexWrap: 'wrap', gap: 18}}>
					<Chip at={12.2}>гастрит</Chip>
					<Chip at={14.0}>воспаление желчного пузыря</Chip>
					<Chip at={15.8}>панкреатит</Chip>
					<Chip at={16.8} color={C.muted}>
						и другие заболевания
					</Chip>
				</div>
			</div>
		</Slide>

		<Slide from={18.3} to={23.6}>
			<Photo src="img/05.jpg" at={18.3} style={{right: 100, top: 140, width: 820, height: 800}} />
			<div style={{position: 'absolute', left: 120, width: 820, top: 170}}>
				<Kicker at={18.4} color={C.red}>
					Недостаток
				</Kicker>
				<div style={{height: 36}} />
				<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
					<Bullet at={19.4} color={C.leaf}>витаминов</Bullet>
					<Bullet at={20.1} color={C.leaf}>минералов</Bullet>
					<Bullet at={20.7} color={C.leaf}>питательных веществ</Bullet>
				</div>
				<div style={{height: 60}} />
				<Kicker at={21.5} color={C.red}>
					Избыток
				</Kicker>
				<div style={{height: 30}} />
				<Bullet at={21.8} color={C.red} mark={<Cross />}>
					вредных жиров и сахара
				</Bullet>
			</div>
		</Slide>

		<Slide from={23.6} to={28.6}>
			<Photo src="img/08.jpg" at={23.6} contain style={{left: 120, top: 120, width: 1100, height: 830}} />
			<div style={{position: 'absolute', left: 1300, right: 100, top: 300}}>
				<Title at={24.0} size={56} color={C.red}>
					ГМО-продукты
				</Title>
				<div style={{height: 24}} />
				<Appear at={24.8}>
					<div style={{fontSize: 38, lineHeight: 1.35, color: C.ink, fontWeight: 500}}>
						популярные в вендинговых автоматах
					</div>
				</Appear>
			</div>
		</Slide>

		<Slide from={28.6} to={36.1}>
			<Photo src="img/07.jpg" at={28.6} style={{left: 960, top: 0, width: 960, height: 1080, borderRadius: 0}} />
			<div style={{position: 'absolute', left: 120, width: 740, top: 200}}>
				<Kicker at={28.7}>А также</Kicker>
				<div style={{height: 40}} />
				<Bullet at={28.9} color={C.orange} mark="?" size={42}>
					недостаточность информации о правильном питании студентов
				</Bullet>
				<div style={{height: 50}} />
				<Bullet at={33.4} color={C.red} mark="!" size={42}>
					экзаменационные и сессионные стрессы
				</Bullet>
			</div>
		</Slide>

		<Slide from={36.1} to={VOICE[0] + GAP}>
			<div style={{position: 'absolute', left: 120, right: 120, top: 90, textAlign: 'center'}}>
				<Title at={36.2} size={52}>
					негативно влияют на <span style={{color: C.red}}>гормональный баланс</span>
					<br />и <span style={{color: C.red}}>репродуктивную функцию</span> молодого организма
				</Title>
			</div>
			<Photo src="img/09.jpg" at={37.3} contain style={{left: 120, top: 330, width: 820, height: 640}} />
			<Photo src="img/10.jpg" at={38.5} contain style={{left: 980, top: 330, width: 820, height: 640}} />
		</Slide>
	</>
);

// ---------- 2. Необходимость проекта ----------
const NEED = [
	[3.6, 'Системное решение проблем неправильного питания'],
	[7.4, 'Цели национального проекта «Демография»'],
	[10.8, 'Пропаганда здорового образа жизни'],
	[13.9, 'Снижение нагрузки на систему здравоохранения'],
	[16.9, 'Профилактика заболеваний пищеварительной системы'],
	[20.5, 'Сохранение репродуктивной функции человека'],
] as const;

const V2: React.FC = () => (
	<>
		<Slide from={0} to={24.6}>
			<Pad>
				<Kicker at={0.1}>Необходимость проекта</Kicker>
				<div style={{height: 24}} />
				<Title at={0.3} size={66}>
					Нужен проект, который предложит
					<br />
					<span style={{color: C.green}}>системное решение</span>
				</Title>
				<div style={{height: 60}} />
				<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34}}>
					{NEED.map(([at, text], i) => (
						<Appear key={text} at={at} scale dy={0}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 26,
									backgroundColor: C.card,
									borderRadius: 24,
									padding: '28px 34px',
									boxShadow: '0 14px 34px rgba(20,40,30,0.10)',
									borderLeft: `10px solid ${i % 2 ? C.leaf : C.green}`,
									height: 120,
								}}
							>
								<div style={{fontSize: 54, fontWeight: 800, color: C.lime, width: 60}}>{i + 1}</div>
								<div style={{fontSize: 34, fontWeight: 600, color: C.ink, lineHeight: 1.25}}>{text}</div>
							</div>
						</Appear>
					))}
				</div>
			</Pad>
		</Slide>
		<Slide from={24.6} to={VOICE[1] + GAP} bg={C.green}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', color: '#fff'}}>
				<Title at={24.7} size={64} color="#fff" style={{textAlign: 'center'}}>
					Рацион питания
				</Title>
				<div style={{height: 70}} />
				<div style={{display: 'flex', gap: 50}}>
					{(
						[
							[26.2, 'антибиотиков'],
							[27.4, 'гормонов роста'],
							[28.3, 'ГМО'],
						] as const
					).map(([at, text]) => (
						<Appear key={text} at={at} scale dy={0}>
							<div
								style={{
									width: 420,
									height: 300,
									borderRadius: 32,
									backgroundColor: 'rgba(255,255,255,0.1)',
									border: '3px solid rgba(255,255,255,0.3)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 22,
								}}
							>
								<div
									style={{
										width: 110,
										height: 110,
										borderRadius: '50%',
										backgroundColor: C.red,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Cross />
								</div>
								<div style={{fontSize: 44, fontWeight: 800}}>без {text}</div>
							</div>
						</Appear>
					))}
				</div>
			</AbsoluteFill>
		</Slide>
	</>
);

// ---------- 3. Кто предлагает ----------
const V3: React.FC = () => (
	<Slide from={0} to={VOICE[2] + GAP}>
		<Photo src="img/11.jpg" at={0} style={{left: 0, top: 0, width: 1920, height: 1080, borderRadius: 0}} zoom="out" />
		<AbsoluteFill
			style={{background: 'linear-gradient(90deg, rgba(15,40,28,0.92) 0%, rgba(15,40,28,0.75) 45%, rgba(15,40,28,0) 75%)'}}
		/>
		<div style={{position: 'absolute', left: 120, width: 1150, top: 150, color: '#fff'}}>
			<Kicker at={0.2} color={C.lime}>
				Первичная профсоюзная организация работников ДГТУ
			</Kicker>
			<div style={{height: 34}} />
			<Title at={3.0} size={66} color="#fff">
				предлагает проект
				<br />
				<span style={{color: C.lime}}>правильного питания</span>
			</Title>
			<div style={{height: 50}} />
			<Appear at={6.2}>
				<div style={{fontSize: 34, opacity: 0.85, marginBottom: 26}}>направленный на улучшение:</div>
			</Appear>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18}}>
				<Chip at={7.0} color={C.leaf}>умственной работоспособности</Chip>
				<Chip at={9.6} color={C.leaf}>концентрации внимания</Chip>
				<Chip at={10.9} color={C.leaf}>общего самочувствия студентов</Chip>
			</div>
		</div>
	</Slide>
);

// ---------- 4. Команда проекта ----------
const TEAM = [
	[0.0, 'img/12.jpg', 'Технологи общественного питания'],
	[2.0, 'img/13.jpg', 'Медицинские работники'],
	[3.1, 'img/14.jpg', 'Специалисты в области безопасности'],
] as const;

const V4: React.FC = () => (
	<>
		<Slide from={0} to={5.6}>
			<div style={{position: 'absolute', left: 120, top: 100}}>
				<Kicker at={0}>Команда проекта</Kicker>
			</div>
			{TEAM.map(([at, src, label], i) => (
				<React.Fragment key={src}>
					<Photo src={src} at={at} style={{left: 120 + i * 570, top: 210, width: 540, height: 600}} />
					<div style={{position: 'absolute', left: 120 + i * 570, width: 540, top: 840}}>
						<Title at={at + 0.2} size={40}>
							{label}
						</Title>
					</div>
				</React.Fragment>
			))}
		</Slide>
		<Slide from={5.6} to={VOICE[3] + GAP}>
			<Photo src="img/14.jpg" at={5.6} style={{left: 1020, top: 120, width: 780, height: 840}} />
			<div style={{position: 'absolute', left: 120, width: 820, top: 150}}>
				<Kicker at={5.7}>Окажут целевой группе</Kicker>
				<div style={{height: 26}} />
				<Title at={6.6} size={66} color={C.green}>
					комплексную поддержку
				</Title>
				<div style={{height: 54}} />
				<div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
					<Bullet at={8.3}>коррекция правильного питания</Bullet>
					<Bullet at={9.6}>устойчивые здоровые привычки</Bullet>
					<Bullet at={12.1}>пропаганда формирования здорового потомства у молодёжи</Bullet>
				</div>
			</div>
		</Slide>
	</>
);

// ---------- 5. Целевая группа ----------
const V5: React.FC = () => (
	<Slide from={0} to={VOICE[4] + GAP}>
		<Pad style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
			<Kicker at={0}>Целевая группа проекта</Kicker>
			<div style={{height: 50}} />
			<div style={{display: 'flex', gap: 80, alignItems: 'flex-end'}}>
				<Appear at={2.3}>
					<div style={{fontSize: 260, fontWeight: 800, color: C.green, lineHeight: 0.9, letterSpacing: -10}}>
						≈<CountUp at={2.4} to={100} dur={1} />
					</div>
					<div style={{fontSize: 46, fontWeight: 700, marginTop: 24}}>обучающихся ДГТУ</div>
				</Appear>
				<div style={{width: 4, height: 300, backgroundColor: C.lime, borderRadius: 2}} />
				<Appear at={5.2}>
					<div style={{fontSize: 200, fontWeight: 800, color: C.orange, lineHeight: 0.9, letterSpacing: -6}}>
						18–28
					</div>
					<div style={{fontSize: 46, fontWeight: 700, marginTop: 24}}>лет</div>
				</Appear>
			</div>
		</Pad>
	</Slide>
);

// ---------- 6. География ----------
const Region: React.FC<{at: number; name: string; cities: (readonly [number, string])[]; color: string}> = ({
	at,
	name,
	cities,
	color,
}) => (
	<Appear at={at} style={{flex: 1}}>
		<div
			style={{
				backgroundColor: C.card,
				borderRadius: 30,
				padding: '44px 50px',
				boxShadow: '0 20px 50px rgba(20,40,30,0.12)',
				borderTop: `12px solid ${color}`,
				height: 560,
			}}
		>
			<div style={{fontSize: 46, fontWeight: 800, color}}>{name}</div>
			<div style={{height: 34}} />
			<div style={{display: 'flex', flexWrap: 'wrap', gap: 18}}>
				{cities.map(([t, c]) => (
					<Chip key={c} at={t} color={color} size={36}>
						{c}
					</Chip>
				))}
			</div>
		</div>
	</Appear>
);

const V6: React.FC = () => (
	<>
		<Slide from={0} to={12.2}>
			<Pad>
				<Kicker at={0}>Проживающие на территории</Kicker>
				<div style={{height: 60}} />
				<div style={{display: 'flex', gap: 60}}>
					<Region
						at={1.2}
						name="Ростовская область"
						color={C.green}
						cities={[
							[2.9, 'Ростов-на-Дону'],
							[4.1, 'Азов'],
							[4.8, 'Таганрог'],
							[6.5, 'Волгодонск'],
							[7.6, 'Шахты'],
						]}
					/>
					<Region
						at={8.3}
						name="Ставропольский край"
						color={C.orange}
						cities={[
							[9.7, 'Пятигорск'],
							[10.9, 'Ставрополь'],
						]}
					/>
				</div>
			</Pad>
		</Slide>
		<Slide from={12.2} to={VOICE[5] + GAP}>
			<Photo src="img/03.jpg" at={12.2} style={{left: 0, top: 0, width: 1920, height: 1080, borderRadius: 0}} />
			<AbsoluteFill style={{backgroundColor: 'rgba(15,30,22,0.72)'}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center'}}>
				<Title at={12.4} size={70} color="#fff">
					Студенты, желающие <span style={{color: C.lime}}>преодолеть нарушения здоровья</span>,
				</Title>
				<div style={{height: 40}} />
				<Appear at={16.6}>
					<div style={{fontSize: 46, color: '#fff', opacity: 0.9, fontWeight: 500, lineHeight: 1.35}}>
						вызванные неправильно организованным
						<br />
						рационом своего питания
					</div>
				</Appear>
			</AbsoluteFill>
		</Slide>
	</>
);

// ---------- 7. Комплексная поддержка и результаты ----------
const RESULTS = [
	[21.6, 'Повысит информированность о качестве продуктов', 'органические продукты без ГМО, антибиотиков и гормонов роста'],
	[27.1, 'Увеличит количество точек питания в ДГТУ', 'с сертифицированной продукцией без ГМО'],
	[33.0, 'Привьёт установки здорового рациона', 'через своевременную диагностику заболеваний ЖКТ'],
	[0, 'Обучит навыкам выбора безопасных продуктов', 'мастер-классы и семинары по правильному питанию'],
] as const;

const Results: React.FC<{upTo: number; fourthAt: number | null}> = ({upTo, fourthAt}) => (
	<Pad>
		<Kicker at={fourthAt === null ? 21.2 : -10}>Результаты проекта</Kicker>
		<div style={{height: 40}} />
		<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36}}>
			{RESULTS.slice(0, upTo).map(([at, title, sub], i) => (
				<Appear key={title} at={i === 3 && fourthAt !== null ? fourthAt : fourthAt === null ? at : -10} scale dy={0}>
					<div
						style={{
							backgroundColor: C.card,
							borderRadius: 28,
							padding: '36px 40px',
							height: 330,
							boxShadow: '0 16px 40px rgba(20,40,30,0.12)',
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
						}}
					>
						<div
							style={{
								width: 74,
								height: 74,
								borderRadius: '50%',
								backgroundColor: i % 2 ? C.orange : C.green,
								color: '#fff',
								fontSize: 40,
								fontWeight: 800,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{i + 1}
						</div>
						<div style={{fontSize: 40, fontWeight: 800, color: C.ink, lineHeight: 1.18}}>{title}</div>
						<div style={{fontSize: 30, color: C.muted, fontWeight: 500, lineHeight: 1.3}}>{sub}</div>
					</div>
				</Appear>
			))}
		</div>
	</Pad>
);

const V7: React.FC = () => (
	<>
		<Slide from={0} to={8.2}>
			<Photo src="img/15.jpg" at={0.2} contain style={{left: 1040, top: 140, width: 760, height: 800}} />
			<div style={{position: 'absolute', left: 120, width: 860, top: 130}}>
				<Kicker at={0}>Комплексная поддержка</Kicker>
				<div style={{height: 20}} />
				<Title at={1.8} size={50}>
					в групповой и индивидуальной формах
				</Title>
				<div style={{height: 50}} />
				<Title at={3.4} size={44} color={C.green}>
					Диагностика заболеваний пищеварительного тракта
				</Title>
				<div style={{height: 50}} />
				<div style={{display: 'flex', gap: 30}}>
					{(
						[
							[5.6, 'ДО', 'март – апрель 2027', C.green],
							[7.6, 'ПОСЛЕ', 'декабрь 2027 – январь 2028', C.orange],
						] as const
					).map(([at, label, date, color]) => (
						<Appear key={label} at={at} scale dy={0} style={{flex: 1}}>
							<div style={{backgroundColor: color, color: '#fff', borderRadius: 24, padding: '26px 30px', height: 190}}>
								<div style={{fontSize: 30, fontWeight: 800, letterSpacing: 2, opacity: 0.85}}>{label}</div>
								<div style={{fontSize: 38, fontWeight: 700, marginTop: 12, lineHeight: 1.2}}>{date}</div>
							</div>
						</Appear>
					))}
				</div>
			</div>
		</Slide>
		<Slide from={8.2} to={21.0}>
			<Pad>
				<Kicker at={8.3}>Поможет сформировать у участников</Kicker>
				<div style={{height: 20}} />
				<Appear at={10.5}>
					<div style={{fontSize: 34, color: C.muted, fontWeight: 600}}>обучающихся ДГТУ 18–28 лет</div>
				</Appear>
				<div style={{height: 70}} />
				<div style={{display: 'flex', gap: 40}}>
					{(
						[
							[14.0, 'Навыки самодисциплины'],
							[16.0, 'Умение самостоятельно формировать рацион правильного питания'],
							[18.7, 'Адаптацию к социуму как активных субъектов заботы о здоровье и генофонде'],
						] as const
					).map(([at, text], i) => (
						<Appear key={text} at={at} style={{flex: 1}}>
							<div
								style={{
									backgroundColor: C.card,
									borderRadius: 30,
									padding: '44px 40px',
									height: 520,
									boxShadow: '0 16px 40px rgba(20,40,30,0.12)',
									borderTop: `12px solid ${[C.green, C.leaf, C.orange][i]}`,
								}}
							>
								<Leaf size={80} color={[C.green, C.leaf, C.orange][i]} />
								<div style={{height: 30}} />
								<div style={{fontSize: 42, fontWeight: 800, lineHeight: 1.22, color: C.ink}}>{text}</div>
							</div>
						</Appear>
					))}
				</div>
			</Pad>
		</Slide>
		<Slide from={21.0} to={VOICE[6] + GAP}>
			<Results upTo={3} fourthAt={null} />
		</Slide>
	</>
);

// ---------- 8. Итог ----------
const V8: React.FC = () => (
	<>
		<Slide from={0} to={14.6}>
			<Results upTo={4} fourthAt={0.6} />
		</Slide>
		<Slide from={14.6} to={VOICE[7] + GAP + OUTRO} bg={C.green}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', padding: '0 140px'}}>
				<Kicker at={14.8} color={C.lime}>
					Результат проекта
				</Kicker>
				<div style={{height: 30}} />
				<Appear at={15.6}>
					<div style={{fontSize: 38, opacity: 0.9, fontWeight: 500}}>
						на базе кафедры «Производственная безопасность» ДГТУ будет создан
					</div>
				</Appear>
				<div style={{height: 40}} />
				<Appear at={19.4} dy={0} scale>
					<Leaf size={120} color={C.lime} />
				</Appear>
				<div style={{height: 20}} />
				<Title at={19.6} size={46} color={C.lime}>
					студенческий клуб
				</Title>
				<div style={{height: 14}} />
				<Title at={20.6} size={92} color="#fff">
					«Органическое питание
					<br />
					для здорового потомства»
				</Title>
				<div style={{height: 50}} />
				<Appear at={23.4}>
					<div style={{fontSize: 36, opacity: 0.9, fontWeight: 500}}>
						ориентация студентов 18–28 лет на правильное питание
					</div>
				</Appear>
			</AbsoluteFill>
		</Slide>
	</>
);

const BLOCKS = [V1, V2, V3, V4, V5, V6, V7, V8];

const Progress: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				bottom: 0,
				height: 8,
				width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
				backgroundColor: C.lime,
			}}
		/>
	);
};

export const Slideshow: React.FC = () => {
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT}}>
			<style>{fontFaces}</style>
			<Sequence durationInFrames={Math.round(INTRO * fps)}>
				<Intro />
			</Sequence>
			{BLOCKS.map((Block, i) => (
				<Sequence
					key={i}
					from={Math.round(blockStarts[i] * fps)}
					durationInFrames={Math.round(blockLen(i) * fps)}
				>
					<Audio src={staticFile(`audio/v${i + 1}.ogg`)} endAt={Math.round(VOICE[i] * fps)} />
					<Block />
				</Sequence>
			))}
			<Progress />
		</AbsoluteFill>
	);
};
