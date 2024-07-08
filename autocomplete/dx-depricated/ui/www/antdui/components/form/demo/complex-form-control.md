## zh-CN

这里演示 `Form.Item` 内有多个元素的使用方式。`<Form.Item name="field" />` 只会对它的直接子元素绑定表单功能，例如直接包裹了 Input/Select。如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 `Form.Item` 完成。你可以给 `Form.Item` 自定义 `style` 进行内联布局，或者添加 `noStyle` 作为纯粹的无样式绑定组件（类似 3.x 中的 `getFieldDecorator`）。

```diff
- <Form.Item label="Field" name="field">
-   <Input />
- </Form.Item>
+ <Form.Item label="Field">
+   <Form.Item name="field" noStyle><Input /></Form.Item> // 直接包裹才会绑定表单
+   <span>description</span>
+ </Form.Item>
```

这里展示了三种典型场景：

- `Username`：输入框后面有描述文案或其他组件，在 `Form.Item` 内使用 `<Form.Item name="field" noStyle />` 去绑定对应子控件。
- `Address`：有两个控件，在 `Form.Item` 内使用两个 `<Form.Item name="field" noStyle />` 分别绑定对应控件。
- `BirthDate`：有两个内联控件，错误信息展示各自控件下，使用两个 `<Form.Item name="field" />` 分别绑定对应控件，并修改 `style` 使其内联布局。

> 注意，在 label 对应的 Form.Item 上不要在指定 `name` 属性，这个 Item 只作为布局作用。

更复杂的封装复用方式可以参考下面的 `自定义表单控件` 演示。

## en-US

This demo shows how to use `Form.Item` with multiple controls. `<Form.Item name="field" />` will only bind the control(Input/Select) which is the only children of it. Imagine this case: you added some text description after the Input, then you have to wrap the Input by an extra `<Form.Item name="field">`. `style` property of `Form.Item` could be useful to modify the nested form item layout, or use `<Form.Item noStyle />` to turn it into a pure form-binded component(like `getFieldDecorator` in 3.x).

```diff
- <Form.Item label="Field" name="field">
-   <Input />
- </Form.Item>
+ <Form.Item label="Field">
+   <Form.Item name="field" noStyle><Input /></Form.Item> // that will bind input
+   <span>description</span>
+ </Form.Item>
```

This demo shows three typical usages:

- `Username`: extra elements after control, using `<Form.Item name="field" noStyle />` inside `Form.Item` to bind Input.
- `Address`: two controls in one line, using two `<Form.Item name="field" noStyle />` to bind each control.
- `BirthDate`：two controls in one line with independent error message, using two `<Form.Item name="field" noStyle />` to bind each control, make layout inline by customizing `style` property.

> Note that, in this case, no more `name` property should be left in Form.Item with label.

See the `Customized Form Controls` demo below for more advanced usage.
