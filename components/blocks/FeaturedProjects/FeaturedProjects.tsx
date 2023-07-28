import styled from 'styled-components';
import { ProjectsType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import FeaturedProjectCard from '../../elements/FeaturedProjectCard';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useState } from 'react';

type StyledProps = {
	$isActive: boolean | string;
}

type Props = {
	data: ProjectsType[];
}

const FeaturedProjectsWrapper = styled.div<StyledProps>`
	position: relative;
	z-index: 5;
	margin-bottom: ${pxToRem(360)};

	.layout-grid {
		align-items: baseline;
	}

	.featured-project-card__inner {
		opacity: ${(props) => props.$isActive ? 0.3 : 1};
	}
`;

const Title = styled.h1`
	grid-column: 3 / -1;
	margin-bottom: ${pxToRem(32)};
	position: relative;
	z-index: 1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const FeaturedProjectsList = styled.div`
	position: relative;
	z-index: 3;
`;

const FeaturedProjects = ({ data }: Props) => {
	const [allTitleWidths, setAllTitleWidths] = useState<number[]>([]);
	const [fontSize, setFontSize] = useState("5.375rem");
	const [lineHeight, setLineHeight] = useState("1");
	const [windowWidth, setWindowWidth] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const hasData = data && data.length > 0;

	const handleTitleWidth = (width: number) => {
		setAllTitleWidths([...allTitleWidths, width]);
	};

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	  
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		let largestTitleWidth = 0;

		allTitleWidths.forEach(titleWidth => {
			if (titleWidth > largestTitleWidth) {
				largestTitleWidth = titleWidth;
			}
		});

		const fontSize = windowWidth / (largestTitleWidth * 0.22);
		const lineHeight = Math.round((windowWidth / (largestTitleWidth * 1.5)) * 10) / 10;

		setFontSize(`${fontSize}rem`);
		setLineHeight(`${lineHeight}`);
	}, [allTitleWidths, windowWidth]);

	return (
		<FeaturedProjectsWrapper $isActive={isHovered}>
			<LayoutWrapper>
				<LayoutGrid>
					<Title className="type-p">
						Featured Projects
					</Title>
				</LayoutGrid>
				{hasData && (
					<FeaturedProjectsList>
						{data.map((item, i) => (
							<FeaturedProjectCard
								data={item}
								key={i}
								index={i}
								handleTitleWidth={
									(width) => handleTitleWidth(width)
								}
								fontSize={fontSize}
								lineHeight={lineHeight}
								setIsHovered={setIsHovered}
							/>
						))}
					</FeaturedProjectsList>
				)}
			</LayoutWrapper>
		</FeaturedProjectsWrapper>
	);
};

export default FeaturedProjects;
