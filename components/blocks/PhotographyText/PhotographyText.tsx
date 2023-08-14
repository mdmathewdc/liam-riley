import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import PhotographyImages from '../PhotographyImages';
import { useState } from 'react';
import { ImageType } from '../../../shared/types/types';

type StyledProps = {
	$canHover?: boolean;
	$bg?: string | boolean;
	$cannotHover?: boolean;
}

type WordProps = {
	word: string;
	index: number;
	canHover: boolean;
	images: ImageType[];
	setSeeAllImages: (value: boolean) => void;
	cannotHover: boolean;
}

type Props = {
	isActive: string | boolean;
	text: string;
	images: ImageType[];
	backgroundColour: string | boolean;
	setSeeAllImages: (value: boolean) => void;
	cannotHover: boolean;
};

const PhotographyTextWrapper = styled(motion.section)<StyledProps>`
	position: fixed;
	height: 100vh;
	width: 100%;
	overflow: auto;
	text-align: center;
	padding: ${pxToRem(24)} 0 ${pxToRem(160)};
	z-index: 5;
	background: ${(props) => props.$bg ? props.$bg : 'transparent'};
	pointer-events: ${(props) => props.$cannotHover ? 'none' : 'auto'};

	.word {
		visibility: ${(props) => props.$cannotHover ? 'hidden' : 'visible'};
	}
`;

const Word = styled(motion.span)<StyledProps>`
	font-size: 6vw;
	line-height: 5vw;
	cursor: pointer;
	z-index: 5;
	color: var(--colour-white);
	mix-blend-mode: difference;
	position: relative;

	&:hover {
		font-style: ${(props) => props.$canHover ? 'italic' : 'normal'};
		z-index: 15;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: 8vw;
		line-height: 7vw;
	}
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
			ease: 'easeInOut',
			delay: 1
		}
	}
};

const PhotographyWord = (props: WordProps) => {
	const {
		index,
		word,
		canHover,
		images,
		setSeeAllImages,
		cannotHover
	} = props;

	const [photosActive, setPhotosActive] = useState<null | string>(null);

	return (
		<>
			{word && (
				<Word
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.05,
						ease: 'easeInOut',
						delay: index * 0.05
					}}
					$canHover={canHover}
					onMouseOver={() => setPhotosActive(canHover ? word : null)}
					onMouseOut={() => setPhotosActive(null)}
					onBlur={() => () => {
						setPhotosActive(null);
						setSeeAllImages(false);
					}}
					onClick={() => setSeeAllImages(true)}
					className="word"
				>
					{word}{" "}
				</Word>
			)}
			<PhotographyImages
				images={images}
				word={photosActive}
				cannotHover={cannotHover}
			/>
		</>
	);
}

const PhotographyText = (props: Props) => {
	const {
		isActive,
		text,
		images,
		backgroundColour,
		setSeeAllImages,
		cannotHover
	} = props;

	const wordsArray = text.split(" ").map(word => word.replace(/[.,!?;:]/g, ""));

	return (
		<>
			<AnimatePresence>
				{isActive && (
					<PhotographyTextWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						$bg={backgroundColour}
						$cannotHover={cannotHover}
					>
						{wordsArray.map((word, index) => (
							<PhotographyWord
								key={index}
								index={index}
								canHover={word.length > 3}
								word={word}
								images={images}
								setSeeAllImages={setSeeAllImages}
								cannotHover={cannotHover}
							/>
						))}
					</PhotographyTextWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default PhotographyText;
