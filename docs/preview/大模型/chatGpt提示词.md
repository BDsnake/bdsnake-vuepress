---
title: chatGpt提示词
createTime: 2024/10/28 16:11:24
permalink: /article/js76vwm8/
---



# 1 Chatgpt提示词
## 1.1 需求

1. 做什么: 帮助用户快速理解问题, 定位问题, 找到负责产品/开发
2. 谁来用: 和客户沟通的人
3. 需要输入：
   1. 客户和我们交流的原文：tg/slack/email/飞书
   2. 人工预分类: 需求/BUG/问题/商务/其他 + 模块/功能 (可能需要, 具体看测试情况)
4. 需要输出：
   1. 问题翻译成中文
   2. 问题分类, 可能的回答和负责人
   3. 参考资料：prd/开发文档/飞书项目
   4. 优化：自动建飞书任务
   5. 优化2: 分析

## 1.2 提示词原则

1. **指定自身角色** 产品经理、研发人员
2. **指定对话风格或受众（对方角色）** 写作的语气往往会根据受众对象而有所调整。例如，对于工作邮件，我们常常需要使用正式语气与书面用词，而对同龄朋友的微信聊天，可能更多地会使用轻松、口语化的语气。根据不同场景应加入提示词， eg:  “用书面用词\口语化的语气构建对话” “我正在与公司服务的客户进行沟通，请在此场景下构建对话”
3. **指定目标或需求** 希望chatgpt作出哪种类型的回答(对应选项中的问题类型)：回答问题、制定计划…… 可与人工预分类的类型相关 希望chatgpt作出哪方面的回答：质量、价格……
4. **指定回答问题的格式** 对于某些常见的问题回答格式，可以在提示词中指定或给出例子 eg： 需求中需要把问题翻译为中文，提示词中应加入“如果三重反引号中的问题内容为英文，则先把问题翻译为中文之后再作回答” 如果需要分条回答问题，可向模型提供模板/例文
5. **控制生成长度** 避免模型生成冗长的回答，如果需要精炼或直接的回应可以加入对回答长度的限制 eg：总结型问题：提示词中应加入“用x句话总结三重反引号中的内容”
6. **设置合适的温度参数Temperature** 如果问题是开放性的，需要创新性的回答，可以将Temperature参数调高，使回答更具有 如果问题是确定性的，需要保守的回答，可以将Temperature参数调低，以获得更精确更保守的回答

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/16908803245851.png)

1. **添加上下文信息（额外背景信息）** 尤其是长文本 将必要的上下文信息包含在提示词中(尤其是专业术语)以帮助模型更好的理解与回应
2. **多轮对话** 在多轮对话中，使用前一个回答作为当前对话的提示词，以确保模型能够理解上下文并提供连贯的回答。
3. **识别客户情感？** 如果是与客户的对话，是否可以加入提示词，给出任务来分析客户的情感(限定GPT从几个词中回答，如：开心、平静、愤怒、悲伤、焦急)，并规定将情感值返回到json中的某个字段

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/16908803277824.png)

1. **找到可能的问题****负责人** 指定负责人的角色，如产品、开发等，在提示词中加入：“分析三重反引号中的内容，从以下负责人**角色**列表{xxx,xxx,xxx,xxx}中找到最有可能的负责人，并将其加入返回json中的xxx字段” 如果需要具体到某个人，是否可以先学习公司内部的负责情况？

## 1.3 实现

### 1.3.1 langchain promt构建

以变量的方式传入用户信息构建prompt

定义模板内容

```Python
# 模版内容
template = "根据用户输入内容,发现并总结用户的问题，如果用户的问题为英文，则先把问题翻译为中文再回答。回答问题时请用中文回答 {format_instructions}，" \
           "其中提问者的角色为{askRole}，回答者的角色为{ansRole}。用户输入:'''{value}'''" \
           "在回答完毕问题后，分析提出问题的用户的情绪,给出用户情绪的关键词(中文),如：困惑,愤怒,平静,兴奋"
# 构建提示模版
prompt = PromptTemplate(
    input_variables=["value","askRole","ansRole"],
    partial_variables={"format_instructions": format_instructions},
    template=template
)
```

