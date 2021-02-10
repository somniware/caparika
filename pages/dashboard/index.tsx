import Link from 'next/link'
import Head from 'next/head'
import DashboardLayout from '../../components/layout-dashboard'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Head>
        {/* <title>{siteTitle}</title> */}
      </Head>
      <section className="bla">
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <ul>
      <li>
        <Link href="/a" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
      </section>
    </DashboardLayout>
  )
}

export default Dashboard;