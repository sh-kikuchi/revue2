
## 1. Databaseの設定
### ■ yamlファイルで管理
- application.yml

### ■ Springには起動時に自動で実行されるsqlファイルがある
- schema.sql
- data.sql


## 2. Entityをつくる
- データベースのテーブルを表すクラス
- プロパティにはカラム名
- メソッドはそれぞれのカラムのげったとセッター

```java
package com.example.demo.entity;

import java.time.LocalDateTime;

public class Task {

    private int id;
    private int userId;
    private int typeId;
    private TaskType taskType; //連結
    private String title;
    private String detail;
    private LocalDateTime deadline;
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public TaskType getTaskType() {
		return taskType;
	}
	public void setTaskType(TaskType taskType) {
		this.taskType = taskType;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public LocalDateTime getDeadline() {
		return deadline;
	}
	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}
}
```