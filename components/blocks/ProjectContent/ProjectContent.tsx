import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectCardContent from '../../elements/ProjectCardContent';
import pxToRem from '../../../utils/pxToRem';
import { PortableText } from '@portabletext/react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	title: string;
	client: string;
	year: number;
	credits: [];
	category: string;
};

const ProjectContentWrapper = styled.section`
	margin-bottom: ${pxToRem(160)};
`;

const ProjectContentInner = styled.div`
	grid-column: 3 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const Title = styled.h1`
	margin-bottom: ${pxToRem(24)};
`;

const SecondaryContentWrapper = styled(motion.div)`
	display: flex;
	column-gap: ${pxToRem(24)};
	margin-bottom: ${pxToRem(32)};
`;

const CreditsWrapper = styled.div``;

const Subtitle = styled.h3`
	opacity: 50%;
`;

const PortableTextWrapper = styled.div``;

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

const ProjectContent = (props: Props) => {
	const {
		title,
		client,
		year,
		credits,
		category
	} = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const { ref: ref2, inView: inView2 } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProjectContentWrapper ref={ref}>
			<LayoutWrapper>
				<LayoutGrid>
					<ProjectContentInner>
						{title && (
							<Title
								className={`type-h3 view-element-bottom-top ${
									inView ? 'view-element-bottom-top--in-view' : ''
								}`}
							>
								{title}
							</Title>
						)}
						<SecondaryContentWrapper
							variants={wrapperVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						>
							{client && (
								<ProjectCardContent
									title="Client"
									value={client}
								/>
							)}
							{year && (
								<ProjectCardContent
									title="Year"
									value={year}
								/>
							)}
							{category && (
								<ProjectCardContent
									title="Type"
									value={category}
								/>
							)}
						</SecondaryContentWrapper>
						{credits && (
							<CreditsWrapper
								ref={ref2}
								className={`view-element-bottom-top ${
									inView2 ? 'view-element-bottom-top--in-view' : ''
								}`}
							>
								<Subtitle className="type-small">Credits</Subtitle>
								<PortableTextWrapper className="type-label">
									<PortableText
										value={credits}
									/>
								</PortableTextWrapper>
							</CreditsWrapper>
						)}
					</ProjectContentInner>
				</LayoutGrid>
			</LayoutWrapper>
		</ProjectContentWrapper>
	);
};

export default ProjectContent;
