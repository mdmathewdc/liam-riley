import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	title: string;
	count: number;
}

const MainFilterCardTrigger = styled(motion.button)`
	display: flex;
	align-items: flex-end;
`;

const Title = styled.div`
	margin-right: ${pxToRem(8)};
`;

const Count = styled.div`
	line-height: 1.2;
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
		count
	} = props;

	return (
		<MainFilterCardTrigger
			variants={childVariants}
		>
			<Title className="type-h3">
				{title}
			</Title>
			<Count>
				{count}
			</Count>
		</MainFilterCardTrigger>
	);
};

export default MainFilterCard;
