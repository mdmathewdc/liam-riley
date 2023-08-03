import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import Link from 'next/link';
import siteData from '../../../data.preval';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { useRouter } from 'next/router';
import useViewportWidth from '../../../hooks/useViewportWidth';
import MenuColourGrid from '../../elements/MenuColourGrid';
import AnimatedLineWrapper from '../../elements/AnimatedLineWrapper';

type StyledProps = {
	$isActive: boolean;
}

type Props = {
	menuIsActive: boolean;
	setMenuIsActive: (menuIsActive: boolean) => void;
};

const HeaderWrapper = styled.header<StyledProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(5px);
	padding: 1rem 0;
	transform: ${(props) => props.$isActive ? 'translateY(0)' : 'translateY(-100%)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	.menu-colour-grid {
		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			display: none;
		}
	}
`;

const Logo = styled.a`
	text-decoration: none;
	grid-column: span 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 3;
	}
`;

const MenuLinksWrapper = styled.div`
	grid-column: 3 / 11;
	display: flex;
	align-items: flex-start;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MenuLinks = styled.div`
	grid-column: span 1;
	margin-right: ${pxToRem(36)};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const MenuLink = styled.a`
	text-decoration: none;
`;

const MenuTrigger = styled.button`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		grid-column: span 3;
		text-align: right;
	}
`;

const Header = (props: Props) => {
	const {
		menuIsActive,
		setMenuIsActive
	} = props;

	const {
		phone,
		email,
		instagramUrl,
		vimeoUrl,
		easterEggColors
	} = siteData;

	const [isActive, setIsActive] = useState(false);

	const prevScrollPosRef = useRef(0);

	const router = useRouter();

	const viewportWidth = useViewportWidth();

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		const windowHeight = window.innerHeight;

		if (router.pathname === '/' && currentScrollPos < windowHeight * 2) {
			setIsActive(false);
			return;
		}

		const isScrollingDown = currentScrollPos > prevScrollPosRef.current;

		setIsActive(!isScrollingDown);
		prevScrollPosRef.current = currentScrollPos;
	};

	useEffect(() => {
		const currentScrollPos = window.pageYOffset;
		if (router.pathname !== '/' && currentScrollPos === 0) {
			setIsActive(true);
		}

		if (router.pathname === '/' && currentScrollPos === 0) {
			setIsActive(false);
		}
	}, [router.pathname]);

	useEffect(() => {
		if (viewportWidth === 'tabletPortrait' || viewportWidth === 'mobile') {
			setIsActive(true);
			return;
		}

		const throttledHandleScroll = throttle(handleScroll, 50);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, [viewportWidth, router.pathname]);

	return (
		<HeaderWrapper
			className="header performance"
			$isActive={isActive}
		>
			<LayoutWrapper>
				<LayoutGrid>
					<Link href="/" passHref scroll={false}>
						<Logo className="type-label">Liam Riley</Logo>
					</Link>
					<MenuLinksWrapper>
						<MenuLinks>
							<Link href="/" passHref scroll={false}>
								<MenuLink className="type-label animated-line-parent animated-line-parent--tiny">
									Home
									<AnimatedLineWrapper strokeWidth={2} />
								</MenuLink>
							</Link>
							<Link href="/projects" passHref scroll={false}>
								<MenuLink className="type-label animated-line-parent animated-line-parent--tiny">
									Projects
									<AnimatedLineWrapper strokeWidth={2} />
								</MenuLink>
							</Link>
						</MenuLinks>
						<MenuLinks>
							{instagramUrl && (
								<Link href={instagramUrl} passHref scroll={false}>
									<MenuLink
										className="type-label animated-line-parent animated-line-parent--tiny"
										target="_blank"
									>
										Instagram
										<AnimatedLineWrapper strokeWidth={2} />
									</MenuLink>
								</Link>
							)}
							{vimeoUrl && (
								<Link href={vimeoUrl} passHref scroll={false}>
									<MenuLink
										className="type-label animated-line-parent animated-line-parent--tiny"
										target="_blank"
									>
										Vimeo
										<AnimatedLineWrapper strokeWidth={2} />
									</MenuLink>
								</Link>
							)}
						</MenuLinks>
						<MenuLinks>
							{email && (
								<Link href={`mailto:${email}`} passHref scroll={false}>
									<MenuLink className="type-label animated-line-parent animated-line-parent--tiny">
										{email}
										<AnimatedLineWrapper strokeWidth={2} />
									</MenuLink>
								</Link>
							)}
							{phone && (
								<Link href={`tel:${phone}`} passHref scroll={false}>
									<MenuLink className="type-label animated-line-parent animated-line-parent--tiny">
										{phone}
										<AnimatedLineWrapper strokeWidth={2} />
									</MenuLink>
								</Link>
							)}
						</MenuLinks>
					</MenuLinksWrapper>
					<MenuColourGrid colors={easterEggColors} />
					<MenuTrigger
						onClick={() => setMenuIsActive(!menuIsActive)}
						className="type-label"
					>
						{menuIsActive ? 'Close' : 'Menu'}
					</MenuTrigger>
				</LayoutGrid>
			</LayoutWrapper>
		</HeaderWrapper>
	)
};

export default Header;
