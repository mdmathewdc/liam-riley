import styled from 'styled-components';
import client from '../../client';
import { ProjectsType, SiteSettingsType } from '../../shared/types/types';
import ProjectsTitle from '../../components/blocks/ProjectsTitle';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import MainFilterBar from '../../components/blocks/MainFilterBar';

const PageWrapper = styled.div``;

type Props = {
	siteSettings: SiteSettingsType;
	projects: ProjectsType[];
	lightColour: string;
	categories: {
		[key: string]: number;
	}
};

const Page = (props: Props) => {
	const {
		projects,
		siteSettings,
		lightColour,
		categories
	} = props;

	const [windowHeight, setWindowHeight] = useState(0);

	const handleSetWindowHeight = (height: number) => {
		setWindowHeight(height);
	};

	useEffect(() => {
		handleSetWindowHeight(window.innerHeight);

		window.addEventListener('resize', () => {
			handleSetWindowHeight(window.innerHeight);
		});
	
		return () => {
			window.removeEventListener('resize', () => {
				handleSetWindowHeight(window.innerHeight);
			});
		}
	}, []);

	console.log('projects', projects);
	console.log('siteSettings', siteSettings);

	return (
		<PageWrapper>
			<NextSeo
				title="Liam Riley | Editor | Projects"
				description={siteSettings.seoDescription || ''}
			/>
			<ProjectsTitle
				title={siteSettings.projectsTitle}
				paragraph={siteSettings.projectsParagraph}
				windowHeight={windowHeight}
				lightColour={lightColour}
			/>
			<MainFilterBar
				categories={categories}
				allProjectsCount={projects.length}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const projectsQuery = `
		*[_type == 'projects'] {
			...,
			snippetVideo{asset->}
		}
	`;

	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			seoDescription,
			projectsTitle,
			projectsParagraph,
		}
	`;

	const projects = await client.fetch(projectsQuery);
	const siteSettings = await client.fetch(siteSettingsQuery);

	// loop through projects and count the amount of projects are in each category
	const categories = projects.map((project: ProjectsType) => project.category);
	const categoryCount = categories.reduce((acc: any, curr: any) => {
		if (typeof acc[curr] == 'undefined') {
			acc[curr] = 1;
		} else {
			acc[curr] += 1;
		}
		return acc;
	}, {});

	return {
		props: {
			projects,
			siteSettings,
			categories: categoryCount
		},
	};
}

export default Page;
