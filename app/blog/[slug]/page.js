import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getPost(slug) {
  const file = path.join(process.cwd(), 'data/blog', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  return matter(raw)
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data/blog')
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => ({ slug: f.replace(/\.mdx$/, '') }))
}

function renderMarkdown(text) {
  return text.trim().split(/\n\s*\n/).map((p, i) => {
    const html = p.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
  })
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return <main className="post"><h1>404</h1><p>این نوشته پیدا نشد.</p><Link className="back" href="/">بازگشت به وبلاگ</Link></main>
  return <main className="post">
    <Link className="back" href="/">← بازگشت به نوشته‌ها</Link>
    <div className="date">{String(post.data.date)}</div>
    <h1>{post.data.title}</h1>
    <p className="muted">{post.data.summary}</p>
    <article className="content">{renderMarkdown(post.content)}</article>
  </main>
}
