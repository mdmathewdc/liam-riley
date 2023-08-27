import styled from 'styled-components';
import { VideoType } from '../../../shared/types/types';
import useEmblaCarousel from 'embla-carousel-react';
import pxToRem from '../../../utils/pxToRem';
import ProjectCardGallerySlide from './ProjectCardGallerySlide';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectCardCredits from './ProjectCardCredits';
import Link from 'next/link';

type Props = {
	gallery: VideoType[];
	credits: [];
	creditsIsActive: boolean;
	slug: string;
	setIsHovered: (isHovered: boolean) => void;
}

const ProjectCardGalleryWrapper = styled(motion.div)`
	position: relative;
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const Embla = styled.a`
	overflow: hidden;
`;

const EmblaContainer = styled.div`
	display: flex;
	padding-left: calc(20% - 32px);
	margin-right: ${pxToRem(16)};

	transition: padding-left var(--transition-speed-default) var(--transition-ease);

	&:hover {
		padding-left: calc(20% - 50px);
	}

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

const ProjectCardGallery = (props: Props) => {
	const {
		gallery,
		credits,
		creditsIsActive,
		slug,
		setIsHovered
	} = props;

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

	function handleCardClick() {
		sessionStorage.setItem('scrollPosition', window.scrollY.toString());
	}

	return (
		<ProjectCardGalleryWrapper
			className={`gallery-wrapper view-element-left-right ${
				inView ? 'view-element-left-right--in-view' : ''
			}`}
			ref={ref}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}			
		>
			{hasSlides && (
				<Link href={`/projects/${slug}`} passHref scroll={false}>
					<Embla
						className="embla"
						ref={emblaRef}
						onClick={handleCardClick}
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
				</Link>
			)}
			<ProjectCardCredits
				credits={credits}
				creditsIsActive={creditsIsActive}
			/>
		</ProjectCardGalleryWrapper>
	);
};

export default ProjectCardGallery;
