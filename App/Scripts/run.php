<?php
use DescolarSocket\Managers\MessageManager;

require_once __DIR__ . "/../../vendor/autoload.php";

error_reporting(E_ALL & ~E_DEPRECATED);
$manager = new MessageManager();

$manager->create();
$manager->add("/");
$manager->run();
