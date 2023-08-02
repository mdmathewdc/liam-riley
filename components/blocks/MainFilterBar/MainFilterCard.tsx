import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';
import AnimatedLineWrapper from '../../elements/AnimatedLineWrapper';

type StyledProps = {
	$isActive: boolean;
}

type Props = {
	title: string;
	count: number;
	handleFilterClick: (filter: string[]) => void;
	isActive: boolean;
	handleSlideToIndex: () => void;
}

const MainFilterCardTrigger = styled(motion.button)`
	display: flex;
	align-items: flex-end;

	&:hover {
		div {
			opacity: 1 !important;
		}
	}
`;

const Title = styled.div<StyledProps>`
	margin-right: ${pxToRem(8)};
	opacity: ${(props) => props.$isActive ? 1 : 0.5};

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Count = styled.div<StyledProps>`
	line-height: 1.2;
	opacity: ${(props) => props.$isActive ? 1 : 0.5};

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const childVariants = {
	hidden: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const MainFilterCard = (props: Props) => {
	const {
		title,
		count,
		handleFilterClick,
		isActive,
		handleSlideToIndex
	} = props;

	let filter = ['narrative', 'commercial', 'music-video'];

	if (title === 'All') {
		filter = ['narrative', 'commercial', 'music-video'];
	} else if (title === 'Narrative') {
		filter = ['narrative'];
	} else if (title === 'Commercial') {
		filter = ['commercial'];
	} else if (title === 'Music Video') {
		filter = ['music-video'];
	}

	const handleClick = () => {
		handleSlideToIndex();
		handleFilterClick(filter)
	}

	return (
		<MainFilterCardTrigger
			variants={childVariants}
			onClick={() => handleClick()}
		>
			<Title
				className="type-h3"
				$isActive={isActive}
			>
				{title}
			</Title>
			<Count $isActive={isActive}>
				{count}
			</Count>
		</MainFilterCardTrigger>
	);
};

export default MainFilterCard;
