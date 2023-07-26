import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { SiteSettingsType } from '../shared/types/types';
import Acknowledgement from '../components/blocks/Acknowledgement';
import HomeProfile from '../components/blocks/HomeProfile';

const PageWrapper = styled.div``;

type Props = {
	data: SiteSettingsType,
	hasVisited: boolean,
	lightColour: string
};

const Page = (props: Props) => {
	const {
		data,
		hasVisited,
		lightColour
	} = props;

	console.log('data', data);

	return (
	<PageWrapper>
		<NextSeo
			title="Liam Riley | Editor | Home"
			description={data.seoDescription || ''}
		/>
		<Acknowledgement
			hasVisited={hasVisited}
			content={data.aoc}
		/>
		<HomeProfile
			paragraphOne={data.homePageParagraphOne}
			paragraphTwo={data.homePageParagraphTwo}
			paragraphThree={data.homePageParagraphThree}
			title={data.homePageTitle}
			showreelVideo={data.showreelVid}
			profileVideo={data.profileVid}
			lightColour={lightColour}
		/>
	</PageWrapper>
	);
};

export async function getStaticProps() {
	const query = `
		*[_type == 'siteSettings'][0] {
			...,
			profileVid{asset->},
			showreelVid{asset->}
		}
	`;

	const data = await client.fetch(query);

	return {
		props: {
			data: data
		},
	};
}

export default Page;
