import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { ProjectsType, SiteSettingsType, Transitions } from '../shared/types/types';
import Acknowledgement from '../components/blocks/Acknowledgement';
import HomeProfile from '../components/blocks/HomeProfile';
import DesktopFeaturedProjects from '../components/blocks/DesktopFeaturedProjects';
import { motion } from 'framer-motion';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: SiteSettingsType;
	hasVisited: boolean;
	lightColour: string;
	featuredProjects: ProjectsType[];
	pageTransitionVariants: Transitions;
};

const Page = (props: Props) => {
	const {
		data,
		hasVisited,
		lightColour,
		featuredProjects,
		pageTransitionVariants
	} = props;

	return (
	<PageWrapper
		variants={pageTransitionVariants}
		initial="hidden"
		animate="visible"
		exit="hidden"
	>
		<NextSeo
			title="Liam Riley | Editor"
			description={data?.seoDescription || ''}
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
