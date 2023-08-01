import styled from 'styled-components';
import { ProjectsType } from '../../../shared/types/types';
import ProjectCard from '../../elements/ProjectCard';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { AnimatePresence, motion } from 'framer-motion';

type StyledProps = {
	$isLoading: boolean;
}

type Props = {
	projects: ProjectsType[];
	handleLoadMore: () => void;
	noMoreProjectsToFetch: boolean;
	isLoading: boolean;
}

const ProjectsListWrapper = styled.section<StyledProps>`
	position: relative;
	z-index: 2;
	margin-bottom: ${pxToRem(240)};
	pointer-events: ${(props) => props.$isLoading ? 'none' : 'auto'};
	opacity: ${(props) => props.$isLoading ? 0.5 : 1};

	transition: opacity var(--transition-speed-default) var(--transition-ease);
`;

const LoadMoreWrapper = styled(motion.div)<StyledProps>`
	grid-column: 3 / -1;
	text-align: left;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		padding-bottom: ${(props) => props.$isLoading ? pxToRem(1000) : 0};
	}
`;

const LoadMoreTrigger = styled.button`
	text-align: left;
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

const ProjectsList = (props: Props) => {
	const {
		projects,
		handleLoadMore,
		noMoreProjectsToFetch,
		isLoading
	} = props;

	const hasProjects = projects?.length > 0;

	return (
		<ProjectsListWrapper $isLoading={isLoading}>
			{hasProjects && projects.map((item, i) => (
				<ProjectCard
					category={item?.category}
					client={item?.client}
					credits={item?.credits}
					gallery={item?.gallery}
					slug={item?.slug?.current}
					title={item?.title}
					year={item?.year}
					key={i}
				/>
			))}
			<AnimatePresence>
				{!noMoreProjectsToFetch && (
					<LayoutWrapper>
						<LayoutGrid>
							<LoadMoreWrapper
								variants={wrapperVariants}
								initial='hidden'
								animate='visible'
								exit='hidden'
								$isLoading={isLoading}
							>
								<LoadMoreTrigger
									className="type-h3"
									onClick={() => handleLoadMore()}
								>
									{isLoading ? 'Loading...' : 'Load More'}
								</LoadMoreTrigger>
							</LoadMoreWrapper>
						</LayoutGrid>
					</LayoutWrapper>
				)}
			</AnimatePresence>
		</ProjectsListWrapper>
	);
};

export default ProjectsList;
