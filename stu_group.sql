/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : stu_group

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 15/04/2019 11:30:26
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
  `c_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date1` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date2` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) DEFAULT '0',
  `description` text,
  `place` varchar(50) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `owner` varchar(30) DEFAULT NULL,
  `owner_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2019110006 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
BEGIN;
INSERT INTO `activity` VALUES (2019110001, 'afdf', '2019-04-13 11:01:46', '2019-04-23 00:00:00', '2019-04-25 00:00:00', 1, 'safsdfsd', 'sdaf', '魔术协会', 'admin(会长)', 2019040001);
INSERT INTO `activity` VALUES (2019110002, '雷锋一条改', '2019-04-13 11:01:49', '2019-04-01 23:02:00', '2019-04-22 00:00:00', 2, 'nffjshkfdjkfhsdkfjhdsfhdsj', '小礼堂', '魔术协会', 'admin(会长)', 2019040001);
INSERT INTO `activity` VALUES (2019110003, '图书馆活动', '2019-04-13 11:01:52', '2019-04-09 00:00:00', '2019-04-11 10:00:00', 1, '旧书收集活动', '图书馆11楼', '魔术协会', 'admin(会长)', 2019040001);
INSERT INTO `activity` VALUES (2019110004, 'test_activity', '2019-04-13 17:37:01', '2019-04-14 00:00:00', '2019-04-20 00:00:00', 0, 'test_description', 'test_place', '魔术协会', 'admin(管理)', 2019040001);
INSERT INTO `activity` VALUES (2019110005, 'test_activity', '2019-04-13 23:07:49', '2019-04-01 00:00:00', '2019-04-13 23:07:39', 0, 'description', 'place', 'test_group', 'test_admin(管理)', 2019040008);
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
  `number` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20190007 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of team
-- ----------------------------
BEGIN;
INSERT INTO `team` VALUES (20190002, '魔术协会', '魔术协会魔术协会魔术协会魔术协会', '2019-04-13 22:01:28', 40, 'admin', 5);
INSERT INTO `team` VALUES (20190003, '数学协会', '数学数学数学', '2019-04-13 22:05:31', 20, 'test_add', 2);
INSERT INTO `team` VALUES (20190004, '计算机协会', '计算机协会欢迎各位计算机技术爱好者加入', '2019-04-13 22:01:48', 30, '许小小', 3);
INSERT INTO `team` VALUES (20190005, 'test_group', 'test_description', '2019-04-13 23:07:19', 30, 'test_admin', 2);
INSERT INTO `team` VALUES (20190006, 'test2', 'description', '2019-04-13 23:19:19', 32, 'test3', 2);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (2019040001, 'admin', '123456', '计算机', '计算机科学', '副会长', 1, 'c7909d22e12265bc78d411e4672b18ae', '魔术协会', '', '男', '2019-04-13 10:21:22');
INSERT INTO `user` VALUES (2019040002, '李四四', '123789', '材料学院', '材料1班', '副副会长', 1, 'c7909d22e12265bc78d411e4672b18ae', '计算机协会', '', '女', '2019-04-13 10:21:37');
INSERT INTO `user` VALUES (2019040004, '李三三', '654321', '新闻学院', '新闻2班', '老师', 2, 'c7909d22e12265bc78d411e4672b18ae', '', '', '男', '2019-04-13 10:21:41');
INSERT INTO `user` VALUES (2019040005, 'sss_temp_edit', '17312344321', 'wujdk', 'jxka', '外援', 0, 'db6da92c8fcc210b8745ce6ef5f8ba65', '魔术协会', '', '男', '2019-04-13 22:47:25');
INSERT INTO `user` VALUES (2019040006, '张三', '13123455432', '计算机', 'hks', '副会长', 0, 'b2b0af5a6411c698400af9b44865981f', '魔术协会', '', '男', '2019-04-13 22:02:41');
INSERT INTO `user` VALUES (2019040008, 'test_admin', NULL, NULL, NULL, '会长', 1, 'b2b0af5a6411c698400af9b44865981f', 'test_group', NULL, NULL, '2019-04-13 23:05:59');
INSERT INTO `user` VALUES (2019040010, '张', '232382342', NULL, NULL, '会长', 1, 'b2b0af5a6411c698400af9b44865981f', '数学协会', '计算机协会', NULL, '2019-04-13 22:11:02');
INSERT INTO `user` VALUES (2019040011, '林小林', '132321', '计算机', '计算机1班', '干事', 0, 'c7909d22e12265bc78d411e4672b18ae', '魔术协会', NULL, '男', '2019-04-13 23:08:39');
INSERT INTO `user` VALUES (2019040012, '许小小', '123456789', NULL, NULL, '会长', 1, 'b2b0af5a6411c698400af9b44865981f', '计算机协会', NULL, NULL, '2019-04-13 22:12:09');
INSERT INTO `user` VALUES (2019040023, 'test', '1234', 'test_college', 'test_class', 'test_position', 0, 'b2b0af5a6411c698400af9b44865981f', '魔术协会', NULL, '男', '2019-04-13 11:00:30');
INSERT INTO `user` VALUES (2019040032, 'test_user', NULL, NULL, NULL, '会长', 0, 'b2b0af5a6411c698400af9b44865981f', '数据', NULL, NULL, '2019-04-13 21:45:53');
INSERT INTO `user` VALUES (2019040042, 'test_add', NULL, NULL, NULL, '会长', 0, 'b2b0af5a6411c698400af9b44865981f', '数学协会', NULL, NULL, '2019-04-13 22:05:31');
INSERT INTO `user` VALUES (2019040076, 'teeeeest', '123', 'test_school', 'cla', 'position', 0, 'b2b0af5a6411c698400af9b44865981f', 'test2', NULL, '男', '2019-04-13 23:19:19');
INSERT INTO `user` VALUES (2019040090, 'test3', '123', 'llalalala', 'kjklj', '会长', 1, 'c7909d22e12265bc78d411e4672b18ae', 'test2', NULL, '男', '2019-04-13 23:29:55');
INSERT INTO `user` VALUES (2019040098, 'test_1', '123456643', 'test_college', 'test_class', 'test', 0, 'b2b0af5a6411c698400af9b44865981f', 'test_group', NULL, '男', '2019-04-13 23:07:19');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
