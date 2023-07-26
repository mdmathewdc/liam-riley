import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import Acknowledgement from '../blocks/Acknowledgement';

const Main = styled.main``;

type Props = {
	children: ReactNode;
	hasVisited: boolean;
};

const Layout = (props: Props) => {
	const {
		children,
		hasVisited
	} = props;

	return (
		<>
			<Header />
			<Main hasVisited={hasVisited}>{children}</Main>
			<Footer />
		</>
	);
};

export default Layout;
