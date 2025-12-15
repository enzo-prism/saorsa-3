"use client"

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Sanitize and render HTML content
  // The content from Substack RSS is trusted, but we clean up some elements
  const cleanContent = content
    // Remove Substack subscription forms/buttons
    .replace(/<div class="subscription-widget[^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "")
    // Remove inline styles that might conflict
    .replace(/style="[^"]*"/gi, "")
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/gi, "")

  return (
    <article
      className="prose md:prose-lg max-w-none
        prose-headings:text-foreground prose-headings:font-bold
        prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mb-6
        prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:md:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:md:mt-8 prose-h3:mb-3
        prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/35 hover:prose-a:decoration-primary/70
        prose-strong:text-foreground prose-strong:font-semibold
        prose-em:text-foreground/90
        prose-blockquote:border-l-accent prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground/80
        prose-ul:text-foreground/80 prose-ul:my-4
        prose-ol:text-foreground/80 prose-ol:my-4
        prose-li:my-1
        prose-img:rounded-lg prose-img:my-8
        prose-hr:border-border prose-hr:my-10
        prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:text-foreground prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:leading-relaxed prose-pre:border prose-pre:border-border prose-pre:rounded-lg
        [&_.button-wrapper]:my-6
        [&_.button-wrapper_a.button.primary]:inline-flex [&_.button-wrapper_a.button.primary]:items-center [&_.button-wrapper_a.button.primary]:justify-center
        [&_.button-wrapper_a.button.primary]:gap-2 [&_.button-wrapper_a.button.primary]:rounded-lg [&_.button-wrapper_a.button.primary]:bg-primary
        [&_.button-wrapper_a.button.primary]:px-5 [&_.button-wrapper_a.button.primary]:py-2.5 [&_.button-wrapper_a.button.primary]:text-primary-foreground
        [&_.button-wrapper_a.button.primary]:font-semibold [&_.button-wrapper_a.button.primary]:no-underline
        [&_.button-wrapper_a.button.primary:hover]:opacity-90
        [&_.button-wrapper_a.button.primary:focus-visible]:outline-none [&_.button-wrapper_a.button.primary:focus-visible]:ring-2
        [&_.button-wrapper_a.button.primary:focus-visible]:ring-primary/40"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  )
}
