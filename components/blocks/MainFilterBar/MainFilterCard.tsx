import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	title: string;
	count: number;
}

const MainFilterCardTrigger = styled.button`
	display: flex;
	align-items: flex-end;
`;

const Title = styled.div`
	margin-right: ${pxToRem(8)};
`;

const Count = styled.div``;

const MainFilterCard = (props: Props) => {
	const {
		title,
		count
	} = props;

	return (
		<MainFilterCardTrigger>
			<Title className="type-h3">{title}</Title>
			<Count>{count}</Count>
		</MainFilterCardTrigger>
	);
};

export default MainFilterCard;
