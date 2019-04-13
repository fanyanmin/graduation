/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : group

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 08/04/2019 16:57:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `c_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date1` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date2` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) DEFAULT '0',
  `description` text,
  `place` varchar(50) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `owner` varchar(30) DEFAULT NULL,
  `owner_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2019110004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
BEGIN;
INSERT INTO `activity` VALUES (2019110000, 'nanananan', '2019-04-07 17:30:35', '2019-03-04 00:00:00', '2019-03-04 00:00:00', 1, '哈哈哈哈哈哈', '思睿广场', '魔术协会', 'admin', 20190401);
INSERT INTO `activity` VALUES (2019110001, 'afdf', '2019-04-07 23:05:26', '2019-04-23 00:00:00', '2019-04-25 00:00:00', 1, 'safsdfsd', 'sdaf', '魔术协会', 'admin(会长)', 20190401);
INSERT INTO `activity` VALUES (2019110002, '雷锋一条改', '2019-04-07 23:05:28', '2019-04-01 23:02:00', '2019-04-22 00:00:00', 2, 'nffjshkfdjkfhsdkfjhdsfhdsj', '小礼堂', '魔术协会', 'admin(会长)', 20190401);
INSERT INTO `activity` VALUES (2019110003, '图书馆活动', '2019-04-08 16:51:48', '2019-04-09 00:00:00', '2019-04-11 10:00:00', 1, '旧书收集活动', '图书馆11楼', '魔术协会', 'admin(会长)', 20190401);
COMMIT;

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text,
  `c_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `size` int(11) DEFAULT NULL,
  `admin` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20190005 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of team
-- ----------------------------
BEGIN;
INSERT INTO `team` VALUES (20190001, '数据', 'balbalabalabala', '2019-04-07 16:54:13', 20, 'admin');
INSERT INTO `team` VALUES (20190002, '魔术协会', '魔术协会魔术协会魔术协会魔术协会', '2019-04-07 16:54:15', 40, 'admin');
INSERT INTO `team` VALUES (20190003, '数学设', '数学数学数学', '2019-04-08 00:19:36', 20, '张');
INSERT INTO `team` VALUES (20190004, '计算机协会', '计算机协会欢迎各位计算机技术爱好者加入', '2019-04-08 16:52:44', 30, '许小小');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `college` varchar(30) DEFAULT NULL,
  `class` varchar(30) DEFAULT NULL,
  `position` varchar(30) DEFAULT NULL,
  `role` int(1) DEFAULT '0',
  `password` varchar(255) DEFAULT NULL,
  `join1` varchar(30) NOT NULL,
  `join2` varchar(30) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `c_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20190413 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (20190401, 'admin', '123456', '计算机', '计算机科学', '副会长', 1, 'c7909d22e12265bc78d411e4672b18ae', '魔术协会', '', '男', '2019-04-08 16:45:05');
INSERT INTO `user` VALUES (20190402, '李四四', '123789', '材料学院', '材料1班', '副副会长', 1, 'c7909d22e12265bc78d411e4672b18ae', '计算机协会', '', '女', '2019-04-08 16:46:18');
INSERT INTO `user` VALUES (20190404, '李三三', '654321', '新闻学院', '新闻2班', '老师', 2, 'c7909d22e12265bc78d411e4672b18ae', '', '', '男', '2019-04-08 16:45:15');
INSERT INTO `user` VALUES (20190405, 'sss', '17312344321', 'wujdk', 'jxka', '外援', 0, 'c7909d22e12265bc78d411e4672b18ae', '魔术协会', '足球协会', '女 ', '2019-04-08 16:45:22');
INSERT INTO `user` VALUES (20190406, '张三', '13123455432', '计算机', 'hks', '副会长', 0, 'b2b0af5a6411c698400af9b44865981f', '魔术协会', '志愿者协会', '男', '2019-04-08 16:49:58');
INSERT INTO `user` VALUES (20190410, '张', '232382342', NULL, NULL, '会长', 0, 'b2b0af5a6411c698400af9b44865981f', '数学协会', '计算机协会', NULL, '2019-04-08 16:46:06');
INSERT INTO `user` VALUES (20190411, '林小林', '132321', '计算机', '计算机1班', '干事', 0, 'b2b0af5a6411c698400af9b44865981f', '魔术协会', NULL, '男', '2019-04-08 16:50:35');
INSERT INTO `user` VALUES (20190412, '许小小', '123456789', NULL, NULL, '会长', 0, 'b2b0af5a6411c698400af9b44865981f', '计算机协会', NULL, NULL, '2019-04-08 16:52:44');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
