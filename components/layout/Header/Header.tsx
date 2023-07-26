import styled from 'styled-components';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
`;

const Header = () => {
	return (
		<HeaderWrapper className="header">
			Header
		</HeaderWrapper>
	)
};

export default Header;
