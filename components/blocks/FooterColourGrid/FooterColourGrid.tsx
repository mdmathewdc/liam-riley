import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';
import LayoutGrid from '../../common/LayoutGrid';
import Link from 'next/link';
import FooterColorBlock from '../../elements/FooterColorBlock';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	colors: [
		ColorType
	]
};

const FooterColourGridWrapper = styled(motion.a)`
	display: flex;

	.layout-grid {
		grid-column-gap: 0;
		width: 100%;
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0,
			ease: 'easeInOut',
			staggerChildren: 0.05,
			when: 'beforeChildren'
		}
	}
};

const FooterColourGrid = (props: Props) => {
	const {
		colors
	} = props;

	const hasColors = colors.length > 0;
	const firstTwelveColors = colors.slice(0, 12);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<>
			{hasColors && (
				<Link href="/photography" passHref>
					<FooterColourGridWrapper
						ref={ref}
						className="footer-colour-grid"
						variants={wrapperVariants}
						initial='hidden'
						animate={inView ? 'visible' : 'hidden'}
					>
						<LayoutGrid>
							{firstTwelveColors.map((item, i) => (
								<FooterColorBlock
									color={item.hex}
									colors={colors}
									key={i}
								/>
							))}
						</LayoutGrid>
					</FooterColourGridWrapper>
				</Link>
			)}
		</>
	);
};

export default FooterColourGrid;
