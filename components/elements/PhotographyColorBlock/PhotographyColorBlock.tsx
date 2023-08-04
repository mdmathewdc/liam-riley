import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';
import { useEffect, useState } from 'react';
import randomIntFromInterval from '../../../utils/randomIntFromInterval';

type StyledProps = {
	$transitionDelay: number;
}

type Props = {
	height: number;
	width: number;
	colors: ColorType[];
	handleColorClick: (hex: string) => void;
	allBlockColors: boolean | string;
};

const PhotographyColorBlockWrapper = styled.button<StyledProps>`
	display: inline-block;

	transition: background-color 0ms var(--transition-ease);
	transition-delay: ${(props) => props.$transitionDelay}ms;
`;

const PhotographyColorBlock = (props: Props) => {
	const {
		height,
		width,
		colors,
		handleColorClick,
		allBlockColors
	} = props;

	const [bgHex, setBgHex] = useState("#FFFFFF");

	const handleHover = () => {
		if (allBlockColors) return;
		const randomNum = Math.floor(Math.random() * colors.length);
		setBgHex(colors[randomNum].hex);
	};

	useEffect(() => {
		if (!allBlockColors) {
			const randomNum = Math.floor(Math.random() * colors.length);
			setBgHex(colors[randomNum].hex);
		} else {
			setBgHex(allBlockColors);
		}
	}, [allBlockColors]);

	return (
		<PhotographyColorBlockWrapper
			style={{
				backgroundColor: bgHex,
				height: `${height}px`,
				width: `${width}px`
			}}
			$transitionDelay={allBlockColors ? randomIntFromInterval(0, 1000) : 0}
			onMouseOver={() => handleHover()}
			onClick={() => handleColorClick(bgHex)}
		/>
	);
};

export default PhotographyColorBlock;
