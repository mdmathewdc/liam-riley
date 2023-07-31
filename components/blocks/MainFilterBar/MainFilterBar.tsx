import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MainFilterCard from './MainFilterCard';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	categories: {
		[key: string]: number;
	}
	allProjectsCount: number;
};

const MainFilterBarWrapper = styled.div`
	padding: ${pxToRem(64)} 0;
	position: relative;
	z-index: 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MainFilterBarInner = styled.div`
	grid-column: 3 / -1;
	display: flex;
	column-gap: ${pxToRem(24)};
`;

const MainFilterBar = (props: Props) => {
	const {
		categories,
		allProjectsCount
	} = props;

	console.log('categories', categories);
	

	return (
		<MainFilterBarWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<MainFilterBarInner>
						<MainFilterCard
							title="All"
							count={allProjectsCount}
						/>
						<MainFilterCard
							title="Commercial"
							count={categories['commercial']}
						/>
						<MainFilterCard
							title="Music Video"
							count={categories['music-video']}
						/>
						<MainFilterCard
							title="Narrative"
							count={categories['narrative']}
						/>
					</MainFilterBarInner>
				</LayoutGrid>
			</LayoutWrapper>
		</MainFilterBarWrapper>
	);
};

export default MainFilterBar;
