export type MediaType = {
	media: [
		{
			webmVideoFile: {
				url: string;
			};
			mp4VideoFile: {
				url: string;
			};
			placeholderImage: {
				url: string;
			}
		}
	];
};

export type Transitions = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		}
	}
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number
		}
	}
};

export type VideoType = {
	asset: {
		playbackId: string;
	}
}

export type ImageType = {
	asset: {
		url: string;
	}
};

export type ColorType = {
	hex: string;
};

export type SiteSettingsType = {
	linkedInUrl: string;
	aoc: string;
	homePageParagraphThree: string;
	easterEggImages: [
		ImageType
	]
	projectsTitle: string;
	vimeoUrl: string;
	phone: string;
	homePageTitle: string;
	seoDescription: string;
	projectsParagraph: string;
	homePageParagraphTwo: string;
	homePageParagraphOne: string;
	easterEggColors: ColorType[];
	email: string;
	instagramUrl: string;
	easterEggText: string;
	profileImage: ImageType;
	showreelVid: VideoType;
	footerCta: string;
}

export type ProjectsType = {
	year: number;
	title: string;
	slug: {
		current: string;
	};
	vimeoUrl: string;
	snippetVideo: VideoType;
	gallery: VideoType[];
	credits: [];
	client: string;
	category: string;
	imageGallery: MediaType[];
}
