### **为什么 `innerJoin` 解决了 `data` 为 `null` 的问题？**

#### **1. 数据表的关系问题**

当你使用 `rightJoin` 时，查询结果会保留 `ticket` 表中的所有记录，即使 `flight` 表中没有对应的记录。这种情况下，如果某些 `ticket` 的 `flightNum` 在 `flight` 表中不存在，查询结果会包含这些记录，并将 `flight` 表的字段填充为 `null`。

但 `FlightsTable` 的数据结构（列定义）中要求某些字段（如 `flightNum`）是非 `null` 的。如果查询结果中存在 `null` 值，就会导致组件渲染或类型检查的问题。

使用 `innerJoin`，只会返回 `ticket` 和 `flight` 表中有匹配记录的行，这样确保了结果中所有字段都有值，不会有 `null` 的情况。因此，`innerJoin` 消除了因 `null` 值导致的问题。

---

### **`innerJoin` 和 `rightJoin` 的业务逻辑区别**

#### **1. `innerJoin`**

- **返回匹配的记录**：`innerJoin` 只会返回 `ticket` 和 `flight` 表中 `flightNum` 相等的记录。
- **数据范围更小**：查询结果会严格受 `on` 条件限制，仅包含两张表中都有匹配的行。
- **适用场景**：当你需要确保每条记录在两张表中都有对应关系时，使用 `innerJoin`。

在你的业务逻辑中，`innerJoin` 的行为是：

- **只返回用户已经购票的航班记录**。
- 如果用户的某些票对应的航班记录缺失，这些票不会出现在结果中。

#### **2. `rightJoin`**

- **返回右表的所有记录**：`rightJoin` 会保留 `ticket` 表中的所有记录，无论是否在 `flight` 表中有匹配的行。
- **数据范围更大**：查询结果可能包含 `flight` 表的字段为 `null` 的行。
- **适用场景**：当你需要保留 `ticket` 表的完整信息，同时可能存在缺少 `flight` 表信息的记录时，使用 `rightJoin`。

在你的业务逻辑中，`rightJoin` 的行为是：

- **显示所有用户的票，无论这些票是否有匹配的航班记录**。
- 如果某些票的航班记录不存在，结果中会显示这些票，但航班的相关字段（如 `flightNum`、`departureTime` 等）为 `null`。

---

### **具体的业务影响**

#### **使用 `innerJoin` 的业务逻辑**

- 只展示用户已购票且航班信息存在的记录。
- 数据准确性更高，适用于需要完整航班信息的场景，比如展示即将到来的航班列表。

#### **使用 `rightJoin` 的业务逻辑**

- 展示用户所有购票记录，包括那些航班信息缺失的记录。
- 数据范围更宽，但可能需要处理 `null` 值，例如显示“航班信息缺失”之类的占位信息。
- 适用于需要全面了解用户购票记录的场景，比如系统调试或用户投诉时查看完整记录。

---

### **总结**

你选择使用 `innerJoin` 是因为它确保了结果数据的完整性和一致性，避免了 `null` 值的问题。而 `rightJoin` 会包含更多信息，但需要额外处理可能的 `null` 值。

根据你的业务逻辑：

- 如果只想展示有效的航班信息，`innerJoin` 是更合适的选择。
- 如果需要保留用户的所有购票记录，包括可能缺失的航班信息，`rightJoin` 更合适，但需要进一步处理。