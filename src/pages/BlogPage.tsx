import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { blogPosts } from '@/data/posts'
import heroGeneralImage from '@/assets/hero-general.jpg'

export function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Seo
        title="Blogs | Tested & Trusted"
        description="Practical cargo, shipping and customs insights."
        path="/blogs"
      />
      <SectionHeading
        eyebrow="Blogs"
        title="Practical cargo, shipping and customs insights."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="border-border overflow-hidden p-0">
            <img
              src={heroGeneralImage}
              alt=""
              width="1200"
              height="800"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-5">
              <div className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
                {post.category}
              </div>
              <h3 className="font-display text-deep-teal mt-3 text-xl font-semibold">
                {post.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {post.excerpt}
              </p>
              <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
                <span>{post.date}</span>
                <span>{post.readTime} min read</span>
              </div>
              <Link
                to={`/blogs/${post.slug}`}
                className="text-primary mt-4 inline-flex text-sm font-medium"
              >
                Read More
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
