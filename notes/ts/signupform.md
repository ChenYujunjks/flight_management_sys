这个问题的根源在于字段的类型定义。虽然两个 `Select` 组件的代码结构看起来相似，但它们绑定的字段类型存在差异，这导致了 `permission` 的 `value` 被解析为 `number` 类型，而 `userType` 的 `value` 被解析为 `string` 类型。

---

### **原因分析**

#### **1. 字段类型定义的差异**

- **`userType` 字段**

  - 在你的 `SignUpFormSchema` 中，`userType` 是 `string` 类型（因为 `SelectItem` 的 `value` 定义为字符串，如 `"customer"`、`"airline-staff"`）。
  - 因此，`field.value` 被解析为 `string` 类型，`<Select>` 组件的 `value` 也是 `string` 类型，类型匹配不会报错。

- **`permission` 字段**
  - 在你的 `SignUpFormSchema` 中，`permission` 是 `number` 类型（可能定义为 `z.number()`）。
  - 而 `SelectItem` 的 `value` 是字符串（`"2"`、`"1"`、`"0"`）。
  - 这导致 `field.value` 被解析为 `number` 类型，而 `Select` 组件期望 `value` 是 `string` 类型，出现了类型不匹配的错误。

---

### **解决方法**

#### **方法 1：将 `permission` 的类型改为 `string`**

如果你的后端逻辑允许 `permission` 作为字符串传递，可以直接将 `SignUpFormSchema` 中的 `permission` 类型定义为 `string`：

```typescript
const SignUpFormSchema = z.object({
  // 其他字段...
  permission: z.string(), // 修改为字符串类型
});
```

在这种情况下，你的 `Select` 代码不需要改动，`field.onChange` 和 `field.value` 类型会自动匹配。

---

#### **方法 2：保持 `permission` 为 `number`，转换 `SelectItem` 的值**

如果你需要 `permission` 保持为 `number` 类型，可以在 `onValueChange` 时将字符串值转换为数字：

```tsx
<Select
  onValueChange={(value) => field.onChange(parseInt(value, 10))} // 将字符串转为数字
  value={String(field.value)} // 将数字转为字符串
>
  <SelectTrigger>
    <SelectValue placeholder="Select permission" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="2">Admin</SelectItem>
    <SelectItem value="1">Operator</SelectItem>
    <SelectItem value="0">None</SelectItem>
  </SelectContent>
</Select>
```

---

#### **方法 3：在 `zod` 验证中自动解析为数字**

如果希望字段在验证时直接转换为数字，可以使用 `z.preprocess`：

```typescript
const SignUpFormSchema = z.object({
  // 其他字段...
  permission: z.preprocess((val) => parseInt(val as string, 10), z.number()), // 自动将字符串转为数字
});
```

然后，在 `Select` 中依然使用字符串作为 `value`，不需要手动转换：

```tsx
<Select onValueChange={field.onChange} value={String(field.value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select permission" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="2">Admin</SelectItem>
    <SelectItem value="1">Operator</SelectItem>
    <SelectItem value="0">None</SelectItem>
  </SelectContent>
</Select>
```

---

### **推荐方案**

- 如果后端需要 `permission` 是 `number` 类型，**推荐方法 2 或方法 3**。
- 如果可以接受字符串类型的 `permission`，直接使用方法 1 改为字符串。

---

### **总结**

`userType` 没有报错是因为它的类型是 `string`，与 `<Select>` 的预期类型一致。而 `permission` 报错是因为它的类型是 `number`，需要进行转换或在 `SignUpFormSchema` 中调整类型来解决这个问题。
