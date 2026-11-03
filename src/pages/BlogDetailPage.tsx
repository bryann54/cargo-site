import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { blogPosts } from '@/data/posts'
import heroGeneralImage from '@/assets/hero-general.jpg'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return <NotFoundPage />

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Seo
        title={`${post.title} | Tested & Trusted`}
        description={post.excerpt}
        path={`/blogs/${post.slug}`}
      />
      <div className="border-border bg-secondary rounded-2xl border p-6 md:p-10">
        <div className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
          {post.category}
        </div>
        <h1 className="font-display text-deep-teal mt-3 text-4xl font-semibold">
          {post.title}
        </h1>
        <div className="text-muted-foreground mt-3 text-sm">
          {post.date} · {post.readTime} min read
        </div>
        <img
          src={heroGeneralImage}
          alt="Shipping containers at a freight terminal"
          width="1200"
          height="900"
          loading="lazy"
          className="mt-8 aspect-[16/8] w-full object-cover"
        />
        <p className="text-muted-foreground mt-8 text-lg">{post.excerpt}</p>
        <div className="mt-8 space-y-4 text-slate-700">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-display text-deep-teal text-2xl font-semibold">
          Related posts
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {blogPosts
            .filter((entry) => entry.slug !== slug)
            .slice(0, 3)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`/blogs/${entry.slug}`}
                className="border-border bg-card rounded-xl border p-4"
              >
                <div className="text-deep-teal font-semibold">
                  {entry.title}
                </div>
                <div className="text-muted-foreground mt-2 text-sm">
                  {entry.excerpt}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
