import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { PortableText } from '@portabletext/react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	credits: [];
	creditsIsActive: boolean;
}

const ProjectCardCreditsWrapper = styled(motion.div)`
	position: absolute;
	top: 0;
	right: 0;
	width: 350px;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	padding: ${pxToRem(16)};
	overflow: auto;

	* {
		color: var(--colour-white);
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
			ease: 'easeInOut'
		}
	}
};

const ProjectCardCredits = ({ credits, creditsIsActive }: Props) => {
	const components = {
		marks: {
			link: ({value, children}) => {
				const { blank, href } = value
				return blank ?
				<a href={href} target="_blank" rel="noopener">{children}</a>
				: <a href={href} target="_blank" rel="noopener">{children}</a>
			}
		}
	};

	return (
		<>
			<AnimatePresence>
				{creditsIsActive && (
					<ProjectCardCreditsWrapper
						className="type-small"
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						{credits && (
							<PortableText
								value={credits}
								components={components}
							/>
						)}
					</ProjectCardCreditsWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProjectCardCredits;
