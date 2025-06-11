import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import axios from 'axios'


const getAllBlogs = async (): Promise<string[]> => {
    try {
        const response = await axios.get('https://clickcontent-blog-api.vmirecloud.eu/post/get/post')
        return response.data.map(blog => blog.id)
    } catch (e) {
        console.log('Ошибка при получении блогов', e)
        return []
    }
}

const links = [
    { url: '/', changefreq: 'monthly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/receipt', changefreq: 'monthly', priority: 0.8 },
    { url: '/policy', changefreq: 'monthly', priority: 0.7 },
    { url: '/terms', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'monthly', priority: 0.5 },
]

const tips = ['photograph', 'teacher', 'psychologist', 'athlete', 'musician', 'cook']

export const generateSitemap = async () => {

    const sitemap = new SitemapStream({
        hostname: 'https://clickcontent.eu',
        xmlns: { news: false, xhtml: false, image: false, video: false }
    })
    const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'))
    const pipe = promisify(pipeline)

    pipe(sitemap, writeStream)
        .then(() => console.log('Sitemap создан успешно'))
        .catch((err) => console.error('Ошибка при создании sitemap', err))


    links.forEach(link => sitemap.write(link))
    tips.forEach((tip) => sitemap.write({ url: `/tips/${tip}`, changefreq: 'monthly', priority: 0.7 }))

    const blogIds = await getAllBlogs()
    blogIds.forEach((id) => sitemap.write({ url: `/blog/${id}`, changefreq: 'daily', priority: 1 }))

    sitemap.end()
}
