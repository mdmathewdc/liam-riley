import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import LayoutGrid from '../../common/LayoutGrid';
import DrawingCanvas from '../DrawingCanvas';
import { useInView } from 'react-intersection-observer';

type Props = {
	title: string;
	paragraph: string;
	windowHeight: number;
	lightColour: string;
};

const ProjectsTitleWrapper = styled.section`
	.drawing-canvas {
		position: absolute;
		height: 200vh;
		z-index: 1;
	}
`;

const ProjectsTitleInner = styled.div`
	height: 100vh;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	z-index: 2;
	padding-bottom: ${pxToRem(24)};
`;

const Title = styled.h1`
	grid-column: 3 / -1;
	margin-bottom: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(16)};
	}
`;

const Paragraph = styled.h3`
	grid-column: 3 / 11;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	&.view-element-bottom-top {
		transition-delay: 150ms;
	}
`;

const ProjectsTitle = (props: Props) => {
	const {
		title,
		paragraph,
		windowHeight,
		lightColour
	} = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProjectsTitleWrapper
			ref={ref}
		>
			<LayoutWrapper>
				<ProjectsTitleInner>
					<LayoutGrid>
						{title && (
							<Title
								className={`view-element-bottom-top ${
									inView ? 'view-element-bottom-top--in-view' : ''
								}`}
							>
								{title}
							</Title>
						)}
						{paragraph && (
							<Paragraph
								className={`view-element-bottom-top ${
									inView ? 'view-element-bottom-top--in-view' : ''
								}`}
							>
								{paragraph}
							</Paragraph>
						)}
					</LayoutGrid>
				</ProjectsTitleInner>
			</LayoutWrapper>
			<DrawingCanvas
				windowHeight={windowHeight}
				lightColour={lightColour}
				isProjectsPage={true}
			/>
		</ProjectsTitleWrapper>
	);
};

export default ProjectsTitle;
