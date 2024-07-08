---
group: 设计模式
type: 原则
order: 10
title: 即时反应
---

「提供邀请」的强大体现在 `交互之前` 给出反馈，解决易发现性问题；「巧用过渡」的有用体现在它能够在 `交互期间` 为用户提供视觉反馈；「即时反应」的重要性体现在 `交互之后` 立即给出反馈。

就像「牛顿第三定律」所描述作用力和反作用一样，用户进行了操作或者内部数据发生了变化，系统就应该立即有一个对应的反馈，同时输入量级越大、重要性越高，那么反馈量级越大、重要性越高。

虽然反馈太多（准确的说，错误的反馈太多）是一个问题，但是反馈太少甚至没有反馈的系统，则让人感觉迟钝和笨拙，用户体验更差。

> **牛顿第三定律** ：当两个物体互相作用时，彼此施加于对方的力，其大小相等、方向相反。——摘自《维基百科》

---

## 查询模式

<ImagePreview>
<img class="preview-img" alt="确定类目示例" description="用户所查询的关键词，只会在「话题」、「问题」、「文章」这 3 种类目中出现。" src="https://gw.alipayobjects.com/zos/rmsportal/czfJRLltwXcsTLlTpytV.png">
</ImagePreview>

<ImagePreview>
<img class="preview-img" alt="不确定类目示例" description="用户所查询的关键词，其所属的类目数量不确定，可能 4 个，可能 5 个，可能更多。" src="https://gw.alipayobjects.com/zos/rmsportal/XlqFYhYiZtWFNImtRElR.png">
</ImagePreview>

自动完成：用户输入时，下拉列表会随着输入的关键词显示匹配项。根据查询结果分类的多少，可以分为「确定类目」、「不确定类目」两种类型。

<br>

<ImagePreview>
<img class="preview-img" alt="实时搜索示例" description="用户输入一个搜索值，系统随即显示查询结果。" src="https://gw.alipayobjects.com/zos/rmsportal/clFLKIWTYfHwIiOCUNbw.png">
</ImagePreview>

实时搜索：随着用户输入，实时显示搜索结果。「自动完成」、「实时建议」的近亲。

<br>

---

## 反馈模式

<ImagePreview>
<img class="preview-img" alt="实时预览示例" description="根据用户的输入，提供关于密码强度和有效性的实时反馈。" src="https://gw.alipayobjects.com/zos/rmsportal/koYsOzKwTcHvjpZULpov.png">
</ImagePreview>

实时预览：在用户提交输入之前，让他先行了解系统将如何处理他的输入。

> 注：解决错误最好的办法，就是不让错误发生。而「实时预览」就是有效避免错误的好设计。

<br>

渐进式展现：在必要的时候提供必要的提示，而不是一股脑儿显示所有提示，导致界面混乱，增加认知负担。案例详见[「足不出户／渐进式展现」](/docs/spec/stay#流程处理)。

<br>

<ImagePreview>
<img class="preview-img" alt="按钮加载示例" src="https://gw.alipayobjects.com/zos/rmsportal/cnAnCxfzSwUJeeXIUOIC.png">
</ImagePreview>

<ImagePreview>
<img class="preview-img" alt="表格加载示例" src="https://gw.alipayobjects.com/zos/rmsportal/agFZSlgdSOyCznCGXGcE.png">
</ImagePreview>

<ImagePreview>
<img class="preview-img" alt="富列表加载示例" src="https://gw.alipayobjects.com/zos/rmsportal/tVzqUunjctTxvSMmhSVv.png">
</ImagePreview>

<ImagePreview>
<img class="preview-img" alt="页面加载示例" src="https://gw.alipayobjects.com/zos/rmsportal/igxFnUdRHWaBXtTePuFf.png">
</ImagePreview>

进度指示：当一个操作需要一定时间完成时，就需要即时告知进度，保持与用户的沟通。常见的进度指示：「按钮加载」、「表格加载」、「富列表加载」、「页面加载」。可根据操作的量级和重要性，展示不同类型的进度指示。

<br>

<ImagePreview>
<img class="preview-img" alt="点击刷新示例" src="https://gw.alipayobjects.com/zos/rmsportal/HTDCbBvlFKwsDwmcgzcw.png">
</ImagePreview>

点击刷新：告知用户有新内容，并提供按钮等工具帮助用户查看新内容。

<br>

<ImagePreview>
<img class="preview-img" alt="定时示例"  description="新增的列表项「高亮」，持续几秒后恢复正常。" src="https://gw.alipayobjects.com/zos/rmsportal/kpUhmRudNWDxNzgUddEp.png">
</ImagePreview>

定时刷新：无需用户介入，定时展示新内容。
