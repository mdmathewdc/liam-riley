import styled from 'styled-components';
import { useMousePosition } from '../../../hooks/useMousePosition';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
	cursorRefresh: () => void;
}

const ProjectGalleryCursorWrapper = styled.div`
	position: fixed;
	height: 60px;
	width: 60px;
	z-index: 1000;
	pointer-events: none;
`;

const ProjectGalleryInner = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: -25px;
	left: -25px;
	height: 60px;
	width: 60px;
`;

const Text = styled(motion.div)`
	color: var(--colour-white);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
`;

const Svg = styled.svg`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	width: 60px;
	height: 60px;
`;

const ProjectGalleryCursor = ({ cursorRefresh }: Props) => {
	const [isHoveringLink, setIsHoveringLink] = useState(false);
	const [isDraggingLink, setIsDraggingLink] = useState(false);
	const [isOnDevice, setIsOnDevice] = useState(false);
	const [randomIndex, setRandomIndex] = useState(1);

	const router = useRouter();

	const position = useMousePosition();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const variantsWrapper = {
		hidden: {
			opacity: 0,
			x: mouseXPosition,
			y: mouseYPosition,
		},
		visible: {
			opacity: 1,
			x: mouseXPosition,
			y: mouseYPosition,
		},
	};

	useEffect(() => {
		const galleryLinks = document.querySelectorAll('.gallery-wrapper');

		galleryLinks.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringLink(true);
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringLink(false);
				setRandomIndex(Math.floor(Math.random() * 2) + 1);
			});
			link.addEventListener('mousedown', () => {
				setIsHoveringLink(false);
				setIsDraggingLink(true);
			});
			link.addEventListener('mouseup', () => {
				setIsHoveringLink(true);
				setIsDraggingLink(false);
			});
			link.addEventListener('click', () => {
				setIsHoveringLink(false);
				setIsDraggingLink(false);
			});
		});

		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			setIsOnDevice(true);
		}
	}, [cursorRefresh]);

	useEffect(() => {
		setIsHoveringLink(false);
	}, [router.asPath, cursorRefresh]);

	useEffect(() => {
		const html = document.querySelector('html');

		if (isHoveringLink) {
			html?.classList.add('remove-cursor');
		} else {
			html?.classList.remove('remove-cursor');
		}
	}, [isHoveringLink]);

	return (
		<ProjectGalleryCursorWrapper>
			<ProjectGalleryInner
				variants={variantsWrapper}
				initial="hidden"
				animate={isHoveringLink ? 'visible' : 'hidden'}
				transition={{
					type: 'spring',
					mass: 0.05,
					stiffness: 1000,
					damping: 40,
					ease: 'linear',
				}}
			>
				{isHoveringLink && randomIndex === 1 && (
					<Svg
						width="51"
						height="29"
						viewBox="0 0 51 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path
							d="M24.897 3.79681C23.0022 3.79681 20.9721 3.5557 19.2166 4.37768C17.0942 5.37146 14.8409 5.94875 12.7309 6.99162C10.4887 8.09981 8.2068 9.3785 6.13633 10.7673C5.62158 11.1126 4.80487 11.3869 4.48226 11.929C3.78257 13.1048 2.35412 13.8547 1.78351 15.1239C1.14353 16.5473 1 17.5255 1 19.0932C1 19.6523 1.86322 20.2054 2.17526 20.6852C2.86563 21.7467 3.43795 22.7333 4.42785 23.5573C5.51554 24.4627 6.56438 25.6345 7.9754 26.0636C9.14886 26.4206 10.2729 26.9852 11.425 27.419C13.0264 28.0221 14.4858 27.9999 16.1914 27.9999C18.6362 27.9999 21.081 27.9999 23.5259 27.9999C25.7504 27.9999 28.1583 27.4391 30.3163 26.9242C32.366 26.4351 34.483 25.8672 36.4646 25.1816C39.4373 24.1531 42.5261 22.8517 45.2682 21.4167C47.1923 20.4097 47.838 18.8375 48.6961 16.9525C50.3137 13.3991 49.9693 9.38004 49.9693 5.53943C49.9693 4.20321 46.0774 3.15768 45.1921 2.83944C42.1552 1.74785 38.6289 1.08606 35.3873 1.08606C33.0727 1.08606 30.4712 0.760246 28.2269 1.3765C27.2288 1.65056 25.8872 1.80098 25.0058 2.35538C24.3599 2.76169 23.7059 3.02231 22.9382 3.02231"
							stroke="white"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							animate={isHoveringLink ? { pathLength: 1 } : { pathLength: 0 }}
							transition={{
								duration: 1,
								type: "spring",
								bounce: 0,
								delay: 0.3
							}}
						/>
					</Svg>
				)}
				{isHoveringLink && randomIndex === 2 && (
					<Svg
						width="44"
						height="35"
						viewBox="0 0 44 35"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path
							d="M35.8034 33.8315C25.5428 33.8315 13.8079 35.5353 4.63104 30.2914C1.47894 28.4902 0.845125 21.9787 0.845125 18.7862C0.845125 17.1723 0.338121 14.412 1.97598 13.4761C3.75703 12.4583 6.22106 10.3127 7.70403 8.82971C12.2708 4.26298 18.7502 2.50097 24.9128 1.55288C28.0484 1.07048 32.3259 1.06192 35.0167 2.85583C36.1928 3.6399 38.0618 4.25139 38.8027 5.51089C39.2113 6.20567 39.9795 7.22857 40.5727 7.82177C43.9597 11.2088 43.3261 17.64 43.3261 22.105C43.3261 23.259 42.1978 27.4979 41.4577 28.4231C40.0915 30.1308 39.7457 30.8949 37.5735 31.619"
							stroke="white"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							animate={isHoveringLink ? { pathLength: 1 } : { pathLength: 0 }}
							transition={{
								duration: 1,
								type: "spring",
								bounce: 0,
								delay: 0.3
							}}
						/>
					</Svg>
				)}
				{isHoveringLink && randomIndex === 3 && (
					<Svg
						width="51"
						height="34"
						viewBox="0 0 51 34"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path
							d="M13.436 24.4894C10.215 24.4894 6.16842 22.1625 3.85122 20.0638C2.52164 18.8596 1.0113 15.8728 1.0113 14.1064C1.0113 12.0024 0.785528 9.7428 2.35238 8.07329C3.55173 6.79534 4.22618 4.2772 6.17838 3.74232C8.31747 3.15623 10.5913 2.09948 12.8838 1.69976C16.1979 1.12191 19.4733 1 22.9418 1C26.4589 1 29.9759 1 33.4929 1C34.8331 1 36.2851 1.5193 37.4176 2.2104C38.8692 3.09628 40.9563 3.62368 42.1902 4.74468C45.5443 7.79186 47.947 11.1192 48.9548 15.4681C49.4322 17.5286 50 19.6105 50 21.766C50 24.0337 48.553 25.1962 46.9826 26.7021C44.8217 28.7743 43.4494 29.8721 40.3955 30.7872C35.3266 32.3063 29.566 33 24.2435 33C20.6098 33 17.6277 33.0059 14.6784 30.8061C12.9277 29.5003 12.1624 28.2744 10.951 26.5319"
							stroke="white"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							animate={isHoveringLink ? { pathLength: 1 } : { pathLength: 0 }}
							transition={{
								duration: 1,
								type: "spring",
								bounce: 0,
								delay: 0.3
							}}
						/>
					</Svg>
				)}
				<Text
					className="type-label"
					initial={{ opacity: 0 }}
					animate={isHoveringLink ? { opacity: 1 } : { opacity: 0 }}
					transition={{ delay: 0.3, duration: 0.2 }}
				>
					Play
				</Text>
			</ProjectGalleryInner>
		</ProjectGalleryCursorWrapper>
	);
};

export default ProjectGalleryCursor;
