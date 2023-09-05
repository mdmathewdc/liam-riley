import styled from 'styled-components';
import client from '../../client';
import { ProjectsType, SiteSettingsType, Transitions } from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import ProjectPlayer from '../../components/blocks/ProjectPlayer';
import ProjectContent from '../../components/blocks/ProjectContent';
import { motion } from 'framer-motion';
import DesktopFeaturedProjects from '../../components/blocks/DesktopFeaturedProjects';
import { useEffect } from 'react';
import ProjectImageGallery from '../../components/blocks/ProjectImageGallery';

type Props = {
	data: ProjectsType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: Transitions;
	featuredProjects: ProjectsType[];
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
	const {
		data,
		siteSettings,
		pageTransitionVariants,
		// featuredProjects
	} = props;

	useEffect(() => {
		const title = data?.title;
		const projectsVisited = JSON.parse(localStorage.getItem('projects-visited') || '[]');
		projectsVisited.push(title);
		localStorage.setItem('projects-visited', JSON.stringify(projectsVisited));
	}, []);

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
			<ProjectImageGallery
				data={data?.imageGallery}
			/>
			{/* <DesktopFeaturedProjects
				data={featuredProjects}
				isRelatedProjects
			/> */}
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
			...,
			imageGallery[] {
				...,
				_type == "image" => {
					asset->
				},
			},
		}
	`;

	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			seoDescription,
		}
	`;

	// const featuredProjectsQuery = `
	// 	*[_type == "siteSettings"][0] {
	// 		featuredProjectsNew[]->{
	// 			_id,
	// 			title,
	// 			slug,
	// 			client,
	// 			gallery[] {
	// 				...,
	// 				_type == "snippetVideo" => {
	// 					asset->
	// 				},
	// 			}
	// 		}
	// 	}
	// `;

	const data = await client.fetch(projectsQuery);
	const siteSettings = await client.fetch(siteSettingsQuery);
	// let featuredProjects = await client.fetch(featuredProjectsQuery);

	return {
		props: {
			data,
			siteSettings,
			// featuredProjects: featuredProjects.featuredProjectsNew
		},
	};
}

export default Page;
