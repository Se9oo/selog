/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/self-closing-comp */

import React, { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';

import { generateSlug } from '~/utils/format';
import CodeBlock from './CodeBlock';

const openImage = (src: string) => () => window.open(src);

const MarkdownDarkComponent: object = {
	code({ inline, className, children, ...props }: { inline: boolean; className: string; children: string | string[] }) {
		const match = /language-(\w+)/.exec(className || '');

		const formattedChildren = Array.isArray(children)
			? children.map((item) => {
					return item.replace(/\n\n&nbsp;\n\n/g, '\n');
			  })
			: children.replace(/\n\n&nbsp;\n\n/g, '\n');

		return !inline && match ? (
			<CodeBlock children={formattedChildren} match={match} />
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
	blockquote({ children, ...props }: { children: ReactNode }) {
		return (
			<blockquote
				style={{
					background: '#282C34',
					padding: '1rem',
					borderLeft: '4px solid #8491D9',
				}}
				{...props}
			>
				{children}
			</blockquote>
		);
	},
	a: (anchor: { href: string; children: Array<any> }) => {
		if (anchor.href.match('http')) {
			return (
				<a
					href={anchor.href}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: '#8491D9', fontWeight: 700, wordBreak: 'break-word', textDecoration: 'underline' }}
				>
					{anchor.children}
				</a>
			);
		}
		return <a href={anchor.href}>{anchor.children}</a>;
	},
	ol: ({ children, ...props }: { children: ReactNode }) => {
		return (
			<ol
				style={{
					listStyle: 'decimal',
					marginLeft: '1rem',
				}}
				{...{ ...props, ordered: 'true' }}
			>
				{children}
			</ol>
		);
	},
	hr: ({ ...props }) => {
		return <hr style={{ color: '#EAEAEA' }} {...props} />;
	},
	h2: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h2 id={slug} {...props}></h2>;
	},
	h3: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h3 id={slug} {...props}></h3>;
	},
	h4: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h4 id={slug} {...props}></h4>;
	},
	img: (props: any) => {
		const { src, alt } = props;
		return (
			<img
				src={src}
				alt={alt}
				style={{ margin: '0 auto', cursor: 'pointer' }}
				onClick={openImage(src)}
				onKeyDown={openImage(src)}
			/>
		);
	},
	strong: (props: any) => {
		return (
			<strong
				style={{
					fontFamily: `Monaco, Spoqa Han Sans Neo, Noto Sans KR, sans-serif`,
					fontWeight: 600,
					verticalAlign: '0.5px',
					fontSize: '1rem',
				}}
				{...props}
			></strong>
		);
	},
	ul: (props: any) => {
		return <ul {...props} style={{ listStyle: 'disc', marginLeft: '2rem', paddingBottom: '0.5rem' }}></ul>;
	},
};

const MarkdownLightComponent: object = {
	...MarkdownDarkComponent,
	blockquote({ children, ...props }: { children: ReactNode }) {
		return (
			<blockquote
				style={{
					background: '#F8F9FA',
					padding: '1rem',
					margin: '1rem 0',
					borderLeft: '4px solid #8491D9',
				}}
				{...props}
			>
				{children}
			</blockquote>
		);
	},
	hr: ({ ...props }) => {
		return <hr style={{ color: 'rgba(41, 69, 105, 0.1)' }} {...props} />;
	},
};

const PostMarkdown = ({ content }: { content: string }) => {
	const { theme } = useTheme();

	return (
		<ReactMarkdown
			children={content.replace(/\n\s/gi, '\n\n&nbsp;\n\n')}
			components={theme === 'light' ? MarkdownLightComponent : MarkdownDarkComponent}
		/>
	);
};

export default PostMarkdown;
