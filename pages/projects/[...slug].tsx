import styled from 'styled-components';
import client from '../../client';
import { ProjectsType, SiteSettingsType, Transitions } from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import ProjectPlayer from '../../components/blocks/ProjectPlayer';
import ProjectContent from '../../components/blocks/ProjectContent';
import { motion } from 'framer-motion';
import DesktopFeaturedProjects from '../../components/blocks/DesktopFeaturedProjects';

type Props = {
	data: ProjectsType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: Transitions;
	relatedProjects: ProjectsType[];
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
	const {
		data,
		siteSettings,
		pageTransitionVariants,
		relatedProjects
	} = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={`Liam Riley | ${data?.title}`}
				description={siteSettings?.seoDescription || ''}
			/>
			<ProjectPlayer
				data={data?.vimeoUrl}
			/>
			<ProjectContent
				title={data?.title}
				client={data?.client}
				year={data?.year}
				category={data?.category}
				credits={data?.credits}
			/>
			<DesktopFeaturedProjects
				data={relatedProjects}
				isRelatedProjects
			/>
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const allProjectsQuery = `
		*[_type == 'projects'] [0...100] {
			slug
		}
	`;

	const allProjects = await client.fetch(allProjectsQuery);

	return {
		paths: allProjects.map((item: any) => {
			return `/projects/${item?.slug}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const projectsQuery = `
		*[_type == 'projects' && slug.current == "${params.slug[0]}"][0] {
			_id,
			...,
		}
	`;

	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			seoDescription,
		}
	`;

	const relatedProjectsQuery = `
		*[_type == "projects"] [0...100] {
			_id,
			title,
			slug,
			client,
			gallery[] {
				...,
				_type == "snippetVideo" => {
					asset->
				},
			}
		}
	`

	const data = await client.fetch(projectsQuery);
	const siteSettings = await client.fetch(siteSettingsQuery);
	let relatedProjects = await client.fetch(relatedProjectsQuery);

	// Shuffle the projects array randomly
	let shuffledRelatedProjects = relatedProjects.sort(() => Math.random() - 0.5);

	// remove current project from the array by the _id
	shuffledRelatedProjects.splice(shuffledRelatedProjects.findIndex((item: any) => item._id === data._id), 1);

	// Select the first 10 shuffled projects
	relatedProjects = shuffledRelatedProjects.slice(0, 10);

	return {
		props: {
			data,
			siteSettings,
			relatedProjects
		},
	};
}

export default Page;
