import styled from 'styled-components';
import { ImageType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useRef, useState } from 'react';

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

const ImgWrapper = styled.div`
	width: 100%;
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
	const random10Images = images.sort(() => 0.5 - Math.random()).slice(0, 10);

	useEffect(() => {
		const outerContainer = outerContainerRef.current;

		if (!outerContainer) return;

		const innerContainer = outerContainer?.children[0]?.children[0];

		const handleScroll = () => {
			const isBottom = (innerContainer.scrollHeight - innerContainer.scrollTop) - 10 <= innerContainer.clientHeight;

			console.log('isBottom', isBottom);
			

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
					<ResponsiveMasonry
						columnsCountBreakPoints={{350: 1, 750: 2}}
					>
						<Masonry gutter="16px">
							{random10Images.map((item, i) => (
								<ImgWrapper key={i}>
									<Img src={item?.asset?.url} />
								</ImgWrapper>
							))}
						</Masonry>
					</ResponsiveMasonry>
				</PhotographyAllImagesWrapper>
			)}
		</AnimatePresence>
	);
};

export default PhotographyAllImages;
