import styled from 'styled-components';
import Link from 'next/link';
import { renderNodeRule, StructuredText } from 'react-datocms';
import { isLink, isParagraph } from 'datocms-structured-text-utils';

const Content = styled.div``;

type Props = {
	className?: string;
	data: any;
	color?: string;
};

const RichText = (props: Props) => {
	const {
		className,
		data,
		color
	} = props;

	return (
	<Content className={`${className} content content--${color}`}>
		<StructuredText
			data={data}
			customNodeRules={[
				renderNodeRule(isLink, ({ node, children, key }) => (
					<Link href={node.url} passHref key={key} scroll={false}>
						<a target="_blank">{children}</a>
					</Link>
				)),
				renderNodeRule(isParagraph, ({ children, key }) => (
					<p key={key}>{children}</p>
				)),
			]}
		/>
	</Content>
	);
};

export default RichText;
