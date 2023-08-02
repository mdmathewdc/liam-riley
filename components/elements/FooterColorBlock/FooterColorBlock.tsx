import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

type StyledProps = {
	$hex: string;
};

type Props = {
	color: string;
	colors: [
		{
			hex: string;
		}
	]
};

const FooterColorBlockWrapper = styled(motion.div)`
	grid-column: span 1;
	width: 100%;
	padding-top: 100%;
	position: relative;

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const FooterColorBlockInner = styled.div<StyledProps>`
	background: ${(props) => props.$hex};
	position: absolute;
	height: 100%;
	width: 100%;
	inset: 0;
`;

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
};

const FooterColorBlock = (props: Props) => {
	const {
		color,
		colors
	} = props;

	const [hoverColor, setHoverColor] = useState<string>(color);

	const handleHoverColor = () => {
		const randomColor = colors[Math.floor(Math.random() * colors.length)].hex;
		setHoverColor(randomColor);
	};

	return (
		<FooterColorBlockWrapper
			className="footer-color-block"
			onMouseOver={() => handleHoverColor()}
			onMouseOut={() => handleHoverColor()}
			variants={childVariants}
		>
			<FooterColorBlockInner $hex={hoverColor} />
		</FooterColorBlockWrapper>
	);
};

export default FooterColorBlock;
