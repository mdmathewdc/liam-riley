import styled from 'styled-components';
import client from '../client';
import { useEffect, useState } from 'react';
import PhotographyColorBlock from '../components/elements/PhotographyColorBlock';
import PhotographyText from '../components/blocks/PhotographyText';
import { NextSeo } from 'next-seo';
import { Transitions } from '../shared/types/types';
import { motion } from 'framer-motion';
import PhotographyImages from '../components/blocks/PhotographyImages';
import PhotographyAllImages from '../components/blocks/PhotographyAllImages';

type Props = {
	data: any;
	pageTransitionVariants: Transitions;
};

const PhotographyWrapper = styled(motion.section)`
	display: flex;
	flex-wrap: wrap;
	padding-top: var(--header-h);
	height: calc(100vh - var(--header-h));
	position: fixed;
`;

const Photography = (props: Props) => {
	const {
		data,
		pageTransitionVariants
	} = props;

	const [allBlockColors, setAllBlockColors] = useState<boolean | string>(false);
	const [amountOfBlocks, setAmountOfBlocks] = useState(0);
	const [blockWidth, setBlockWidth] = useState(0);
	const [blockHeight, setBlockHeight] = useState(0);
	const [seeAllImages, setSeeAllImages] = useState(false);

	const handleAllColorsChange = (hex: string) => {
		setAllBlockColors(hex);
	};

	useEffect(() => {
		const calculateRectangleSize = (viewportWidth: number, viewportHeight: number) => {
			const numRectangles = 10;
			const rectangleWidth = Math.floor(viewportWidth / numRectangles);
			const rectangleHeight = Math.floor(viewportHeight / numRectangles);
			return { width: rectangleWidth, height: rectangleHeight };
		};

		// Function to generate the grid of rectangles
		const generateRectangles = () => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const { width: rectangleWidth, height: rectangleHeight } = calculateRectangleSize(
				viewportWidth,
				viewportHeight
			);

			const numRows = Math.ceil(viewportHeight / rectangleHeight);
			const numCols = Math.ceil(viewportWidth / rectangleWidth);

			setAmountOfBlocks(numRows * numCols);
			setBlockWidth(rectangleWidth);
			setBlockHeight(rectangleHeight);
		};

		const handleWindowResize = () => {
			generateRectangles()
		};

		// Initial setup
		generateRectangles()

		// Event listener for window resize
		window.addEventListener('resize', handleWindowResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<PhotographyWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title="Liam Riley | Photography"
				description={data?.seoDescription || ''}
			/>
			<PhotographyAllImages
				images={data?.easterEggImages}
				isActive={seeAllImages}
				setSeeAllImages={setSeeAllImages}
			/>
			<PhotographyText
				isActive={allBlockColors}
				cannotHover={seeAllImages}
				text={data?.easterEggText}
				images={data?.easterEggImages}
				backgroundColour={allBlockColors}
				setSeeAllImages={setSeeAllImages}
				
			/>
			{[...Array(amountOfBlocks)].map((_, i) => (
				<PhotographyColorBlock
					key={i}
					width={blockWidth}
					height={blockHeight}
					colors={data?.easterEggColors}
					handleColorClick={(hex) => handleAllColorsChange(hex)}
					allBlockColors={allBlockColors}
				/>
			))}
		</PhotographyWrapper>
	);
};

export async function getStaticProps() {
	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			easterEggText,
			easterEggColors,
			easterEggImages[] {
				asset->
			},
			seoDescription
		}
	`;

	const data = await client.fetch(siteSettingsQuery);

	return {
		props: {
			data,
		},
	};
}

export default Photography;
