import styled from 'styled-components';
import { VideoType } from '../../../shared/types/types';
import MuxPlayer from '@mux/mux-player-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import DrawingCanvas from '../DrawingCanvas';

type Props = {
	title: string;
	video: VideoType;
	lightColour: string;
}

type StyledProps = {
	$titleHeight: number;
};

const IntroAnimationWrapper = styled(motion.div)<StyledProps>`
	position: sticky;
	top: 0;
	height: calc(200vh);
	margin-bottom: ${(props) => `calc(${props.$titleHeight}px + 36px)`};
	z-index: 1;
	pointer-events: none;

	.layout-grid {
		position: relative;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const StickyWrapper = styled.div`
	position: relative;
	height: calc(100vh);
`;

const TitleOuterWrapper = styled.div`
	position: absolute;
	bottom: calc(100% + 24px);
	left: ${pxToRem(16)};
	width: calc(100vw - 36px);
`;

const Logo = styled(motion.svg)`
	position: absolute;
	top: -40px;
	left: -10px;
	width: 360px;
	height: auto;

	path {
		fill: var(--colour-dark);
	}
`;

const Title = styled(motion.h1)`
	grid-column: 1 / -1;
	text-indent: calc(360px + 24px);
	max-width: 1300px;
`;

const VideoWrapper = styled(motion.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100vh;

	mux-player {
		height: 100%;

		--media-object-fit: cover;
		--media-object-position: center;
		--controls: none;
	}
`;

