import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';
import Link from 'next/link';

type Props = {
	colors: [
		ColorType
	]
};

const MenuColourGridWrapper = styled.div`
	grid-column: span 2;
	text-align: right;
	display: flex;
	justify-content: flex-end;
	align-self: center;
`;

const Inner = styled.div`
	height: 24px;
	width: 24px;
	display: flex;
	flex-wrap: wrap;
`;

const ColorBlock = styled.div`
	height: 8px;
	width: 8px;
	background: ${(props) => props.color};
`;

const MenuColourGrid = (props: Props) => {
	const {
		colors
	} = props;

	const hasColors = colors.length > 0;
	const firstNineColors = colors.slice(0, 9);

	return (
		<>
			{hasColors && (
				<Link href="/photography" passHref>
					<MenuColourGridWrapper className="menu-colour-grid">
						<Inner>
							{firstNineColors.map((item, i) => (
								<ColorBlock
									color={item.hex}
									key={i}
								/>
							))}
						</Inner>
					</MenuColourGridWrapper>
				</Link>
			)}
		</>
	);
};

export default MenuColourGrid;
