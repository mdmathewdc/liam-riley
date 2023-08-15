import styled from 'styled-components';
import ReactPlayer from 'react-player'
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
};

const ProjectPlayerOuterWrapper = styled.div`
	padding-top: var(--header-h);
	margin-bottom: ${pxToRem(32)};
`;

const ProjectPlayerWrapper = styled.section`
	width: 100%;
	padding-top: 56.25%;
	position: relative;
	background: var(--colour-light);
`;

const ProjectPlayerInner = styled.div`
	position: absolute;
	inset: 0;
`;

const ProjectPlayer = (props: Props) => {
	const {
		data
	} = props;

	return (
		<ProjectPlayerOuterWrapper>
			<LayoutWrapper>
				{data && (
					<ProjectPlayerWrapper>
						<ProjectPlayerInner>
							<ReactPlayer
								width="100%"
								height="100%"
								url={data}
								playsInline
								controls={true}
							/>
						</ProjectPlayerInner>
					</ProjectPlayerWrapper>
				)}
			</LayoutWrapper>
		</ProjectPlayerOuterWrapper>
	);
};

export default ProjectPlayer;
