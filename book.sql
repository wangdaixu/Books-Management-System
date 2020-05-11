/*
Navicat MySQL Data Transfer

Source Server         : 前端0930
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : book

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2020-04-23 12:11:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(16) DEFAULT NULL,
  `book_author` varchar(16) DEFAULT NULL,
  `book_pub` varchar(16) DEFAULT NULL,
  `book_sort_id` int(11) DEFAULT NULL,
  `book_record` date DEFAULT NULL,
  `is_on` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '《醉酒的植物学家——创造了世界名', '艾米·斯图尔特', '商务印书馆', '1', '2019-04-23', '0');
INSERT INTO `book` VALUES ('2', '《探寻自然的秩序——从林奈到E.', '美)保罗·劳伦斯·法伯', '商务印书馆', '1', '2019-05-23', '0');
INSERT INTO `book` VALUES ('3', '《羽毛》', '格兰特•艾伦', '商务印书馆', '1', null, '1');
INSERT INTO `book` VALUES ('4', '《可装裱的中国博物艺术》', '朱迪斯·玛吉', '商务印书馆', '1', '2020-04-23', '0');
INSERT INTO `book` VALUES ('5', '《天堂鸟》', '黛安娜·阿布杰比', '四川文艺出版社', '1', '2020-01-23', '0');
INSERT INTO `book` VALUES ('6', '《理想国》', '柏拉图', '广西师范大学出版社', '2', '2019-03-23', '0');
INSERT INTO `book` VALUES ('7', '《温故》', ' 刘瑞琳', '广西师范大学出版社', '3', '2019-04-23', '0');
INSERT INTO `book` VALUES ('8', '《读库》', '张立宪', '同心出版社', '3', null, '1');
INSERT INTO `book` VALUES ('9', '《论语译注》', '杨伯峻', '中华书局', '3', '2019-04-23', '0');
INSERT INTO `book` VALUES ('10', '《给孩子100本最棒的书》', '(美)安妮塔•西尔维', '湖南少年儿童出版社', '4', null, '1');
INSERT INTO `book` VALUES ('11', '《新工具》', '培根', '商务印书馆', '2', null, '1');
INSERT INTO `book` VALUES ('12', '《政府论》', '洛克', '中华书局', '2', null, '1');
INSERT INTO `book` VALUES ('13', '《论法的精神》', '孟德斯鸠', '同心出版社', '2', null, '1');
INSERT INTO `book` VALUES ('14', '《社会契约论》', '卢梭', '商务印书馆', '2', '2020-02-23', '0');
INSERT INTO `book` VALUES ('15', '《常识》', '潘恩', '同心出版社', '2', null, '1');
INSERT INTO `book` VALUES ('16', '《战争论》', '克劳塞维茨', '商务印书馆', '2', null, '1');
INSERT INTO `book` VALUES ('17', '《追风筝的人》', '[美] 卡勒德·胡赛尼', '上海人民出版社', '3', null, '1');
INSERT INTO `book` VALUES ('18', '《解忧杂货店》', '日] 东野圭吾', '南海出版社', '3', null, '1');
INSERT INTO `book` VALUES ('19', '《小王子》', ' [法] 圣埃克苏佩里', ' 人民出版社', '3', '2020-01-23', '0');
INSERT INTO `book` VALUES ('20', '《白夜行》', ' [日] 东野圭吾', '南海出版社', '3', '2020-01-12', '0');
INSERT INTO `book` VALUES ('21', '《围城》', '銭锺书', '商务印书馆', '3', '2019-04-23', '0');
INSERT INTO `book` VALUES ('22', '《三体Ⅰ》', '刘慈欣', '四川科学技术出版社', '3', '2019-02-20', '0');
INSERT INTO `book` VALUES ('23', '《嫌疑人X的献身》', ' [日] 东野圭吾', '南海出版社', '3', null, '0');
INSERT INTO `book` VALUES ('24', '《挪威的森林》', ' [日] 村上春树', '上海译文出版社', '3', '2019-08-23', '0');
INSERT INTO `book` VALUES ('25', '《活着》', '余华', '作家出版社', '3', '2019-11-23', '0');
INSERT INTO `book` VALUES ('26', '《草房子》', '曹文轩', '江苏少年儿童出版社', '4', '2019-12-23', '0');

-- ----------------------------
-- Table structure for book_sort
-- ----------------------------
DROP TABLE IF EXISTS `book_sort`;
CREATE TABLE `book_sort` (
  `sort_id` int(11) NOT NULL AUTO_INCREMENT,
  `sort_name` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`sort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_sort
-- ----------------------------
INSERT INTO `book_sort` VALUES ('1', '博物自然');
INSERT INTO `book_sort` VALUES ('2', '政治历史');
INSERT INTO `book_sort` VALUES ('3', '文学经典');
INSERT INTO `book_sort` VALUES ('4', '儿童文学');

-- ----------------------------
-- Table structure for borrow
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow` (
  `student_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT,
  `borrow_date` date DEFAULT NULL,
  `expect_return_date` date DEFAULT NULL,
  PRIMARY KEY (`borrow_id`),
  KEY `student_id` (`student_id`),
  KEY `borrow_ibfk_2` (`book_id`),
  CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`),
  CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES ('2018080371', '4', '1', '2020-01-12', '2020-05-12');
INSERT INTO `borrow` VALUES ('2018080378', '1', '2', '2020-02-12', '2020-06-12');
INSERT INTO `borrow` VALUES ('2018080381', '6', '3', '2020-01-12', '2020-05-12');
INSERT INTO `borrow` VALUES ('2018080387', '7', '4', '2020-01-12', '2020-05-12');
INSERT INTO `borrow` VALUES ('2018080371', '9', '5', '2020-01-12', '2020-05-12');
INSERT INTO `borrow` VALUES ('2018080189', '10', '24', '2020-01-12', '2020-04-21');

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `manager_id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(16) DEFAULT NULL,
  `manager_age` varchar(16) DEFAULT NULL,
  `manager_phone` varchar(16) DEFAULT NULL,
  `manager_book_id` int(11) DEFAULT NULL,
  `manager_zh` varchar(16) DEFAULT NULL,
  `manager_ma` varchar(16) DEFAULT NULL,
  `manager_time` date DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `manager_phone` (`manager_phone`),
  UNIQUE KEY `manager_zh` (`manager_zh`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('1', '王大大', '39', '19087654367', '1', '123456', 'wdd123456', '2018-09-10');
INSERT INTO `manager` VALUES ('2', '王小小', '41', '1876543267', '2', '234567', 'wxx234567', '2018-07-10');
INSERT INTO `manager` VALUES ('3', '李子子', '28', '18858007077', '3', '345678', 'lzz345678', '2019-09-10');
INSERT INTO `manager` VALUES ('4', '朱天天', '25', '13767877178', '4', '456789', 'ztt456789', '2018-10-10');
INSERT INTO `manager` VALUES ('13', null, '18', '13858707362', '3', 'daixu', '123456', '2020-04-22');

-- ----------------------------
-- Table structure for return_table
-- ----------------------------
DROP TABLE IF EXISTS `return_table`;
CREATE TABLE `return_table` (
  `student_id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `borrow_id` int(11) DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  KEY `student_id` (`student_id`),
  KEY `book_id` (`book_id`),
  KEY `return_table_ibfk_3` (`borrow_id`),
  CONSTRAINT `return_table_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`),
  CONSTRAINT `return_table_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `return_table_ibfk_3` FOREIGN KEY (`borrow_id`) REFERENCES `borrow` (`borrow_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of return_table
-- ----------------------------
INSERT INTO `return_table` VALUES ('2018080371', '4', '1', '2020-05-24');
INSERT INTO `return_table` VALUES ('2018080378', '1', '2', '2020-06-22');
INSERT INTO `return_table` VALUES ('2018080373', '9', '5', '2020-05-17');
INSERT INTO `return_table` VALUES ('2018080387', '7', '4', '2020-01-01');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(32) DEFAULT NULL,
  `stu_sex` varchar(32) DEFAULT '1',
  `stu_age` int(11) DEFAULT NULL,
  `stu_pro` varchar(64) DEFAULT NULL,
  `stu_grade` varchar(128) DEFAULT NULL,
  `stu_integrity` int(11) DEFAULT '1',
  `stu_ma` varchar(32) DEFAULT '123456',
  PRIMARY KEY (`stu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483647 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('2018080189', 'daixu', '女', '19', '移动应用开发', '18级', '1', '321654');
INSERT INTO `students` VALUES ('2018080371', '李楚璇', '0', '20', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080372', '朱天伦', '0', '20', '移动应用开发', '19级', null, null);
INSERT INTO `students` VALUES ('2018080373', '王建炜', '0', '21', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080374', '冯驰煜', '0', '20', '移动应用开发', '20级', null, null);
INSERT INTO `students` VALUES ('2018080375', '王意', '0', '19', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080376', '朱创文', '0', '18', '移动应用开发', '20级', null, null);
INSERT INTO `students` VALUES ('2018080377', '陈磊', '0', '19', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080378', '王磊', '0', '22', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080379', '何洁', '0', '21', '信息管理', '18级', null, null);
INSERT INTO `students` VALUES ('2018080380', '王颖', '0', '20', '信息管理', '20级', null, null);
INSERT INTO `students` VALUES ('2018080381', '金斌', '0', '20', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080382', '张晋辉', '0', '20', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080383', '张妮可', '0', '21', '信息管理', '19级', null, null);
INSERT INTO `students` VALUES ('2018080384', '邱龙涛', '0', '21', '信息管理', '18级', null, null);
INSERT INTO `students` VALUES ('2018080385', '章国阳', '0', '21', '移动应用开发', '19级', null, null);
INSERT INTO `students` VALUES ('2018080386', '方飞铖', '0', '20', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080387', '方飞铖', '0', '20', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080388', '赵双一', '0', '20', '信息管理', '19级', null, null);
INSERT INTO `students` VALUES ('2018080389', '汪可', '0', '20', '信息管理', '18级', null, null);
INSERT INTO `students` VALUES ('2018080390', '方佳晨', '0', '21', '移动应用开发', '20级', null, null);
INSERT INTO `students` VALUES ('2018080391', '葛科炜', '0', '21', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080392', '谢雨', '0', '21', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080393', '吕依莉', '0', '21', '移动应用开发', '20级', null, null);
INSERT INTO `students` VALUES ('2018080394', '罗智伟', '0', '20', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080395', '邵加煊', '0', '21', '移动应用开发', '19级', null, null);
INSERT INTO `students` VALUES ('2018080396', '叶凡', '0', '21', '动漫设计', '20级', null, null);
INSERT INTO `students` VALUES ('2018080397', '施畅', '0', '21', '移动应用开发', '20级', null, null);
INSERT INTO `students` VALUES ('2018080398', '卫晓雯', '0', '21', '移动应用开发', '19级', null, null);
INSERT INTO `students` VALUES ('2018080399', '赵晨淞', '0', '21', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080400', '励诗磊', '0', '20', '移动应用开发', '18级', null, null);
INSERT INTO `students` VALUES ('2018080401', '童诗琴', '0', '21', '数字媒体', '18级', null, null);
INSERT INTO `students` VALUES ('2018080402', '吴潇翔', '0', '20', '动漫设计', '18级', null, null);
INSERT INTO `students` VALUES ('2018080403', '郑小倩', '0', '21', '移动应用开发', '18级', null, null);

-- ----------------------------
-- Table structure for ticket
-- ----------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `student_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `over_date` int(11) DEFAULT NULL,
  `ticket_price` int(11) DEFAULT NULL,
  KEY `student_id` (`student_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ticket
-- ----------------------------
INSERT INTO `ticket` VALUES ('2018080371', '4', '12', '2');
INSERT INTO `ticket` VALUES ('2018080378', '1', '10', '2');
INSERT INTO `ticket` VALUES ('2018080373', '9', '5', '1');
