import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MainFilterCard from './MainFilterCard';
import pxToRem from '../../../utils/pxToRem';
import useEmblaCarousel from 'embla-carousel-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	categories: {
		[key: string]: number;
	}
	allProjectsCount: number;
	handleFilterClick: (filter: string[]) => void;
	activeFilters: string[];
};

const MainFilterBarWrapper = styled.div`
	padding: ${pxToRem(64)} 0;
	position: relative;
	z-index: 2;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		padding: ${pxToRem(64)} 0 ${pxToRem(32)};
	}
`;

const MainFilterBarInner = styled.div`
	grid-column: 3 / -1;
	padding-left: calc(20% - 32px);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		padding-left: ${pxToRem(16)};
	}
`;

const Embla = styled.div`
	overflow: hidden;
`;

const EmblaContainer = styled(motion.div)`
	display: flex;
`;

const EmblaSlide = styled.div`
	flex: 0 0 auto;
	min-width: 0;
	margin-right: ${pxToRem(24)};
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
			staggerChildren: 0.1,
			when: 'beforeChildren'
		}
	}
};

const MainFilterBar = (props: Props) => {
	const {
		categories,
		allProjectsCount,
		handleFilterClick,
		activeFilters
	} = props;

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<MainFilterBarWrapper
			ref={ref}
		>
			<MainFilterBarInner>
				<Embla className="embla" ref={emblaRef}>
					<EmblaContainer
						className="embla__container"
						variants={wrapperVariants}
						initial='hidden'
						animate={inView ? 'visible' : 'hidden'}
					>
						<EmblaSlide className="embla__slide">
							<MainFilterCard
								title="All"
								count={allProjectsCount}
								handleFilterClick={handleFilterClick}
								isActive={activeFilters.length === 3}
								handleSlideToIndex={() => emblaApi?.scrollTo(0)}
							/>
						</EmblaSlide>
						<EmblaSlide className="embla__slide">
							<MainFilterCard
								title="Commercial"
								count={categories['commercial']}
								handleFilterClick={handleFilterClick}
								isActive={activeFilters.includes('commercial') && activeFilters.length === 1}
								handleSlideToIndex={() => emblaApi?.scrollTo(1)}
							/>
						</EmblaSlide>
						<EmblaSlide className="embla__slide">
							<MainFilterCard
								title="Music Video"
								count={categories['music-video']}
								handleFilterClick={handleFilterClick}
								isActive={activeFilters.includes('music-video') && activeFilters.length === 1}
								handleSlideToIndex={() => emblaApi?.scrollTo(2)}
							/>
						</EmblaSlide>
						<EmblaSlide className="embla__slide">
							<MainFilterCard
								title="Narrative"
								count={categories['narrative']}
								handleFilterClick={handleFilterClick}
								isActive={activeFilters.includes('narrative') && activeFilters.length === 1}
								handleSlideToIndex={() => emblaApi?.scrollTo(3)}
							/>
						</EmblaSlide>
					</EmblaContainer>
				</Embla>
			</MainFilterBarInner>
		</MainFilterBarWrapper>
	);
};

export default MainFilterBar;
