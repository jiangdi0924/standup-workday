const schedule = require('node-schedule');
const { NotificationCenter } = require('node-notifier');
const path = require('path');

sendNoti(process.argv[2])

function sendNoti(rule) {

  var notifier = new NotificationCenter({
    withFallback: false,
    customPath: undefined
  });

  const job = schedule.scheduleJob(process.argv[2], function () {

    notifier.notify({
      sound: 'Submarine',
      // wait: true,
      title: '⚠️健康警告',
      message: '你该休息一下啦，缓解疲劳',
      icon: path.join(__dirname, 'icon.jpeg'),
      closeLabel: 'CANCEL',
      actions: 'OK',

    },
      function (error, response, metadata) {
        console.log(response, metadata);
      });

  })
}

