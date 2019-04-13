// //今日头条 每分钟刷新一次
// const toutiao = function scheduleCronstyle() {
//     schedule.scheduleJob('30 * * * * *', function () {
//         try {
//             //今日头条
//             const time = new Date().getTime();
//             const url2 = 'https://www.toutiao.com/api/search/content/?aid=24&app_name=web_search&offset=0&format=json&keyword=%E7%94%B5%E7%AB%9E&autoload=true&count=20&en_qc=1&cur_tab=1&from=search_tab&pd=synthesis&timestamp=%d'
//             var url = util.format(url2, time)
//             request.get(url).end(async (err, res) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 var res_json = JSON.parse(res.text);
//                 var data = res_json.data;
//                 for (var i = 0; i < data.length; i++) {
//                     //去除非新闻内容
//                     if (data[i].title && data[i].id) {
//                         const a = await db.query(
//                             "select * from news where id =?",
//                             data[i].id
//                         );
//                         if (a.length > 0) continue;
//                         else {
//                             var item = [
//                                 data[i].id,
//                                 data[i].title,
//                                 data[i].media_name,
//                                 data[i].datetime,
//                                 "今日头条",
//                                 data[i].article_url
//                             ];
//                             db.query(
//                                 "insert into news (id,title,author,c_date,source,url) values(?,?,?,?,?,?) ",
//                                 item,
//                                 function (err, data) {
//                                     if (err) {
//                                         console.log("数据库错误");
//                                     }
//                                 }
//                             );
//                         }
//                     }
//                 }
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     });
// }