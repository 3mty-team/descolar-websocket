<?php

namespace DescolarSocket\Components;

use DescolarSocket\Managers\MessageManager;
use Override;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;
use Throwable;

abstract class AbstractComponent implements MessageComponentInterface
{

    protected SplObjectStorage $clients;

    public function __construct()
    {
    }


    #[Override] function onError(ConnectionInterface $conn, Throwable $e): void
    {
        echo MessageManager::getPrefix() . "Error...\n";
        echo "---------------------\n";
        echo $e->getMessage() . "\n";
        echo "---------------------\n";

        $conn->close();
    }
}