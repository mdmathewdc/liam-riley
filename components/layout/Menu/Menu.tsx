import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import siteData from '../../../data.preval';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';
import FooterColourGrid from '../../blocks/FooterColourGrid';

type Props = {
	menuIsActive: boolean;
}

const MenuWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 90;
	height: 100vh;
	height: 100dvh;
	width: 100%;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(5px);
	padding-top: var(--header-h);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.footer-colour-grid,
	.layout-wrapper {
		width: 100%;
	}
`;

const MenuInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	height: 50vh;
	padding: ${pxToRem(24)} 0;
`;

const MenuLinks = styled.div`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const MenuLink = styled.a`
	text-decoration: none;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const Menu = (props: Props) => {
	const {
		menuIsActive,
	} = props;

	const {
		phone,
		email,
		instagramUrl,
		vimeoUrl,
		easterEggColors
	} = siteData;

	return (
		<>
			<AnimatePresence>
				{menuIsActive && (
					<MenuWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<LayoutWrapper>
							<MenuInner>
								<MenuLinks>
									<Link href="/" passHref>
										<MenuLink className="type-h1">Home</MenuLink>
									</Link>
									<Link href="/projects" passHref>
										<MenuLink className="type-h1">Projects</MenuLink>
									</Link>
								</MenuLinks>
								<MenuLinks>
									{instagramUrl && (
										<Link href={instagramUrl} passHref>
											<MenuLink
												className="type-h1"
												target="_blank"
											>
												Instagram
											</MenuLink>
										</Link>
									)}
									{vimeoUrl && (
										<Link href={vimeoUrl} passHref>
											<MenuLink
												className="type-h1"
												target="_blank"
											>
												Vimeo
											</MenuLink>
										</Link>
									)}
								</MenuLinks>
								<MenuLinks>
									{email && (
										<Link href={`mailto:${email}`} passHref>
											<MenuLink className="type-h3">
												{email}
											</MenuLink>
										</Link>
									)}
									{phone && (
										<Link href="/projects" passHref>
											<MenuLink className="type-h3">
												{phone}
											</MenuLink>
										</Link>
									)}
								</MenuLinks>
							</MenuInner>
						</LayoutWrapper>
						<FooterColourGrid colors={easterEggColors} />
					</MenuWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default Menu;
