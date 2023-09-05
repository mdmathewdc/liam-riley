import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import ImageGalleryCard from './ImageGalleryCard';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: MediaType[];
};

const ProjectImageGalleryWrapper = styled.section`
	margin-bottom: ${pxToRem(240)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(120)};
	}
`;

const ProjectImageGallery = ({ data }: Props) => {
	const hasData = data && data.length > 0;

	return (
		<ProjectImageGalleryWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					{hasData && data.map((item, i) => (
						<ImageGalleryCard
							data={item}
							key={i}
						/>
					))}
				</LayoutGrid>
			</LayoutWrapper>
		</ProjectImageGalleryWrapper>
	);
};

export default ProjectImageGallery;
