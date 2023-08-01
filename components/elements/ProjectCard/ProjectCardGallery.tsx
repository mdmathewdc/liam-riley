import styled from 'styled-components';
import { VideoType } from '../../../shared/types/types';
import useEmblaCarousel from 'embla-carousel-react';
import pxToRem from '../../../utils/pxToRem';
import ProjectCardGallerySlide from './ProjectCardGallerySlide';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectCardCredits from './ProjectCardCredits';

type Props = {
	gallery: VideoType[];
	credits: [];
	creditsIsActive: boolean;
}

const ProjectCardGalleryWrapper = styled(motion.div)`
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const Embla = styled.div`
	overflow: hidden;
`;

const EmblaContainer = styled.div`
	display: flex;
	padding-left: calc(20% - 32px);
	margin-right: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-left: ${pxToRem(16)};
		margin-right: 0;
	}
`;

const EmblaSlide = styled.div`
	flex: 0 0 auto;
	min-width: 0;
	height: ${pxToRem(205)};

	mux-player {
		height: ${pxToRem(205)};
		--media-object-fit: cover;
		--media-object-position: center;
		--controls: none;
		transition: all 0 var(--transition-ease) !important;
	}
`;

const ProjectCardGallery = ({ gallery, credits, creditsIsActive }: Props) => {
	const hasSlides = gallery?.length > 0;

	let gallerySlides: VideoType[] = [];

	if (hasSlides) {
		if (gallery.length < 5) {
			gallerySlides = [...gallery, ...gallery];
		}
		else {
			gallerySlides = gallery;
		}
	}

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: 'start',
		dragFree: true,
	});

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProjectCardGalleryWrapper
			className={`view-element-left-right ${
				inView ? 'view-element-left-right--in-view' : ''
			}`}
			ref={ref}
		>
			{hasSlides && (
				<Embla
					className="embla"
					ref={emblaRef}
				>
					<EmblaContainer className="embla__container">
						{gallerySlides.map((item, i) => (
							<EmblaSlide
								className="embla__slide"
								key={i}
							>
								<ProjectCardGallerySlide
									data={item?.asset?.playbackId}
								/>
							</EmblaSlide>
						))}
					</EmblaContainer>
				</Embla>
			)}
			<ProjectCardCredits
				credits={credits}
				creditsIsActive={creditsIsActive}
			/>
		</ProjectCardGalleryWrapper>
	);
};

export default ProjectCardGallery;
