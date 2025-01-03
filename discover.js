const Lifx  = require('node-lifx-lan');
Lifx.discover().then((device_list) => {
    device_list.forEach((device) => {
      console.log([
        device['ip'],
        device['mac'],
        device['deviceInfo']['label']
      ].join(' | '));
    });
  }).catch((error) => {
    console.error(error);
  });