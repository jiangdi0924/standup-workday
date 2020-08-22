#!/usr/bin/env node
const { exec, spawn } = require('child_process');
const { exit } = require('process');
const program = require('commander');
var fs = require('fs');
const kill = require('tree-kill');
const path = require('path');

const log_file = path.join(__dirname, 'log.txt')

const stop = program.command('stop');
stop.action(() => {
  let pids = fs.readFileSync(log_file).toString().trim()
  if (pids.length != 0) {
    pids.split('\n').forEach(function (pid) {
      if (pid.length > 0) {
        kill(pid)
        fs.writeFile(log_file, '', function () { })
      }
    })
    console.log('⏰提醒已经关闭')
  } else {
    console.log("⚠️没有发现任何计划")
  }

})


const start = program.command('start')

start.requiredOption('-r, --rule <type>', '填写一个消息提醒规则例如： */30 * * * * *')
  .action(function (options) {
    try {
      let child = spawn('node', [path.join(__dirname, 'task.js'), options.rule])
      // child.stdout.on('data', (data) => {
      //   console.log(`stdout: ${data}`);
      // });

      // child.stderr.on('data', (data) => {
      //   console.error(`stderr: ${data}`);
      // });

      // child.on('close', (code) => {
      //   console.log(`子进程退出，退出码 ${code}`);
      // });
      fs.open(log_file, 'a+', function (err, fd) {
        fs.write(fd, child.pid + "\n", function () { });
        exit();
      });
      console.log(`✅任务创建成功,执行频率${options.rule}`);
    } catch (e) {
      console.error('spawn ERROR !!');
      console.error(e);
    }
  })


program.parse(process.argv);


// if (program.rule !== undefined) {
//   console.log(program.rule);
// }
// if (program.float !== undefined) console.log(`float: ${program.float}`);



// console.log(process.argv);