import { NextSeo } from 'next-seo';
import styled from 'styled-components';

const PageWrapper = styled.div``;

const Page = () => {
	return (
		<PageWrapper>
			<NextSeo
				title="Boiler"
				description="Boiler Plate"
			/>
		</PageWrapper>
	)
}

export default Page;
