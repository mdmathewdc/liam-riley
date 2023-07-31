import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import LayoutGrid from '../../common/LayoutGrid';
import DrawingCanvas from '../DrawingCanvas';

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
	height: calc(100vh - var(--header-h));
	height: calc(100dvh - var(--header-h));
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	z-index: 2;
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
`;

const ProjectsTitle = (props: Props) => {
	const {
		title,
		paragraph,
		windowHeight,
		lightColour
	} = props;

	return (
		<ProjectsTitleWrapper>
			<LayoutWrapper>
				<ProjectsTitleInner>
					<LayoutGrid>
						{title && (
							<Title>{title}</Title>
						)}
						{paragraph && (
							<Paragraph>{paragraph}</Paragraph>
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
