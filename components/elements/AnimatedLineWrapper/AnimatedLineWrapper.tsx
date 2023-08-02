import React from "react";
import styled from "styled-components";

type Props = {
	strokeWidth?: number;
};

const LineWrapper = styled.div`
	position: absolute;
	bottom: -10px;
	left: 0;
	width: 100%;

	svg {
		width: 100%;
		height: auto;
		min-height: 3px;
	}

	path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		width: 100%;

		transition: all var(--transition-speed-slow) var(--transition-ease);
	}
`;

const AnimatedLineWrapper = ({ strokeWidth = 3 }: Props) => {
	const randomIndex = Math.floor(Math.random() * 3) + 1;

	return (
		<LineWrapper className="line-wrapper">
			{randomIndex === 1 && (
				<svg preserveAspectRatio="none" width="340" height="5" viewBox="0 0 340 5" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 3C105.941 3 209.882 3 313.823 3C321.881 3 329.767 2 338 2" stroke="black" stroke-width={strokeWidth} stroke-linecap="round"/>
				</svg>
			)}
			{randomIndex === 2 && (
				<svg preserveAspectRatio="none" width="344" height="11" viewBox="0 0 344 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.85107 6.13112C23.6843 6.13112 45.5174 6.13112 67.3506 6.13112C76.7371 6.13112 86.063 7.12521 95.4337 7.12521C107.492 7.12521 119.55 7.12521 131.608 7.12521C172.339 7.12521 213.021 8.1193 253.743 8.1193C263.354 8.1193 272.966 8.61635 282.599 8.61635C293.54 8.61635 304.077 7.21966 314.962 6.13112C316.911 5.93621 318.478 5.23311 320.457 5.10942C322.625 4.97394 324.903 4.67866 327.029 4.25339C329.152 3.82895 330.943 3.62471 332.883 2.76226C334.768 1.92481 340.891 2.26484 341.83 4.14294" stroke="black" stroke-width={strokeWidth} stroke-linecap="round"/>
				</svg>
			)}
			{randomIndex === 3 && (
				<svg preserveAspectRatio="none" width="338" height="6" viewBox="0 0 338 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.7981 1.9541C66.8926 1.9541 131.987 1.9541 197.082 1.9541C222.739 1.9541 248.254 3.94228 273.903 3.94228C294.705 3.94228 315.507 3.94228 336.31 3.94228" stroke="black" stroke-width={strokeWidth} stroke-linecap="round"/>
				</svg>
			)}
			{randomIndex === 4 && (
				<svg preserveAspectRatio="none" width="325" height="11" viewBox="0 0 325 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.26538 5.67656C8.90186 5.67656 15.5383 5.67656 22.1748 5.67656C27.8253 5.67656 32.8141 5.7261 38.1631 3.68838C41.401 2.45489 44.7219 2.69429 48.2421 2.69429C58.8365 2.69429 69.431 2.69429 80.0254 2.69429C92.2497 2.69429 103.991 4.99418 116.061 6.20122C123.829 6.97797 131.922 7.66194 139.643 8.90736C145.379 9.83251 151.657 9.15588 157.454 9.15588C162.59 9.15588 167.726 9.15588 172.862 9.15588C177.58 9.15588 182.217 8.16179 186.945 8.16179C192.553 8.16179 198.182 7.66474 203.817 7.66474C214.8 7.66474 225.953 8.27032 236.871 7.05724C249.152 5.6927 261.504 2.69429 273.873 2.69429C279.684 2.69429 285.649 2.19724 291.546 2.19724C295.605 2.19724 299.664 2.19724 303.723 2.19724C310.274 2.19724 316.157 3.11125 322.86 1.7002" stroke="black" stroke-width={strokeWidth} stroke-linecap="round"/>
				</svg>
			)}

		</LineWrapper>
	);
};

export default AnimatedLineWrapper;
