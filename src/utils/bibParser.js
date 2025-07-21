// BibTeX 解析工具 - 使用 bibtex-parse 库
import bibtexParse from 'bibtex-parse';

// 将 BibTeX 条目转换为组件所需的格式
export const convertBibToPublication = (bibEntry) => {
    // bibtex-parse 库返回的字段都是大写的
    const fields = {};

    // 将大写字段名转换为小写，方便处理
    Object.keys(bibEntry).forEach(key => {
        if (key !== 'key' && key !== 'type') {
            fields[key.toLowerCase()] = bibEntry[key];
        }
    });

    // 解析作者
    const parseAuthors = (authorString) => {
        if (!authorString) return [];

        return authorString
            .split(' and ')
            .map(author => {
                // 处理 "Last, First" 格式
                if (author.includes(',')) {
                    const [last, first] = author.split(',').map(s => s.trim());
                    return `${first} ${last}`;
                }
                return author.trim();
            });
    };

    // 确定发表类型
    const getPublicationType = (type) => {
        switch (type?.toLowerCase()) {
            case 'article':
                return 'Journal Article';
            case 'inproceedings':
                return 'Conference Paper';
            case 'incollection':
                return 'Book Chapter';
            case 'book':
                return 'Book';
            case 'phdthesis':
                return 'PhD Thesis';
            case 'mastersthesis':
                return 'Master\'s Thesis';
            default:
                return 'Publication';
        }
    };

    // 获取发表场所
    const getVenue = (fields) => {
        if (fields.journal) return fields.journal;
        if (fields.booktitle) return fields.booktitle;
        if (fields.school) return fields.school;
        if (fields.publisher) return fields.publisher;
        return 'Unknown Venue';
    };

    // 解析关键词为标签
    const parseTags = (keywords) => {
        if (!keywords) return [];
        return keywords
            .split(/[,;]/)
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
            .slice(0, 6); // 限制标签数量
    };

    // 生成链接
    const generateLink = (fields) => {
        if (fields.url) return fields.url;
        if (fields.doi) return `https://doi.org/${fields.doi}`;
        return '#';
    };

    return {
        id: bibEntry.key || Math.random().toString(36).substr(2, 9),
        title: fields.title || 'Untitled',
        authors: parseAuthors(fields.author),
        journal: getVenue(fields),
        year: fields.year || 'Unknown',
        type: getPublicationType(bibEntry.type),
        abstract: fields.abstract || 'No abstract available.',
        tags: parseTags(fields.keywords),
        featured: fields.selected === 'true',
        link: generateLink(fields),
        pdf: fields.pdf || null,
        preview: fields.preview || null,
        doi: fields.doi || null
    };
};

// 从 BibTeX 文件内容生成发表物列表
export const generatePublicationsFromBib = (bibContent) => {
    try {
        console.log('Original BibTeX content length:', bibContent.length);

        // 移除开头的 YAML front matter
        let cleanContent = bibContent.replace(/^---\s*\n---\s*\n/s, '');

        // 如果上面的正则没有匹配，尝试更宽松的匹配
        if (cleanContent === bibContent) {
            cleanContent = bibContent.replace(/^---[\s\S]*?---\s*\n/s, '');
        }

        // 如果还是没有变化，手动查找并移除
        if (cleanContent === bibContent && bibContent.startsWith('---')) {
            const lines = bibContent.split('\n');
            let startIndex = 0;
            if (lines[0] === '---') {
                // 找到第二个 ---
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i] === '---') {
                        startIndex = i + 1;
                        break;
                    }
                }
                cleanContent = lines.slice(startIndex).join('\n');
            }
        }

        console.log('Cleaned BibTeX content length:', cleanContent.length);
        console.log('Cleaned content preview:', cleanContent.substring(0, 200));

        // 检查内容是否为空
        if (!cleanContent.trim()) {
            console.error('BibTeX content is empty after cleaning');
            return [];
        }

        // 使用 bibtex-parse 库解析
        const bibEntries = bibtexParse.entries(cleanContent);

        console.log('Parsed BibTeX entries:', bibEntries.length);
        console.log('First entry structure:', bibEntries[0]);

        if (!Array.isArray(bibEntries) || bibEntries.length === 0) {
            console.warn('No BibTeX entries found or invalid format');
            return [];
        }

        const publications = bibEntries
            .map((entry, index) => {
                try {
                    return convertBibToPublication(entry);
                } catch (conversionError) {
                    console.error(`Error converting entry ${index}:`, conversionError);
                    console.error('Problematic entry:', entry);
                    return null;
                }
            })
            .filter(pub => pub !== null) // 过滤掉转换失败的条目
            .sort((a, b) => {
                // 按年份降序排列，featured 的排在前面
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return parseInt(b.year) - parseInt(a.year);
            });

        console.log('Generated publications:', publications.length);
        console.log('Publications:', publications);
        return publications;
    } catch (error) {
        console.error('Error parsing BibTeX:', error);
        console.error('Error stack:', error.stack);
        return [];
    }
};