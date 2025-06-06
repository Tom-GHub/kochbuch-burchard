/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fi37_burchard_fpadw
-- ------------------------------------------------------
-- Server version	10.11.13-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `fi37_burchard_fpadw`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fi37_burchard_fpadw` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `fi37_burchard_fpadw`;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `published` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES
(10,16,'Bananen','Banane','Schälen','69b66f6e8e8e09d4b0955d82e53886aa','2025-06-02 10:23:17',1),
(16,5,'Pfannkuchen','Eier\r\nMehl\r\nMilch\r\nZucker','Vermischen und braten.','1c99cc8fec0f1f17eb97733efb233ab7','2025-06-02 14:28:00',1),
(17,16,'Bananen-Pfannkuchen','Eier\r\nMehl\r\nMilch\r\nBananen','Zutaten vermischen und in der Pfanne backen.','887c3d435742812b70bc49725dcc65b2','2025-06-03 11:38:18',1),
(18,16,'Bananen-Shake','Vanilleeis\r\nMilch\r\nBananen','Zutatenin einen Mixer geben und anschließend kalt stellen.','d7976370f8f300cfa155e33e0dc82998','2025-06-03 11:39:56',1),
(19,5,'Chilli Con Carne','Bohnen\r\nHackfleisch\r\nTomaten\r\nZwiebeln\r\nKnoblauch\r\nChilli','Alles in einer Pfanne anbraten und köcheln lassen.','a67aedb55d6c42315e9610f3cb54f443','2025-06-03 13:56:55',1);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(5,'tom1','tom','b','tom@mail.de','$2b$10$sUbWwD38Zrcp03tEop2aHuuItMrRY0jQbICigIwTvFzK.sglwNrTe','2025-05-22 15:38:21'),
(16,'tom2','mot','d','tom2@mail.de','$2b$10$BiQeAYM.AVqBApv1In85pOOm6ouMp.XKhOYIwVO.leJhA6W5pKRvu','2025-06-02 10:15:07'),
(17,'tom3','tt','dd','tom3@mail.de','$2b$10$5FS1OKAJEJTSAfMNRz1GlOHVYm9SlS6i8C4cf06K/17Rg71iXtADy','2025-06-04 08:45:47'),
(18,'test','','','test@mail.de','$2b$10$y.T0eIBCBp5w6ovxgANbQuqm5u5CCHvzj/R8Fro39KuwgZOw2P9E.','2025-06-05 15:44:09');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 10:51:37
