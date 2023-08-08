import styled from 'styled-components';
import { ImageType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useRef, useState } from 'react';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';

type StyledProps = {
	$randStartPosition: number;
	$randMarginBottom: number;
	$randPaddingTop: number;
}

type Props = {
	images: ImageType[];
	isActive: boolean;
	setSeeAllImages: (value: boolean) => void;
};

const PhotographyAllImagesWrapper = styled(motion.section)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 15;

	& > div {
		& > div {
			height: 100vh;
			overflow: auto;
			padding: ${pxToRem(120)} ${pxToRem(16)};

			& > div {
				& > div {
					&:last-child {
						padding-bottom: ${pxToRem(80)};
					}
				}
			}

		}
	}
`;

const ImgWrapper = styled.div<StyledProps>`
	width: 100%;

	&:nth-child(6n + 1) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 3`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 2) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 4`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 3) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 3`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 4) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 5`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 5) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 3`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 6) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 4`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 7) {
		grid-column: ${(props) => `${props.$randStartPosition} / span 3`};
		margin-bottom: ${(props) => `${props.$randMarginBottom}px`};
		padding-top: ${(props) => `${props.$randPaddingTop}px`};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}
`;

const Img = styled.img`
	width: 100%;
	height: auto;
`;

const wrapperVariants = {
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

const PhotographyAllImages = (props: Props) => {
	const {
		images,
		isActive,
		setSeeAllImages
	} = props;

	const hasImages = images.length > 0;

	if (!hasImages) <></>;

	const outerContainerRef = useRef<HTMLDivElement>(null);

	const randomImages = images.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * (6 - 2 + 1)) + 2);

	useEffect(() => {
		const outerContainer = outerContainerRef.current;

		if (!outerContainer) return;

		const innerContainer = outerContainer?.children[0]?.children[0];

		const handleScroll = () => {
			const isBottom = (innerContainer.scrollHeight - innerContainer.scrollTop) - 10 <= innerContainer.clientHeight;

			setSeeAllImages(!isBottom);
		};

		innerContainer.addEventListener('scroll', handleScroll);

		return () => {
			innerContainer.removeEventListener('scroll', handleScroll);
		};
	}, [isActive]);

	return (
		<AnimatePresence>
			{(isActive && hasImages) && (
				<PhotographyAllImagesWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					ref={outerContainerRef}
				>
					<LayoutWrapper>
						<LayoutGrid>
							{randomImages.map((item, i) => (
								<ImgWrapper
									className="photo-wrapper"
									key={i}
									$randStartPosition={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
									$randMarginBottom={Math.floor(Math.random() * (360 - 10 + 1)) + 10}
									$randPaddingTop={Math.floor(Math.random() * (120 - 10 + 1)) + 10}
								>
									<Img src={item?.asset?.url} />
								</ImgWrapper>
							))}
						</LayoutGrid>
					</LayoutWrapper>
				</PhotographyAllImagesWrapper>
			)}
		</AnimatePresence>
	);
};

export default PhotographyAllImages;
