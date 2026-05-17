import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { Section } from "@/components/ui/section";
import { replaceContentWithAppConfig } from "@/lib/utils";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

type Props = {
    params: Promise<{ locale: string }>;
};

const TermsPage = async ({ params }: Props) => {
    const { locale } = await params;

    const filePath = path.join(process.cwd(), 'content', 'terms', `terms.${locale}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { content } = matter(fileContent);
    const processedContent = replaceContentWithAppConfig(content);

    return (
        <Section className="py-20">
            <div className="max-w-3xl mx-auto">
                <MarkdownContent content={processedContent} />
            </div>
        </Section>
    );
};

export default TermsPage;
