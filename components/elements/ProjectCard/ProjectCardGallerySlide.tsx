import styled from 'styled-components';
import MuxPlayer from "@mux/mux-player-react"; 
import { useEffect, useRef, useState } from 'react';

type Props = {
	data: string;
};

const MuxWrapper = styled.div``;

const ProjectCardGallerySlide = ({ data }: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	const videoRef = useRef<any>(null);

	return (
		<MuxWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			{data && (
				<MuxPlayer
					streamType="on-demand"
					playbackId={data}
					autoPlay={isHovered}
					loop={true}
					thumbnailTime={0}
					ref={videoRef}
					style={{ aspectRatio: 16/9 }}
				/>
			)}
		</MuxWrapper>
	);
};

export default ProjectCardGallerySlide;
