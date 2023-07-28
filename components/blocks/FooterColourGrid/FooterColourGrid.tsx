import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';
import LayoutGrid from '../../common/LayoutGrid';
import Link from 'next/link';
import FooterColorBlock from '../../elements/FooterColorBlock';

type Props = {
	colors: [
		ColorType
	]
};

const FooterColourGridWrapper = styled.a`
	display: flex;

	.layout-grid {
		grid-column-gap: 0;
		width: 100%;
	}
`;

const FooterColourGrid = (props: Props) => {
	const {
		colors
	} = props;

	const hasColors = colors.length > 0;
	const firstTwelveColors = colors.slice(0, 12);

	return (
		<>
			{hasColors && (
				<Link href="/photography" passHref>
					<FooterColourGridWrapper className="footer-colour-grid">
						<LayoutGrid>
							{firstTwelveColors.map((item, i) => (
								<FooterColorBlock
									color={item.hex}
									colors={colors}
									key={i}
								/>
							))}
						</LayoutGrid>
					</FooterColourGridWrapper>
				</Link>
			)}
		</>
	);
};

export default FooterColourGrid;
