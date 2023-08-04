import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import LayoutWrapper from '../components/common/LayoutWrapper';
import Link from 'next/link';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled.div``;

const PageInner = styled.div`
	padding: ${pxToRem(120)} 0 ${pxToRem(160)};
`;

const Title = styled.h3`
	margin-bottom: ${pxToRem(16)};
`;

const LinkTag = styled.a`
	text-decoration: none;
`;

const Page = () => {
	return (
		<PageWrapper>
			<NextSeo
				title="Liam Riley | 404"
			/>
			<LayoutWrapper>
				<PageInner>
					<Title>Sorry, we couldn't find that page</Title>
					<Link href="/" passHref>
						<LinkTag className="type-label">Back Home</LinkTag>
					</Link>
				</PageInner>
			</LayoutWrapper>
		</PageWrapper>
	)
}

export default Page;
