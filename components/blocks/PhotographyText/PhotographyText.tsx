import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$canHover: boolean;
}

type Props = {
	isActive: string | boolean;
	text: string;
};

const PhotographyTextWrapper = styled(motion.section)`
	position: fixed;
	height: 100vh;
	width: 100%;
	color: var(--colour-white);
	mix-blend-mode: difference;
	overflow: auto;
	text-align: center;
	padding: ${pxToRem(24)} 0 ${pxToRem(80)};
`;

const Word = styled(motion.span)<StyledProps>`
	font-size: 6vw;
	line-height: 5vw;
	cursor: pointer;

	&:hover {
		font-style: ${(props) => props.$canHover ? 'italic' : 'normal'};
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

const PhotographyText = (props: Props) => {
	const {
		isActive,
		text
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
					>
						{wordsArray.map((word, index) => (
							<Word
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.1,
									ease: 'easeInOut',
									delay: index * 0.1
								}}
								$canHover={word.length > 3}
							>
								{word}{" "}
							</Word>
						))}
					</PhotographyTextWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default PhotographyText;
