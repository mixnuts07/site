import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {okaidia} from "react-syntax-highlighter/dist/esm/styles/prism";
import {ArticleTypeProps} from "@/types";
import {TitleComponent} from "@/app/_components/TitleComponent";
import {UpdatedAtComponent} from "@/app/_components/UpdatedAtComponent";
import {TagsComponent} from "@/app/_components/TagsComponent";

export default function ArticleComponent({props}: ArticleTypeProps) {
    return (
        <article className='my-10 flex justify-center items-center flex-col mx-auto px-10'>
            <article className="mt-10 space-y-3 flex flex-col items-center mx-auto w-4/5 px-20">
                <TitleComponent title={props.title} className='text-xl'/>
                <UpdatedAtComponent date={props.updatedAt}/>
                <TagsComponent tags={props.tags}/>
            </article>
            <article className='mt-10 break-words space-y-5 w-4/5 px-20'>
                <Markdown remarkPlugins={[remarkGfm]} className='prose prose-stone prose-a:underline prose-a:underline-offset-4' components={{
                    code({ node,  className, children, ...props}) {
                    const inline = node?.tagName === "code" && !className?.includes('language-')
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                            <CodeBlock language={match ? match[1] : undefined} value={String(children).replace(/\n$/, '')} {...props} />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }}}>{props.body}</Markdown>
            </article>
        </article>
    )
}

function CodeBlock({language, value}: { value: string, language?: string }) {
    return (
        <SyntaxHighlighter style={okaidia} language={language} children={value}/>
    );
}