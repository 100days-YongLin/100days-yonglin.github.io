# 内容管理指南

## 📁 文件结构说明

```
content/
├── personal.md      # 个人信息配置
├── experience.md    # 工作经历与研究经验
├── publications.md  # 学术论文与研究成果
├── news.md         # 最新动态与学术里程碑
└── README.md       # 本文件 - 内容管理指南
```

## 📝 编辑指南

### 1. 个人信息 (personal.md)

**包含内容：**
- 基本信息（姓名、职位、联系方式）
- 社交媒体链接
- 个人简介
- 技能领域
- 统计数据

**编辑方法：**
- 修改YAML格式的配置信息
- 更新Markdown格式的个人简介
- 添加或删除技能项目
- 更新统计数字

### 2. 工作经历 (experience.md)

**包含内容：**
- 研究职位
- 工作经历
- 实习经验
- 项目经历

**编辑方法：**
- 每个经历使用独立的YAML配置块
- 按时间倒序排列（最新的在前）
- 包含详细的工作内容和成果描述

**YAML字段说明：**
```yaml
organization: "机构名称"
position: "职位名称"
period: "时间段"
location: "地点"
supervisor: "导师/上级"
type: "类型 (education/research/internship/undergraduate_research)"
status: "状态 (current/completed)"
```

### 3. 学术论文 (publications.md)

**包含内容：**
- 期刊论文
- 会议论文
- 工作论文（审稿中）
- 专利申请

**编辑方法：**
- 按发表时间倒序排列
- 使用标准的学术引用格式
- 包含完整的作者信息和发表信息

**YAML字段说明：**
```yaml
title: "论文标题"
authors: ["作者1", "作者2", "作者3"]
journal/conference: "期刊或会议名称"
year: 发表年份
type: "类型 (journal/conference/patent)"
status: "状态 (published/accepted/under_review)"
```

### 4. 最新动态 (news.md)

**包含内容：**
- 学术成就
- 获奖信息
- 会议参与
- 项目进展
- 其他重要事件

**编辑方法：**
- 按时间倒序排列（最新的在前）
- 每个事件包含简短描述
- 使用合适的图标表示事件类型

**YAML字段说明：**
```yaml
date: "YYYY-MM-DD"
title: "事件标题"
type: "类型 (publication/award/conference/research/education/service/outreach)"
location: "地点"
icon: "图标名称 (FiAward/FiBookOpen/FiGlobe/FiStar等)"
```

## 🎨 图标使用指南

### 常用图标类型：
- `FiAward` - 奖项、荣誉
- `FiBookOpen` - 学术、研究、教育
- `FiGlobe` - 国际会议、全球性事件
- `FiStar` - 重要成就、里程碑
- `FiUsers` - 团队合作、用户研究
- `FiHeart` - 公益活动、社区服务
- `FiEdit` - 编辑、审稿工作
- `FiTrendingUp` - 进展、提升

### 技能图标：
- `FiCpu` - AI、机器学习
- `FiCode` - 编程、开发
- `FiDatabase` - 数据分析
- `FiGlobe` - 网络、全球化

## 📋 内容更新流程

### 1. 添加新内容
1. 打开对应的Markdown文件
2. 按照现有格式添加新条目
3. 确保YAML格式正确
4. 保存文件

### 2. 修改现有内容
1. 找到需要修改的条目
2. 直接编辑文本内容
3. 保存文件

### 3. 删除内容
1. 找到需要删除的条目
2. 删除整个条目块（包括YAML和描述）
3. 保存文件

## ⚠️ 注意事项

### 格式要求：
- 严格遵循YAML语法规范
- 日期格式统一使用 `YYYY-MM-DD`
- 引号内的文本可以包含中英文
- 列表项使用 `-` 开头

### 内容建议：
- 保持内容的真实性和准确性
- 定期更新最新动态
- 使用清晰、专业的语言描述
- 适当使用关键词提升SEO效果

### 技术细节：
- 文件编码使用UTF-8
- 换行符使用LF（Unix格式）
- 避免使用特殊字符作为文件名

## 🔄 自动更新

当您修改这些Markdown文件后，网站会自动读取最新内容并更新显示。无需重新编译或部署，只需刷新浏览器即可看到更改。

## 📞 技术支持

如果在编辑过程中遇到问题，可以：
1. 检查YAML语法是否正确
2. 确认文件编码为UTF-8
3. 查看浏览器控制台是否有错误信息
4. 参考现有条目的格式进行编辑