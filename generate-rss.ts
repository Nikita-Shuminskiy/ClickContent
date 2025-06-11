import RSS from 'rss'
import { createWriteStream } from 'fs'
import { resolve } from 'path'
import axios from 'axios'
import { addHours, parse, subDays } from 'date-fns'
import { ru } from 'date-fns/locale'


const getAllBlogs = async (): Promise<{ id: string, title: string, description: string, date: string }[]> => {
    try {
        const response = await axios.get('https://clickcontent-blog-api.vmirecloud.eu/post/get/post')
        return response.data.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            date: blog.date
        }))
    } catch (e) {
        console.log('Ошибка при получении блогов', e)
        return []
    }
}

const parseDate = (dateStr: string): Date => {
    const now = new Date()
    let date: Date

    if (dateStr === 'Вчера') {
        date = subDays(now, 1)
    } else if (dateStr === 'Сегодня') {
        date = now
    } else {
        date = parse(dateStr, 'dd.MM.yyyy', new Date(), { locale: ru })
    }

    return addHours(date, 3)
}

export const generateRSS = async () => {
    const now = new Date()
    const updated = now.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })


    const feed = new RSS({
        title: 'ClickContent | Как монетизировать творчество',
        description: 'О монетизации контента для блогеров',
        id: 'https://clickcontent.eu/',
        link: 'https://clickcontent.eu/',
        language: 'eu',
        image: 'https://clickcontent.eu/logo.png',
        favicon: 'https://clickcontent.eu/favicon.ico',
        updated: updated,
        generator: 'RSS for Node'
    })

    const blogs = await getAllBlogs()
    blogs.forEach(blog => {
        feed.item({
            title: blog.title,
            id: blog.id,
            url: `https://clickcontent.eu/blog/${blog.id}`,
            description: blog.description,
            date: parseDate(blog.date),
        })
    })

    const rss = feed.xml({ indent: true })
    const writeStream = createWriteStream(resolve(__dirname, 'public', 'rss.xml'))
    writeStream.write(rss)
    writeStream.end()
}
