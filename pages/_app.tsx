import { useEffect, useState } from 'react';
import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { Transitions } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';

const pageTransitionVariants: Transitions = {
	hidden: { opacity: 0, transition: { duration: 0.3 } },
	visible: { opacity: 1, transition: { duration: 0.3, delay: 0.25 } },
};

type Props = {
	Component: any;
	pageProps: {};
};

const App = (props: Props) => {
	const {
		Component,
		pageProps
	} = props;

	const [hasVisited, setHasVisited] = useState<boolean>(false);
	const [lightColour, setLightColour] = useState("#FFF");

	const router= useRouter();
	const routerEvents = router.events;

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

	useEffect(() => {
		const hasCookies = Cookies.get('visited');

		if (hasCookies) {
			setHasVisited(true);
		}

		const random = Math.floor(Math.random() * 3);
		const lightColors = [
			'#DCE6E8',
			'#FAF1DC',
			'#EEF2E8'
		];
		const darkColors = [
			'#2B2E2E',
			'#2E2D29',
			'#2E2E2C'
		];

		// set the variable to the root html element
		const root = document.documentElement;

		const lightColour = lightColors[random];
		const darkColour = darkColors[random];

		// set the property values
		root.style.setProperty('--colour-light', lightColour);
		root.style.setProperty('--colour-dark', darkColour);

		setLightColour(lightColour);

		const timer = setTimeout(() => {
			Cookies.set('visited', 'true', { expires: 1, path: '' });
		}, 5000);

		return () => {
			clearTimeout(timer);
		}
	}, []);

	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Layout hasVisited={hasVisited}>
					<AnimatePresence
						mode="wait"
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							key={router.asPath}
							pageTransitionVariants={pageTransitionVariants}
							hasVisited={hasVisited}
							lightColour={lightColour}
						/>
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default App;
