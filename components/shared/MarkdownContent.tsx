import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
    content: string;
};

export const MarkdownContent = ({ content }: Props) => {
    return (
        <article className="
            prose
            prose-sm
            sm:prose-base
            prose-neutral
            dark:prose-invert
            max-w-none

            prose-headings:font-bold

            prose-h1:text-2xl
            prose-h1:mb-6

            prose-h2:text-lg
            prose-h2:mt-10
            prose-h2:mb-4

            prose-h3:text-lg

            prose-p:leading-6
            prose-p:my-3

            prose-li:my-1

            prose-ul:my-3
            prose-ol:my-3

            prose-hr:my-8
        ">
            <MDXRemote source={content} />
        </article>
    );
};
