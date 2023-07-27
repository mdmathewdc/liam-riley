import styled from 'styled-components';
import siteData from '../../../data.preval';
import LayoutWrapper from '../../common/LayoutWrapper';
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';
import FooterColourGrid from '../../blocks/FooterColourGrid';

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

	const year = new Date().getFullYear();

	return (
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
	)
};

export default Footer;