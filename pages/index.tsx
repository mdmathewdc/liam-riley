import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { ProjectsType, SiteSettingsType } from '../shared/types/types';
import Acknowledgement from '../components/blocks/Acknowledgement';
import HomeProfile from '../components/blocks/HomeProfile';
import DesktopFeaturedProjects from '../components/blocks/DesktopFeaturedProjects';
import DrawingCanvas from '../components/blocks/DrawingCanvas';

const PageWrapper = styled.div``;

type Props = {
	data: SiteSettingsType;
	hasVisited: boolean;
	lightColour: string;
	featuredProjects: ProjectsType[]
};

const Page = (props: Props) => {
	const {
		data,
		hasVisited,
		lightColour,
		featuredProjects
	} = props;

	// console.log('data', data);
	// console.log('featuredProjects', featuredProjects);

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
		{/* <DrawingCanvas /> */}
		<DesktopFeaturedProjects
			data={featuredProjects}
		/>
	</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			...,
			profileVid{asset->},
			showreelVid{asset->}
		}
	`;
	const featuredProjectsQuery = `
		*[_type == 'siteSettings'][0] {
			"featuredProjects": *[_type == "projects"] {
				_id,
				title,
				slug,
				client,
				snippetVideo{asset->}
			}
		}
  	`;

	const data = await client.fetch(siteSettingsQuery);
	const featuredProjects = await client.fetch(featuredProjectsQuery);

	return {
		props: {
			data,
			featuredProjects: featuredProjects.featuredProjects
		},
	};
}

export default Page;