const IntroAnimation = (props: Props) => {
	const {
		title,
		video,
		lightColour
	} = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [titleHeight, setTitleHeight] = useState(0);

	const titleRef = useRef<HTMLHeadingElement>(null);

	const { scrollY } = useScroll();

	const height = useTransform(
		scrollY,
		[0, windowHeight],
		['100vh', '0vh']
	);

	const width = useTransform(
		scrollY,
		[0, windowHeight],
		['100%', '0%']
	);

	const titleOpacity = useTransform(
		scrollY,
		[windowHeight, windowHeight + 200],
		[1, 0]
	);

	const titleY = useTransform(
		scrollY,
		[windowHeight, windowHeight + 200],
		[0, -20]
	);

	const handleSetWindowHeight = (height: number) => {
		setWindowHeight(height);
	};

	const handleSetTitleHeight = (height: number) => {
		setTitleHeight(height);
	}

	useEffect(() => {
		handleSetWindowHeight(window.innerHeight);

		if (titleRef?.current) {
			handleSetTitleHeight(titleRef.current.offsetHeight);
		}

		window.addEventListener('resize', () => {
			handleSetWindowHeight(window.innerHeight);

			if (titleRef?.current) {
				handleSetTitleHeight(titleRef.current.offsetHeight);
			}
		});
	
		return () => {
			window.removeEventListener('resize', () => {
				handleSetWindowHeight(window.innerHeight);

				if (titleRef?.current) {
					handleSetTitleHeight(titleRef.current.offsetHeight);
				}
			});
		}
	}, []);

	return (
		<IntroAnimationWrapper
			$titleHeight={titleHeight}
			className="performant"
		>
			<StickyWrapper>
				<DrawingCanvas
					windowHeight={windowHeight}
					lightColour={lightColour}
				/>
				<VideoWrapper
					style={{ height, width }}
				>
					{title && (
						<TitleOuterWrapper>
							<LayoutWrapper>
								<LayoutGrid>
									<Logo
										width="343"
										height="112"
										viewBox="0 0 343 112"
										fill="none"
										style={{
											opacity: titleOpacity,
											y: titleY
										}}
									>
										<g clipPath="url(#clip0_475_537)">
											<path d="M193.102 56.2023L193.528 56.7355C193.968 57.2811 194.805 58.6787 195.966 60.6001C200.029 67.2995 208.478 81.2221 213.374 81.741C214.04 81.8089 214.583 81.6137 215.065 81.1025C219.313 76.6194 207.847 63.0212 202.958 57.2253C200.049 53.7826 199.742 53.3854 199.979 52.8185C200.525 51.5297 201.972 50.4793 203.794 49.1628C207.787 46.2772 213.827 41.9026 214.637 31.0818C214.968 26.7354 212.453 20.8898 209.262 18.575C204.421 15.0662 198.119 17.6563 194.177 20.9472C192.673 22.2027 186.882 29.9262 185.082 37.7903C184.176 41.7353 183.842 44.8103 183.341 49.4544C183.116 51.5596 182.85 53.9712 182.486 56.9199C181.354 66.098 182.715 85.1404 184.288 87.57L184.329 87.645C184.746 88.2803 186.008 89.7789 187.422 90.052C188.116 90.1826 188.775 90.0219 189.436 89.5559C189.436 89.5559 191.101 88.1172 191.093 86.2865C191.085 84.4812 190.876 81.9702 190.628 79.0663C189.89 70.5196 188.969 59.8807 192.556 56.6773L193.065 56.2289L193.102 56.2023Z" fill="#2E2D29"/>
											<path d="M149.106 92.1045C147.907 92.9562 146.897 93.7002 144.755 93.4247C143.113 93.2097 141.182 91.9485 140.46 90.5854C138.216 86.3841 136.361 81.9671 134.607 77.5342C132.853 73.1013 131.465 68.5169 129.774 64.0566C129.173 62.4608 127.447 58.0905 126.553 58.1061C125.89 58.1271 124.24 63.9394 123.392 66.1532C122.215 69.2167 121.363 72.4733 119.808 75.3199C117.529 79.4737 113.543 79.46 111.266 75.4124C109.639 72.5394 105.176 62.5467 104.33 62.4591C102.752 62.6489 104.756 84.5827 103.231 89.1449C102.87 90.2117 101.122 91.4496 100.036 91.4331C96.3908 91.6757 96.2491 87.713 96.2387 87.0013C96.1331 77.0868 95.7336 67.1689 96.1525 57.2759C96.3288 52.8836 96.4583 45.8734 101.323 45.4396C106.081 44.844 112.313 64.4187 114.738 64.3547C116.549 64.2846 119.215 54.3713 119.934 49.3896C120.351 46.4901 120.29 43.4531 121.185 40.7164C121.638 39.3288 123.596 37.8682 125.171 37.6021C126.911 37.3055 128.156 38.652 128.599 39.7061C131.513 46.0604 133.67 52.6802 136.004 59.231C137.732 64.0716 139.504 68.2751 141.409 73.0338C143.703 78.772 151.326 89.2877 149.119 92.1041L149.106 92.1045Z" fill="#2E2D29"/>
											<path d="M326.662 50.4982C325.939 50.6736 320.369 52.9862 316.78 54.1679C310.524 56.2224 306.24 54.082 305.585 47.707C304.947 41.4332 303.78 33.8411 306.252 27.7739C306.867 26.2668 308.267 24.9382 310.043 25.7212C310.95 26.1248 311.853 27.5966 311.9 28.625C311.997 30.8344 311.57 33.7851 311.31 36.0058C311.214 49.5505 314.865 47.5149 319.901 46.0712C324.742 44.0869 327.21 44.1741 328.032 41.1727C328.603 39.0948 330.749 24.2009 333.448 22.3734C333.986 22.0131 335.664 21.3751 336.901 21.7046C339.338 22.4031 338.255 26.4172 338.017 27.3403C333.655 44.7965 334.439 58.3133 339.466 79.3249C340.296 82.0579 341.658 85.0664 341.741 87.5941C341.884 88.4542 341.518 89.7754 339.89 90.3864C338.942 90.6962 337.252 90.1648 336.525 89.4122C335.48 88.3264 334.854 86.7441 334.333 85.2729C331.535 77.3891 329.461 66.2526 329.01 57.9003C328.821 54.4351 328.589 50.0557 326.663 50.5236L326.662 50.4982Z" fill="#2E2D29"/>
											<path d="M275.073 45.8126C275.023 46.6534 289.878 39.5838 290.482 44.015C290.598 44.8251 290.22 46.1595 289.607 46.5476C288.018 47.5643 275.584 50.9334 274.311 52.2452C273.904 52.6777 273.794 54.4104 273.612 56.2599C273.089 61.4007 273.112 64.4643 277.776 63.719C282.211 63.0191 289.156 60.1799 293.543 59.189C295.154 58.8201 296.727 58.5033 297.875 60.0309C298.783 61.2228 297.76 63.1752 295.116 64.327C291.01 66.11 286.794 67.6676 282.536 69.074C278.315 70.4664 271.274 73.5249 269.007 72.9482C267.848 72.6543 267.305 70.4972 267.392 69.2229C268.112 58.3922 268.251 47.351 269.539 36.7057C270.433 31.9855 272.473 29.1236 277.018 27.8862C282.285 26.4479 287.509 24.8838 292.79 23.4832C295.196 22.8475 297.487 23.7795 297.639 25.2878C297.866 27.582 296.335 28.813 294.535 29.6202C291.602 30.9338 279.835 34.358 277.325 35.7344C275.417 36.7739 275.36 41.6838 275.085 45.8122L275.073 45.8126Z" fill="#2E2D29"/>
											<path d="M73.4771 74.4348C72.2072 73.4832 66.695 74.0519 63.5441 73.783C59.9833 73.4761 58.2005 72.8587 57.5472 78.296C56.7907 81.3462 56.2536 84.4657 55.1604 87.374C54.8428 88.2105 52.9079 88.8058 51.7081 88.8311C48.3333 89.1414 48.8786 85.4876 48.9596 84.8365C49.5324 74.9641 49.7183 71.6523 52.0232 62.0175C53.3272 56.5595 55.4536 51.2535 57.7262 46.1209C59.2486 42.665 61.0211 40.2185 63.4676 37.2928C65.1154 35.3333 69.0812 35.1315 70.5576 37.3226C71.7116 39.028 72.7079 40.9928 73.1556 42.9749C74.0943 47.0903 77.7433 65.0176 86.3865 80.9812C87.3973 82.9964 87.9631 85.0765 86.0728 86.6494C84.5311 87.9443 82.0639 87.4884 80.5048 85.5033C79.199 83.8409 75.5057 75.9345 73.4767 74.4221L73.4771 74.4348Z" fill="#2E2D29"/>
											<path d="M252.594 6.62391C252.865 4.7462 253.414 2.78338 255.887 2.62878C257.519 2.52626 258.462 4.4164 258.231 7.13205C257.725 13.1624 257.347 19.214 256.674 25.2369C255.059 39.5926 255.974 53.9573 256.671 68.2907C257.145 78.1553 258.333 87.9847 259.242 97.8357C259.538 101.043 258.747 103.052 256.918 103.377C254.556 103.782 252.556 101.582 252.449 98.3051C252.415 97.2635 249.904 71.137 249.936 44.6375C249.949 30.9047 251.557 16.7399 252.607 6.62351L252.594 6.62391Z" fill="#2E2D29"/>
											<path d="M2.45967 22.6313C2.56783 22.0303 3.89639 21.2507 4.65045 21.265C5.41728 21.2788 7.90419 21.1619 8.28041 24.0872C9.78571 35.8011 10.8518 78.7574 11.3912 100.038C11.5811 103.91 9.05772 105.262 7.69615 105.419C3.17925 105.957 3.71348 100.002 3.63953 98.1222C3.19915 86.9468 -0.642497 34.8471 2.46008 22.644L2.45967 22.6313Z" fill="#2E2D29"/>
											<path d="M232.615 49.7127C236.29 49.5963 233.499 58.8396 233.311 60.8927C232.66 68.3644 232.788 73.4846 235.485 80.2018C235.853 80.9149 236.339 82.1075 235.806 83.0144C235.214 84.0377 234.372 84.4712 233.424 84.781C232.539 85.0633 230.872 84.4676 230.246 83.6864C226.395 79.9556 225.495 49.9381 232.615 49.7127Z" fill="#2E2D29"/>
											<path d="M228.421 24.4789C227.561 21.2129 230.098 19.8611 232.253 19.7674C233.988 19.6871 235.876 21.5981 235.912 23.4661C235.946 25.3087 234.371 27.1387 232.222 27.0415C230.955 26.9799 229.123 27.1905 228.409 24.4793L228.421 24.4789Z" fill="#2E2D29"/>
											<path d="M28.0379 58.5554C28.3434 56.5622 29.706 54.866 31.8127 55.2316C37.3309 57.2058 37.2477 79.371 38.3547 89.4445C38.5888 91.5351 37.9791 93.6016 35.7671 93.5317C34.2454 93.4782 32.22 94.0382 31.4646 90.8452C29.8224 82.7722 27.6493 61.1362 28.0379 58.5554Z" fill="#2E2D29"/>
											<path d="M28.2924 25.1701C25.8935 25.246 24.0283 23.2706 24.2407 20.7717C24.4133 18.6174 25.7072 17.165 27.8133 17.1238C30.1751 17.0871 30.8398 19.0624 31.0948 21.0124C31.3862 23.292 30.0915 25.1131 28.3051 25.1696L28.2924 25.1701Z" fill="#2E2D29"/>
										</g>
										<defs>
											<clipPath id="clip0_475_537">
												<rect width="338.992" height="100.768" fill="white" transform="matrix(0.999499 -0.0316493 0.0325318 0.999471 0.0795898 10.729)"/>
											</clipPath>
										</defs>
									</Logo>
									<Title
										ref={titleRef}
										style={{
											opacity: titleOpacity,
											y: titleY
										}}
									>
										{title}
									</Title>
								</LayoutGrid>
							</LayoutWrapper>
						</TitleOuterWrapper>
					)}
					{video?.asset?.playbackId && (
						<MuxPlayer
							streamType="on-demand"
							playbackId={video.asset.playbackId}
							autoPlay="muted"
							loop={true}
							thumbnailTime={0}
							muted={true}
							playsInline={true}
						/>
					)}
				</VideoWrapper>
			</StickyWrapper>
		</IntroAnimationWrapper>
	);
};

export default IntroAnimation;
