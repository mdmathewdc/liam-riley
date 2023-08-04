import styled from 'styled-components';
import siteData from '../../../data.preval';
import LayoutWrapper from '../../common/LayoutWrapper';
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';
import FooterColourGrid from '../../blocks/FooterColourGrid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FooterWrapper = styled.footer`
	.footer-navigation {
		@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
			display: none;
		}
	}
`;

const Footer = () => {
	const {
		phone,
		email,
		instagramUrl,
		vimeoUrl,
		linkedInUrl,
		footerCta,
		easterEggColors
	} = siteData;

	const [isActive, setIsActive] = useState(true);

	const year = new Date().getFullYear();

	const router = useRouter();

	useEffect(() => {
		if (router.pathname === '/photography')  {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [router.pathname]);

	return (
		<>
			{isActive && (
				<FooterWrapper>
					<LayoutWrapper>
						<FooterDesktop
							phone={phone}
							email={email}
							instagramUrl={instagramUrl}
							vimeoUrl={vimeoUrl}
							linkedInUrl={linkedInUrl}
							footerCta={footerCta}
							year={year}
						/>
						<FooterMobile
							phone={phone}
							email={email}
							instagramUrl={instagramUrl}
							vimeoUrl={vimeoUrl}
							linkedInUrl={linkedInUrl}
							footerCta={footerCta}
							year={year}
						/>
					</LayoutWrapper>
					<FooterColourGrid colors={easterEggColors} />
				</FooterWrapper>
			)}
		</>
	)
};

export default Footer;