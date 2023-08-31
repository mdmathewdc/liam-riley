import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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

	const router = useRouter();

	useEffect(() => {
        if (router.asPath === '/') {
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
		*[_type == "siteSettings"][0] {
			featuredProjectsNew[]->{
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
		}
	`;

	const data = await client.fetch(siteSettingsQuery);
	const featuredProjects = await client.fetch(featuredProjectsQuery);

	return {
		props: {
			data,
			featuredProjects: featuredProjects.featuredProjectsNew
		},
	};
}

export default Page;
