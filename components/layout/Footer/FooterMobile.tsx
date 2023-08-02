import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	phone: string;
	email: string;
	instagramUrl: string;
	vimeoUrl: string;
	linkedInUrl: string;
	footerCta: string;
	year: number;
};

const FooterMobileWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const FooterLinksWrapper = styled.div`
	margin-bottom: ${pxToRem(36)};
`;

const FooterBottomCell = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:not(:last-child) {
		margin-bottom: ${pxToRem(24)};
	}
`;

const Title = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const MenuLink = styled.a`
	text-decoration: none;
`;

const FooterCreditsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${pxToRem(16)};
`;

const FooterCell = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Text = styled.p``;

const FooterMobile = (props: Props) => {
	const {
		phone,
		email,
		instagramUrl,
		vimeoUrl,
		linkedInUrl,
		year
	} = props;

	return (
		<FooterMobileWrapper>
			<FooterLinksWrapper>
				<FooterBottomCell>
					<Title className="type-small">
						Navigation
					</Title>
					<Link href="/" passHref>
						<MenuLink className="type-h3">
							Home
						</MenuLink>
					</Link>
					<Link href="/projects" passHref>
						<MenuLink className="type-h3">
							Projects
						</MenuLink>
					</Link>
				</FooterBottomCell>
				<FooterBottomCell>
					<Title className="type-small">
						Contact
					</Title>
					{email && (
						<Link href={`mailto:${email}`} passHref>
							<MenuLink className="type-h3">
								{email}
							</MenuLink>
						</Link>
					)}
					{phone && (
						<Link href={`tel:${phone}`} passHref>
							<MenuLink className="type-h3">
								{phone}
							</MenuLink>
						</Link>
					)}
				</FooterBottomCell>
				<FooterBottomCell>
					<Title className="type-small">
						Follow
					</Title>
					{instagramUrl && (
						<Link href={instagramUrl} passHref>
							<MenuLink
								className="type-h3"
								target="_blank"
							>
								Instagram
							</MenuLink>
						</Link>
					)}
					{vimeoUrl && (
						<Link href={vimeoUrl} passHref>
							<MenuLink
								className="type-h3"
								target="_blank"
							>
								Vimeo
							</MenuLink>
						</Link>
					)}
					{linkedInUrl && (
						<Link href={linkedInUrl} passHref>
							<MenuLink
								className="type-h3"
								target="_blank"
							>
								LinkedIn
							</MenuLink>
						</Link>
					)}
				</FooterBottomCell>
			</FooterLinksWrapper>
			<FooterCreditsWrapper>
				<FooterCell>
					<Text className="type-small">
						© Liam Riley Edits {year}
					</Text>
					<Text className="type-small">
						All Rights Reserved
					</Text>
				</FooterCell>
				<FooterCell>
					<Text className="type-small">
						Built by
					</Text>
					<Link href="https://tayte.co/" passHref>
						<MenuLink
							className="type-small"
							target="_blank"
						>
							tayte.co
						</MenuLink>
					</Link>
				</FooterCell>
			</FooterCreditsWrapper>
		</FooterMobileWrapper>
	);
};

export default FooterMobile;
