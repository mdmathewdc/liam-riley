import styled from 'styled-components';
import { ImageType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	images: ImageType[];
	word: string | null;
}

const PhotographyImagesWrapper = styled(motion.section)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100vh;
	z-index: 10;
	overflow: auto;
	padding: ${pxToRem(120)} ${pxToRem(16)};
	pointer-events: none;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Img = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: contain;
	height: 100%;
	width: 100%;
	max-width: 50vw;
	max-height: 70vh;
	z-index: 10;
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

const PhotographyImages = (props: Props) => {
	const {
		images,
		word
	} = props;

	const randomImage = images[Math.floor(Math.random() * images.length)];

	return (
		<>
			<AnimatePresence>
				{word && (
					<PhotographyImagesWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<Img
							src={randomImage?.asset?.url}
						/>
					</PhotographyImagesWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default PhotographyImages;
