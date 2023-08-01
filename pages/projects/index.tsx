import styled from 'styled-components';
import client from '../../client';
import { ProjectsType, SiteSettingsType } from '../../shared/types/types';
import ProjectsTitle from '../../components/blocks/ProjectsTitle';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import MainFilterBar from '../../components/blocks/MainFilterBar';
import ProjectsList from '../../components/blocks/ProjectsList';

const PageWrapper = styled.div``;

type Props = {
	siteSettings: SiteSettingsType;
	projects: ProjectsType[];
	lightColour: string;
	categories: {
		[key: string]: number;
	};
	initialLastProjectId: string;
	allProjectsCount: number;
};

const Page = (props: Props) => {
	const {
		projects,
		siteSettings,
		lightColour,
		categories,
		initialLastProjectId,
		allProjectsCount
	} = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [lastProjectId, setlastProjectId] = useState(initialLastProjectId);
	const [paginatedProjects, setPaginatedProjects] = useState(projects);
	const [noMoreProjectsToFetch, setNoMoreProjectsToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

	const handleLoadMore = async () => {
		setIsLoading(true);

		if (lastProjectId === null) {
			return []
		}

		const projectsQuery = `
			*[_type == 'projects'] | order(orderRank) [${paginatedProjects.length}...${paginatedProjects.length + 4}] {
				...,
				gallery[] {
					...,
					_type == "snippetVideo" => {
						asset->
					},
				}
			}
		`;

		const results = await client.fetch(projectsQuery);
		let newLastId = '';

		if (results.length > 0) {
			newLastId = results[results.length - 1]._id
		}

		setPaginatedProjects([...paginatedProjects, ...results]);
		setlastProjectId(newLastId);
		setNoMoreProjectsToFetch(results.length < 4);
		setIsLoading(false);
	};

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
				allProjectsCount={allProjectsCount}
			/>
			<ProjectsList
				projects={paginatedProjects}
				handleLoadMore={() => handleLoadMore()}
				noMoreProjectsToFetch={noMoreProjectsToFetch}
				isLoading={isLoading}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const allProjectsQuery = `
		*[_type == 'projects'] | order(orderRank) [0...100] {
			category
		}
	`;

	const projectsQuery = `
		*[_type == 'projects'] | order(orderRank) [0...4] {
			...,
			gallery[] {
				...,
				_type == "snippetVideo" => {
					asset->
				},
			}
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
	const allProjects = await client.fetch(allProjectsQuery);

	const categories = allProjects.map((project: ProjectsType) => project.category);
	const categoryCount = categories.reduce((acc: any, curr: any) => {
		if (typeof acc[curr] == 'undefined') {
			acc[curr] = 1;
		} else {
			acc[curr] += 1;
		}
		return acc;
	}, {});
	const allProjectsCount = allProjects.length;

	const lastProjectId = projects[projects.length - 1]._id;

	return {
		props: {
			projects,
			siteSettings,
			categories: categoryCount,
			initialLastProjectId: lastProjectId,
			allProjectsCount
		},
	};
}

export default Page;
