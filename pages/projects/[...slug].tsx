import styled from 'styled-components';
import client from '../../client';
import { ProjectsType, SiteSettingsType, Transitions } from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import ProjectPlayer from '../../components/blocks/ProjectPlayer';
import ProjectContent from '../../components/blocks/ProjectContent';
import { motion } from 'framer-motion';

type Props = {
	data: ProjectsType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: Transitions;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
	const {
		data,
		siteSettings,
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
		}
	`;

	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			seoDescription,
		}
	`;

	const data = await client.fetch(projectsQuery);
	const siteSettings = await client.fetch(siteSettingsQuery);

	return {
		props: {
			data,
			siteSettings
		},
	};
}

export default Page;
