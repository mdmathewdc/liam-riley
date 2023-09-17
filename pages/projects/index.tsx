import styled from 'styled-components';
import client from '../../client';
import { useRouter } from 'next/router';
import { ProjectsType, SiteSettingsType, Transitions } from '../../shared/types/types';
import ProjectsTitle from '../../components/blocks/ProjectsTitle';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import MainFilterBar from '../../components/blocks/MainFilterBar';
import ProjectsList from '../../components/blocks/ProjectsList';
import { motion } from 'framer-motion';

const PageWrapper = styled(motion.div)``;

type Props = {
	siteSettings: SiteSettingsType;
	projects: ProjectsType[];
	lightColour: string;
	categories: {
		[key: string]: number;
	};
	initialLastProjectId: string;
	allProjectsCount: number;
	cursorRefresh: () => void;
	pageTransitionVariants: Transitions;
};

const Page = (props: Props) => {
	const {
		projects,
		siteSettings,
		lightColour,
		categories,
		initialLastProjectId,
		allProjectsCount,
		cursorRefresh,
		pageTransitionVariants
	} = props;

	const router = useRouter();
	const [windowHeight, setWindowHeight] = useState(0);
	const [lastProjectId, setlastProjectId] = useState(initialLastProjectId);
	const [paginatedProjects, setPaginatedProjects] = useState(projects);
	const [noMoreProjectsToFetch, setNoMoreProjectsToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [activeFilters, setActiveFilters] = useState(['narrative', 'commercial', 'music-video']);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const handleSetWindowHeight = (height: number) => {
		setWindowHeight(height);
	};

	const handleLoadMore = async () => {
		setIsLoading(true);

		if (lastProjectId === null) {
			return []
		}

		const categoriesFilter = activeFilters.map((category) => `'${category}'`).join(',');

		const projectsQuery = `
			*[_type == 'projects' && category in [${categoriesFilter}]] | order(orderRank) [${paginatedProjects.length}...${paginatedProjects.length + 5}] {
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

		setPaginatedProjects([...paginatedProjects, ...results.slice(0, 4)]);
		setlastProjectId(newLastId);
		setNoMoreProjectsToFetch(results.length <= 4);
		setIsLoading(false);
		cursorRefresh();
	};

	const handleFilter = async () => {
		setIsLoading(true);
		setPaginatedProjects([]);
		setlastProjectId(initialLastProjectId);

		const categoriesFilter = activeFilters.map((category) => `'${category}'`).join(',');

		const projectsQuery = `
			*[_type == 'projects' && category in [${categoriesFilter}]] | order(orderRank) [0...6] {
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

		setPaginatedProjects(results.slice(0, 4));
		setlastProjectId(newLastId);
		setNoMoreProjectsToFetch(results.length <= 4);
		setIsLoading(false);
		cursorRefresh();
	};

	useEffect(() => {
		if (isFirstRender) return;
		handleFilter();

		const timer = setTimeout(() => {
			cursorRefresh();
		}, 500);

		return () => {
			clearTimeout(timer);
		}
	}, [activeFilters]);

	useEffect(() => {
		handleSetWindowHeight(window.innerHeight);

		window.addEventListener('resize', () => {
			handleSetWindowHeight(window.innerHeight);
		});

		const timer = setTimeout(() => {
			setIsFirstRender(false);
		}, 1000);

		window.scrollTo(0, 0);
	
		return () => {
			window.removeEventListener('resize', () => {
				handleSetWindowHeight(window.innerHeight);
			});
			clearTimeout(timer);
		}
	}, []);

	useEffect(() => {
        if (router.asPath === '/projects') {
            const savedScrollPosition = sessionStorage.getItem('scrollPosition');
            if (savedScrollPosition) {
                window.scrollTo(0, parseInt(savedScrollPosition, 10));
                sessionStorage.removeItem('scrollPosition');
            }
        }
    }, [router.asPath]);

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title="Liam Riley | Projects"
				description={siteSettings?.seoDescription || ''}
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
				handleFilterClick={(categories) => setActiveFilters(categories)}
				activeFilters={activeFilters}
			/>
			<ProjectsList
				projects={paginatedProjects}
				handleLoadMore={() => handleLoadMore()}
				noMoreProjectsToFetch={noMoreProjectsToFetch}
				isLoading={isLoading}
				cursorRefresh={cursorRefresh}
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
		*[_type == 'projects'] | order(orderRank) [0...6] {
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
