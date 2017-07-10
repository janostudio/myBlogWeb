/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `jealand` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `jealand`;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `workorpaper` enum('Y','N') DEFAULT NULL,
  `wpid` int(11) DEFAULT NULL,
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='分类表';

CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `content` text,
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='反馈表';

CREATE TABLE IF NOT EXISTS `history_home_paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workorpaper` enum('Y','N') DEFAULT NULL,
  `wpid` int(11) DEFAULT NULL,
  `readtimes` int(11) DEFAULT NULL,
  `inhomedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页热度文章';

CREATE TABLE IF NOT EXISTS `history_up_wp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workorpaper` enum('Y','N') DEFAULT NULL,
  `wpid` int(11) DEFAULT NULL,
  `uodate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='历史推荐';

CREATE TABLE IF NOT EXISTS `homerate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workorpaper` enum('Y','N') DEFAULT NULL,
  `wpid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页热度文章、作品展示';

CREATE TABLE IF NOT EXISTS `isup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workorpaper` enum('Y','N') DEFAULT NULL,
  `wpid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页推荐文章、作品展示';

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cookie` varchar(256) DEFAULT NULL,
  `method` varchar(256) DEFAULT NULL,
  `host` varchar(50) DEFAULT NULL,
  `port` varchar(50) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `lang` varchar(256) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `deviceX` varchar(50) DEFAULT NULL,
  `deviceY` varchar(50) DEFAULT NULL,
  `screenH` varchar(50) DEFAULT NULL,
  `screenW` varchar(50) DEFAULT NULL,
  `useragent` varchar(512) DEFAULT NULL,
  `visittime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `content` text,
  `readtimes` int(11) DEFAULT '0' COMMENT '阅读次数',
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `coverimg` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='文章';

CREATE TABLE IF NOT EXISTS `papercommit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paperid` int(11) DEFAULT NULL,
  `content` varchar(512) DEFAULT NULL,
  `author` varchar(80) DEFAULT NULL,
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='文章评论表';

CREATE TABLE IF NOT EXISTS `paperimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paperid` int(11) DEFAULT NULL,
  `src` varchar(50) DEFAULT NULL,
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片表';

CREATE TABLE IF NOT EXISTS `work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `content` text,
  `readtimes` int(11) NOT NULL DEFAULT '0',
  `coverimg` varchar(80) DEFAULT NULL COMMENT 'work封面地址',
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='作品';

CREATE TABLE IF NOT EXISTS `workimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workid` int(11) DEFAULT NULL,
  `src` varchar(50) DEFAULT NULL,
  `creattime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='作品图片表';

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
