import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import SecondaryLogo from '../../svgs/SecondaryLogo';
import LayoutGrid from '../../common/LayoutGrid';
import { useInView } from 'react-intersection-observer';

type Props = {
	phone: string;
	email: string;
	instagramUrl: string;
	vimeoUrl: string;
	linkedInUrl: string;
	footerCta: string;
	year: number;
};

const FooterDesktopWrapper = styled.div`
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const FooterCtaWrapper = styled.div`
	position: relative;
`;

const Title = styled.h3`
	margin-bottom: ${pxToRem(24)};
	max-width: ${pxToRem(820)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding-right: 20%;
	}
`;

const LinksWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const MenuLink = styled.a`
	text-decoration: none;

	&:not(:last-child) {
		margin-bottom: ${pxToRem(8)};
	}
`;

const SmallMenuLink = styled.a`
	text-decoration: none;
	line-height: 1.2;
	white-space: pre;

	&:hover {
		text-decoration: underline;
	}
`;

const LogoWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const FooterContent = styled.div``;

const FooterContentInner = styled.div`
	margin-bottom: ${pxToRem(16)};
`;

const FooterCell = styled.div`
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 3;
	}
`;

const CreditFooterCell = styled.div`
	grid-column: span 4;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;
	text-align: right;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 3;
	}
`;

const FooterBottomCell = styled.div`
	display: flex;
`;

const Text = styled.p``;

const FooterDesktop = (props: Props) => {
	const {
		phone,
		email,
		instagramUrl,
		vimeoUrl,
		linkedInUrl,
		footerCta,
		year
	} = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<FooterDesktopWrapper
			ref={ref}
			className={`view-element-bottom-top ${
				inView ? 'view-element-bottom-top--in-view' : ''
			}`}
		>
			<FooterCtaWrapper>
				{footerCta && (
					<Title>{footerCta}</Title>
				)}
				<LinksWrapper>
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
				</LinksWrapper>
				<LogoWrapper>
					<SecondaryLogo />
				</LogoWrapper>
			</FooterCtaWrapper>
			<FooterContent>
				<FooterContentInner>
					<LayoutGrid>
						<FooterCell>
							<Text className="type-small">
								© Liam Riley Edits {year}
							</Text>
							<Text className="type-small">
								All Rights Reserved
							</Text>
						</FooterCell>
						<FooterCell>
							{email && (
								<Link href={`mailto:${email}`} passHref>
									<SmallMenuLink className="type-small">
										{email}
									</SmallMenuLink>
								</Link>
							)}
							{phone && (
								<Link href="/projects" passHref>
									<SmallMenuLink className="type-small">
										{phone}
									</SmallMenuLink>
								</Link>
							)}
						</FooterCell>
						<FooterCell>
							<Text className="type-small">
								Follow
							</Text>
							<FooterBottomCell>
								{instagramUrl && (
									<Link href={instagramUrl} passHref>
										<SmallMenuLink
											className="type-small"
											target="_blank"
										>
											Instagram{", "}
										</SmallMenuLink>
									</Link>
								)}
								{vimeoUrl && (
									<Link href={vimeoUrl} passHref>
										<SmallMenuLink
											className="type-small"
											target="_blank"
										>
											Vimeo{", "}
										</SmallMenuLink>
									</Link>
								)}
								{linkedInUrl && (
									<Link href={linkedInUrl} passHref>
										<SmallMenuLink
											className="type-small"
											target="_blank"
										>
											LinkedIn
										</SmallMenuLink>
									</Link>
								)}
							</FooterBottomCell>
						</FooterCell>
						<FooterCell className="footer-navigation">
							<Text className="type-small">
								Navigation
							</Text>
							<FooterBottomCell>
								<Link href="/" passHref>
									<SmallMenuLink className="type-small">
										Home{", "}
									</SmallMenuLink>
								</Link>
								<Link href="/projects" passHref>
									<SmallMenuLink className="type-small">
										Projects
									</SmallMenuLink>
								</Link>
							</FooterBottomCell>
						</FooterCell>
						<CreditFooterCell>
							<Text className="type-small">
								Built by
							</Text>
							<Link href="https://tayte.co/" passHref>
								<SmallMenuLink
									className="type-small"
									target="_blank"
								>
									tayte.co
								</SmallMenuLink>
							</Link>
						</CreditFooterCell>
					</LayoutGrid>
				</FooterContentInner>
			</FooterContent>
		</FooterDesktopWrapper>
	);
};

export default FooterDesktop;
