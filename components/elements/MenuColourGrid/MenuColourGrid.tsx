import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';
import Link from 'next/link';
import MenuColorBlock from './MenuColorBlock';
import { useEffect, useState } from 'react';

type Props = {
	colors: [
		ColorType
	]
};

const MenuColourGridWrapper = styled.a`
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

const MenuColourGrid = (props: Props) => {
	const {
		colors
	} = props;
	
	const hasColors = colors.length > 0;
	const firstNineColors = colors.slice(0, 9);

	const [nineColors, setNineColors] = useState(firstNineColors);

	const handleNewRandomNineColors = () => {
		const newNineColors = colors.slice(0, 9);

		for (let i = newNineColors.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newNineColors[i], newNineColors[j]] = [newNineColors[j], newNineColors[i]];
		}

		setNineColors(newNineColors);
	};

	return (
		<>
			{hasColors && (
				<Link href="/photography" passHref>
					<MenuColourGridWrapper
						className="menu-colour-grid"
						onMouseOver={() => handleNewRandomNineColors()}
					>
						<Inner>
							{nineColors.map((item, i) => (
								<MenuColorBlock
									color={item.hex}
									colors={colors}
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
