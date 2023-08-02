import styled from 'styled-components';
import { ColorType } from '../../../shared/types/types';

type StyledProps = {
	$background: string;
};

type Props = {
	color: string;
	colors: [
		ColorType
	]
}

const MenuColorBlockWrapper = styled.div<StyledProps>`
	height: 8px;
	width: 8px;
	background: ${(props) => props.$background};
`;

const MenuColorBlock = (props: Props) => {
	const {
		color,
	} = props;

	return (
		<MenuColorBlockWrapper
			$background={color}
		/>
	);
};

export default MenuColorBlock;
