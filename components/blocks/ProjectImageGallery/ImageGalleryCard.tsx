import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	data: any;
}

const ImageGalleryCardWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;
	grid-column: 3 / -3;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

const ImageGalleryCard = ({ data }: Props) => {

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ImageGalleryCardWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			{data?.asset?.url && (
				<Image src={data.asset.url} />
			)}
		</ImageGalleryCardWrapper>
	);
};

export default ImageGalleryCard;
