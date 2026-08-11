import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getPosts() {
  const dir = path.join(process.cwd(), 'data/blog')
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const { data } = matter(raw)
    return { slug: file.replace(/\.mdx$/, ''), ...data }
  }).filter(post => post.draft !== true).sort((a,b) => new Date(b.date) - new Date(a.date))
}

export default function Home() {
  const posts = getPosts()
  return <main className="container">
    <nav className="nav"><div className="brand">ره‌آورد</div><div className="muted">نوشته‌ها　 درباره من</div></nav>
    <section className="hero">
      <span className="badge">وبلاگ شخصی</span>
      <h1>جایی برای <span className="purple">نوشتن</span> و<br/> اندیشیدن.</h1>
      <p>یادداشت‌ها، مقاله‌ها و دیدگاه‌های من؛ ساده، شخصی و بدون حاشیه.</p>
    </section>
    <section><h2>آخرین نوشته‌ها</h2><div className="posts">
      {posts.map(post => <Link className="card" href={`/blog/${post.slug}`} key={post.slug}>
        <div className="date">یادداشت تازه · {String(post.date)}</div>
        <h2>{post.title}</h2><p className="muted">{post.summary}</p>
      </Link>)}
    </div></section>
  </main>
}
