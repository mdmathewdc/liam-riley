import styled from 'styled-components';
import { VideoType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectCardContent from '../ProjectCardContent';
import pxToRem from '../../../utils/pxToRem';
import ProjectCardGallery from './ProjectCardGallery';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MuxPlayer from "@mux/mux-player-react/lazy"; 
import { useState } from 'react';
import AnimatedLineWrapper from '../AnimatedLineWrapper';

type StyledProps = {
	$isHovered?: boolean;
}

type Props = {
	category: string;
	client: string;
	credits: [];
	gallery: VideoType[];
	slug: string;
	title: string;
	year: number;
	setIsHovered: (isHovered: boolean) => void;
	isHovered: boolean;
}

const ProjectCardWrapper = styled.div<StyledProps>`
	opacity: ${(props) => props.$isHovered ? 0.6 : 1};

	transition: opacity var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1 !important;
	}

	&:not(:last-child) {
		margin-bottom: ${pxToRem(64)};

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			margin-bottom: ${pxToRem(24)};
		}
	}
`;

const ContentWrapper = styled.div`
	margin-bottom: ${pxToRem(16)};
`;

const ContentInner = styled.div`
	grid-column: 3 / -1;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		flex-direction: column;
		align-items: flex-start;
	}
`;

const MainDesktopContentWrapper = styled(motion.div)`
	display: flex;
	column-gap: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const CreditsTrigger = styled.button`
	&.view-element-fade-in {
		transition-delay: 500ms;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MobileMuxWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: block;
		margin-bottom: ${pxToRem(8)};
		width: 100%;
	}
`;

const MainMobileContentWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: block;
	}
`;

const MobileContentTitle = styled.h3`
	margin-bottom: ${pxToRem(4)};
`;

const MobileContentCategory = styled.p`
	opacity: 50%;
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

const ProjectCard = (props: Props) => {
	const {
		category,
		client,
		credits,
		gallery,
		slug,
		title,
		setIsHovered,
		isHovered
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);

	const format = (str: string) => {
		return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
	};

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProjectCardWrapper
			ref={ref}
			$isHovered={isHovered}
			className="project-card-wrapper"
		>
			<ContentWrapper>
				<LayoutWrapper>
					<LayoutGrid>
						<ContentInner>
							<MobileMuxWrapper>
								{gallery?.length > 0 && gallery[0]?.asset?.playbackId && (
									<MuxPlayer
										streamType="on-demand"
										playbackId={gallery[0]?.asset?.playbackId}
										autoPlay="muted"
										loop={true}
										thumbnailTime={0}
										loading="viewport"
										style={{ aspectRatio: 16/9 }}
										muted={true}
										playsInline={true}
									/>
								)}
							</MobileMuxWrapper>
							<MainMobileContentWrapper>
								<MobileContentTitle className="type-label">
									{client} - {title}
									</MobileContentTitle>
								<MobileContentCategory className="type-label">
									{format(category)}
								</MobileContentCategory>
							</MainMobileContentWrapper>
							<MainDesktopContentWrapper
								variants={wrapperVariants}
								initial='hidden'
								animate={inView ? 'visible' : 'hidden'}
							>
								<ProjectCardContent
									title="Title"
									value={title}
								/>
								<ProjectCardContent
									title="Client"
									value={client}
								/>
								<ProjectCardContent
									title="Type"
									value={format(category)}
								/>
							</MainDesktopContentWrapper>
							<CreditsTrigger
								className={`animated-line-parent animated-line-parent--small type-label view-element-fade-in ${
									inView ? 'view-element-fade-in--in-view' : ''
								}`}
								onClick={() => setCreditsIsActive(!creditsIsActive)}
							>
								{creditsIsActive ? 'Hide Credits' : 'Credits'}
								<AnimatedLineWrapper strokeWidth={2} />
							</CreditsTrigger>
						</ContentInner>
					</LayoutGrid>
				</LayoutWrapper>
			</ContentWrapper>
			<ProjectCardGallery
				gallery={gallery}
				credits={credits}
				creditsIsActive={creditsIsActive}
				slug={slug}
				setIsHovered={setIsHovered}
			/>
		</ProjectCardWrapper>
	);
};

export default ProjectCard;
