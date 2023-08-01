import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
	title: string;
	value: string;
}

const ProjectCardContentWrapper = styled(motion.div)``;

const Title = styled.h3`
	opacity: 50%;
`;

const Value = styled.p``;

const childVariants = {
	hidden: {
		opacity: 0,
		x: -5,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const ProjectCardContent = (props: Props) => {
	const {
		title,
		value
	} = props;

	return (
		<ProjectCardContentWrapper
			variants={childVariants}
		>
			<Title className="type-small">
				{title}
			</Title>
			<Value className="type-label">
				{value}
			</Value>
		</ProjectCardContentWrapper>
	);
};

export default ProjectCardContent;
