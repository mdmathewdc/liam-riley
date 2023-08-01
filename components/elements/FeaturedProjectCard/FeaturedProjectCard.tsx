import styled from 'styled-components';
import { ProjectsType } from '../../../shared/types/types';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, motionValue, useScroll, useTransform } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react';
import { useMousePosition } from '../../../hooks/useMousePosition';

type StyledProps = {
	$fontSize: string;
	$lineHeight: string;
	$isActive: string | boolean;
}

type Props = {
	data: ProjectsType;
	index: number;
	handleTitleWidth: (width: number) => void;
	fontSize: string;
	lineHeight: string;
	setIsHovered: (isHovered: boolean) => void;
}

const FeaturedProjectCardWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(16)};
	transform-origin: center left;
	position: relative;
	z-index: 1;

	&:hover {
		z-index: 10;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(32)};
	}
`;

const Inner = styled.div`
	&:hover {
		opacity: 1 !important;
	}

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Index = styled.p`
	grid-column: 1 / 3;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: 0.875rem !important;
		line-height: 1 !important;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const TitleWrapper = styled.a`
	grid-column: 3 / -1;
	display: flex;
	align-items: flex-end;
	text-decoration: none;
	position: relative;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Title = styled.h3<StyledProps>`
	margin-right: ${pxToRem(16)};
	font-size: ${props => props.$fontSize} !important;
	line-height: 0.8 !important;
	white-space: nowrap;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		margin-right: ${pxToRem(8)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: 2.875rem !important;
		line-height: 0.9 !important;
		white-space: initial;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		font-size: 1.875rem !important;
		line-height: 1.875rem !important;
		margin-bottom: ${pxToRem(8)};
	}
`;

const Client = styled.p`
	white-space: nowrap;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: 0.875rem !important;
		line-height: 1 !important;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		/* display: none; */
	}
`;

const FeaturedProjectSnippet = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 300px;
	height: 169px;
	z-index: 10;
	pointer-events: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}

	mux-player {
		position: absolute;
		inset: 0;
		width: 300px;
		height: 169px;

		--media-object-fit: cover;
		--media-object-position: center;
		--controls: none;
	}
`;

const FeaturedProjectSnippetInner = styled(motion.div)`
	position: relative;
	width: 300px;
	height: 169px;
	pointer-events: none;
`;

const MobileSnippetWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		grid-column: 1 / -1;
	}
`;

const FeaturedProjectCard = (props: Props) => {
	const {
		data,
		index,
		handleTitleWidth,
		fontSize,
		lineHeight,
		setIsHovered
	} = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);
	const [snippetVideo, setSnippetVideo] = useState<boolean | string>(false);

	const position = useMousePosition();

	let mouseXPosition = position.x;

	const formattedIndex = index < 10 ? `0${index}` : index;

	const ref = useRef<HTMLAnchorElement>(null);
	const wrapperDiv = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref?.current) {
			handleTitleWidth(ref.current.offsetWidth);
		}
	}, [ref.current]);

	useEffect(() => {
		if (wrapperDiv?.current) {
			setDistanceToTop(window.pageYOffset + wrapperDiv.current.getBoundingClientRect().top);
		}

		setWindowHeight(window.innerHeight);
		setWindowWidth(window.innerWidth);
	}, []);

	const { scrollY } = useScroll();

	const wrapperRotate = useTransform(
		scrollY,
		[distanceToTop - windowHeight, distanceToTop + distanceToTop / 4],
		['rotateY(25deg)', 'rotateY(-25deg)']
	);

	const wrapperOpacity = useTransform(
		scrollY,
		[distanceToTop - windowHeight, distanceToTop - (windowHeight - 150)],
		[0, 1]
	);

	const motionMouseXPosition = motionValue(mouseXPosition);

	const snippetCursorRotate = useTransform(
		motionMouseXPosition,
		[windowWidth / 4, windowWidth],
		['rotate(0deg) translateX(0)', 'rotate(10deg) translateX(0)']
	);

	const wrapperVariants = {
		hidden: {
			x: mouseXPosition,
			transition: {
				type: 'spring',
				mass: 0.05,
				stiffness: 1000,
				damping: 40,
				ease: 'linear'
			}
		},
		visible: {
			x: mouseXPosition,
			transition: {
				type: 'spring',
				mass: 0.05,
				stiffness: 1000,
				damping: 40,
				ease: 'linear'
			}
		}
	};

	const innerVariants = {
		hidden: {
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		}
	};

	return (
		<FeaturedProjectCardWrapper
			className="featured-project-card"
			ref={wrapperDiv}
			style={{
				transform: wrapperRotate,
				opacity: wrapperOpacity
			}}
		>
			<Inner
				className="featured-project-card__inner"
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<LayoutGrid>
					<Index $isActive={snippetVideo}>
						{formattedIndex}
					</Index>
					<MobileSnippetWrapper>
						<MuxPlayer
							streamType="on-demand"
							playbackId={data.snippetVideo?.asset?.playbackId}
							autoPlay="muted"
							loop={true}
							thumbnailTime={0}
							preload="auto"
							muted={true}
						/>
					</MobileSnippetWrapper>
					<Link href={`/projects/${data?.slug}`} passHref>
						<TitleWrapper
							ref={ref}
							onMouseOver={() => setSnippetVideo(data.snippetVideo?.asset?.playbackId)}
							onMouseOut={() => setSnippetVideo(false)}
							className="featured-project-card__title-wrapper"
						>
							{data?.title && (
								<Title
									className="type-h1"
									$fontSize={fontSize}
									$lineHeight={lineHeight}
									$isActive={snippetVideo}
								>
									{data.title}
								</Title>
							)}
							{data?.client && (
								<Client
									className="type-p"
									$isActive={snippetVideo ? true : false}
								>
									{data.client}
								</Client>
							)}
						</TitleWrapper>
					</Link>
				</LayoutGrid>
			</Inner>
			<AnimatePresence>
				{snippetVideo && (
					<FeaturedProjectSnippet
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<FeaturedProjectSnippetInner
							variants={innerVariants}
							style={{
								transform: snippetCursorRotate
							}}
						>
							<MuxPlayer
								streamType="on-demand"
								playbackId={snippetVideo}
								autoPlay="muted"
								loop={true}
								thumbnailTime={0}
								preload="auto"
								muted={true}
							/>
						</FeaturedProjectSnippetInner>
					</FeaturedProjectSnippet>
				)}
			</AnimatePresence>
		</FeaturedProjectCardWrapper>
	);
};

export default FeaturedProjectCard;