设置填充变量

```Python
# 用户输入内容
value="Hi Team, I am trying to search performance analysis of a account per underlying. The pnl anslysis shows data of all coins in the account. Where can i find the performance,pnl per underlying per account?"
# 用户角色
askRole="客户"
ansRole="产品经理"
# 生成完整输入
final_prompt = prompt.format(value=value,askRole=askRole,ansRole=ansRole)
```

完整demo示例：

```Python
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate
from langchain.llms import OpenAI
import os


llm = OpenAI(temperature=0.7,
             model_name='gpt-3.5-turbo',
    openai_api_key='sk-FaxZMZFtX7Uc5QjNPP8Jc/o9KZdKwGQ5VjZSHlC501VYAQAA',
    openai_api_base='https://api.app4gpt.com/v1')
# 定义结构
response_schemas = [
    ResponseSchema(name="question", description="用户问题"),
    ResponseSchema(name="question_trans", description="用户问题翻译"),
    ResponseSchema(name="answer", description="解决方案"),
    ResponseSchema(name="emotion", description="用户情绪")
]
# 解析输出结构
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()
# 模版内容
template = "根据用户输入内容,发现并总结用户的问题，如果用户的问题为英文，则先把问题翻译为中文再回答。回答问题时请用中文回答 {format_instructions}，" \
           "其中提问者的角色为{askRole}，回答者的角色为{ansRole}。用户输入:'''{value}'''" \
           "在回答完毕问题后，分析提出问题的用户的情绪,给出用户情绪的关键词(中文),如：困惑,愤怒,平静,兴奋"
# 构建提示模版
prompt = PromptTemplate(
    input_variables=["value","askRole","ansRole"],
    partial_variables={"format_instructions": format_instructions},
    template=template
)

# 用户输入内容
value="Hi Team, I am trying to search performance analysis of a account per underlying. The pnl anslysis shows data of all coins in the account. Where can i find the performance,pnl per underlying per account?"
# 用户角色
askRole="客户"
ansRole="产品经理"
# 生成完整输入
final_prompt = prompt.format(value=value,askRole=askRole,ansRole=ansRole)
print("输入内容：:", final_prompt)
print("LLM输出:", llm(final_prompt))
```

输出结果示例：

~~~Python
输入内容：: 根据用户输入内容,发现并总结用户的问题，如果用户的问题为英文，则先把问题翻译为中文再回答。回答问题时请用中文回答 The output should be a markdown code snippet formatted in the following schema, including the leading and trailing "```json" and "```":

```json
{
        "question": string  // 用户问题
        "question_trans": string  // 用户问题翻译
        "answer": string  // 解决方案
        "emotion": string  // 用户情绪
}
```，其中提问者的角色为客户，回答者的角色为产品经理。用户输入:'''Hi Team, I am trying to search performance analysis of a account per underlying. The pnl anslysis shows data of all coins in the account. Where can i find the performance,pnl per underlying per account?'''在回答完毕问题后，分析提出问题的用户的情绪,给出用户情绪的关键词(中文),如：困惑,愤怒,平静,兴奋
LLM输出: ```json
{
        "question": "Hi Team, I am trying to search performance analysis of a account per underlying. The pnl anslysis shows data of all coins in the account. Where can i find the performance,pnl per underlying per account?",
        "question_trans": "团队您好，我正在尝试按底层资产搜索账户的绩效分析。盈亏分析显示的是账户中所有币种的数据。我在哪里可以找到按底层资产和账户的绩效、盈亏分析？",
        "answer": "您可以在账户报表中找到按底层资产和账户的绩效、盈亏分析。该报表会提供详细的数据和图表，帮助您了解每个底层资产在账户中的表现和盈亏情况。",
        "emotion": "困惑"
}
```

Process finished with exit code 0
~~~

## 1.4 参考

### 1.4.1 ChatGpt提示工程

https://zhuanlan.zhihu.com/p/632561822

# 1.4.2 ChatGpt

https://chat.openai.com/share/e39a3390-4311-4824-bfef-ac35d39c5d09

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/16908803374867.png)

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/169088034406410.png)

https://blog.csdn.net/weixin_42608414/article/details/129774329