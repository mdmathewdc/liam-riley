import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useViewportWidth from '../../../hooks/useViewportWidth';

const AcknowledgementWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5000;
	width: 100%;
	height: 100vh;
	height: 100dvh;
`;

const Background = styled.div`
	position: absolute;
	inset: 0;
	background: var(--colour-light);
	opacity: 0.95;
	z-index: 1;
`;

const ContentWrapper = styled.div`
	width: 100%;
	height: 100vh;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	z-index: 2;
	padding: ${pxToRem(16)} 0;
`;

const Hint = styled.p`
	color: var(--colour-dark);
	margin-bottom: ${pxToRem(4)};
`;

const Content = styled.h3`
	color: var(--colour-dark);
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

type Props = {
	hasVisited: boolean;
	content: string;
};

const Acknowledgement = (props: Props) => {
	const {
		hasVisited,
		content
	} = props;

	const [isActive, setIsActive] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	const viewportWidth = useViewportWidth();

	useEffect(() => {
		if (viewportWidth === 'mobile' || viewportWidth === 'tabletPortrait') {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [viewportWidth]);
	

	useEffect(() => {
		const handleScroll = () => {
			setIsActive(false);
		};
		
		if (isActive) {
			window.addEventListener('scroll', handleScroll);
		}
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isActive]);

	return (
		<>
			<AnimatePresence>
				{(isActive && !hasVisited) && (
					<AcknowledgementWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						onClick={() => setIsActive(false)}
					>
						<Background />
						<ContentWrapper>
							<LayoutWrapper>
								<Hint>{isMobile ? 'Tap' : 'Scroll'} to continue</Hint>
								{content && (
									<Content>{content}</Content>
								)}
							</LayoutWrapper>
						</ContentWrapper>
					</AcknowledgementWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default Acknowledgement;
