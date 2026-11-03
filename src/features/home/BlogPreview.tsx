import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/posts'
import { SectionHeading } from '@/components/common/SectionHeading'

export function BlogPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <SectionHeading
          eyebrow="Field notes"
          title="Practical notes for the next shipment."
        />
        <p className="text-muted-foreground max-w-lg leading-7">
          Short guides on documents, cargo modes and local clearance steps.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {blogPosts.slice(0, 3).map((post) => (
          <article key={post.slug} className="border-primary border-t-2 py-5">
            <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
              {post.category} · {post.readTime} min
            </p>
            <h3 className="font-display text-deep-teal mt-3 text-2xl leading-snug font-semibold">
              {post.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {post.excerpt}
            </p>
            <Link
              to={`/blogs/${post.slug}`}
              className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Read the note <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
