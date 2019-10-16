const remote = require('scp2');
console.log(`upload ....`);
remote.scp('dist/static', {
  host: '172.18.8.184',
  username: 'root',
  password: 'rondaful',
  path: '/node-www/crawler-client/dist/static'
}, function (err) {
  if(err){
    console.error(err);
    process.exit(1);
  }
  remote.scp('dist/index.html',{
    host: '172.18.8.184',
    username: 'root',
    password: 'rondaful',
    path: '/node-www/crawler-client/dist'
  },function(err){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(`remote upload finish...`);
  })
});
