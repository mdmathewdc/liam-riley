import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Menu from './Menu';

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

	const [menuIsActive, setMenuIsActive] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (menuIsActive) {
			document.documentElement.classList.add('no-scroll');
		} else {
			document.documentElement.classList.remove('no-scroll');
		}
	}, [menuIsActive]);

	useEffect(() => {
		setMenuIsActive(false);
	}, [router.pathname]);

	return (
		<>
			<Header
				menuIsActive={menuIsActive}
				setMenuIsActive={setMenuIsActive}
			/>
			<Menu
				menuIsActive={menuIsActive}
			/>
			<Main>{children}</Main>
			<Footer />
		</>
	);
};

export default Layout;
