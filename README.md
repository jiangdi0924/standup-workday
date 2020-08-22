## 工作日定时离开座位的健康提醒计划beta⏰


### 暂时支持的平台
* macOS
### 安装
``` cmd
$ npm i standup-workday -g
```

### 设置定时提醒计划（可设置多个计划）
``` cmd
$ up start -r "*/20 * * * * *"
```

### 关闭任务
``` cmd
$ up stop
```

### TODO

- [ ] 自定义提醒消息内容
- [ ] 任务监控 