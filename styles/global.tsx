import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
	:root {
		--colour-white: ${theme.colours.white};
		--colour-black: ${theme.colours.black};
		--colour-dark-blue: ${theme.colours.darkBlue};
		--colour-light-blue: ${theme.colours.lightBlue};
		--colour-dark-green: ${theme.colours.darkGreen};
		--colour-light-green: ${theme.colours.lightGreen};
		--colour-dark-yellow: ${theme.colours.darkYellow};
		--colour-light-yellow: ${theme.colours.lightYellow};
		/* --colour-dark: ${theme.colours.darkYellow};
		--colour-light: ${theme.colours.lightYellow}; */
		--font-default: ${theme.fonts.default};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-extra-fast: ${theme.transitionSpeed.extraFast};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
		--transition-speed-extra-slow: ${theme.transitionSpeed.extraSlow};
		--transition-ease: cubic-bezier(0.65, 0, 0.35, 1);
	}

	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		list-style: none;
		background: none;
		outline: none;
		border-radius: 0;
		box-shadow: none;
		font-weight: 100;
		font-family: var(--font-default);
	}

	::selection {
		background-color: var(--colour-dark);
		color: var(--colour-light);
	}

	html {
		scroll-behavior: smooth;
		background: var(--colour-white);
		color: var(--colour-dark);
		font-size: 16px;

		&.no-scroll {
			overflow-y: hidden;
			
			body {
				overflow-y: hidden;
			}
		}

		&.remove-cursor {
			* {
				cursor: none !important;
			}
		}
	}

	body {
		position: relative;
	}

	input,
	textarea,
	select,
	button,
	label,
	body,
	a {
		color: var(--colour-dark);
		line-height: 1.4;
	}

	strong,
	b {
		font-weight: 900;
	}

	em {
		font-style: italic;
	}

	a {
		text-decoration: underline;
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	button {
		cursor: pointer;
	}

	h1,
	.type-h1 {
		font-size: ${theme.size.h1};
		line-height: 4.313rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h1};
			line-height: 2.75rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h1};
		}
	}

	h2,
	.type-h2 {
		font-size: ${theme.size.h2};
		line-height: 5.063rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h2};
			line-height: 2.25rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h2};
		}
	}

	h3,
	.type-h3 {
		font-size: ${theme.size.h3};
		line-height: 2.5rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h3};
			line-height: 1.875rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h3};
		}
	}

	h4,
	.type-h4 {
		font-size: ${theme.size.h4};
		line-height: 2.5rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h4};
			line-height: 1.875rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h4};
		}
	}

	p,
	.type-p,
	a,
	button,
	div {
		font-size: ${theme.size.body};
		line-height: 1.563rem;

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.body};
			line-height: 1.563rem;
		}
	}

	.type-small {
		font-size: ${theme.size.small};
		line-height: 1.2;

		* {
			font-size: ${theme.size.small};
			line-height: 1.2;
		}
	}

	.type-label {
		font-size: ${theme.size.label};
		line-height: 1.125rem;
		
		* {
			font-size: ${theme.size.label};
			line-height: 1.125rem;
		}
	}

	.animated-line-parent {
		position: relative;
		text-decoration: none;

		&--small {
			.line-wrapper {
				bottom: -7px !important;
			}
		}

		&--tiny {
			.line-wrapper {
				bottom: -4px !important;
			}
		}
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity 300ms ease;

		&--in-view
		{
			opacity: 1;
		}
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(10px);

		transition: all ${theme.transitionSpeed.slow} cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-left-right
	{
		opacity: 0;
		transform: translateX(30px);

		transition: all ${theme.transitionSpeed.slow} cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateX(0);
		}
	}

	.view-element-scale-up
	{
		transform: scale(0.95);
		opacity: 0;

		transition: opacity 300ms ease, transform 300ms ease;

		&--in-view
		{
			opacity: 1;
			transform: scale(1);
		}
	}

	mux-player {
		--media-object-fit: cover;
		--media-object-position: center;
		--controls: none;
		transition: all 0 var(--transition-ease) !important;
	}

	.performance {
		-webkit-transform: translateZ(0);
	}

	::placeholder {
		color: currentcolor;
		opacity: 1;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}

	input[type="hidden"] {
		display: none;
	}

	input,
	textarea,
	select {
		padding: 0.125rem 0;
		font-size: ${theme.size.body};
		width: 100%;
		appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	textarea {
		min-height: 8rem;
	}

	label {
		display: inline-block;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	img,
	video {
		max-width: 100%;
		display: block;
		height: auto;
	}

	iframe {
		max-width: 100%;
		display: block;
	}
`;
