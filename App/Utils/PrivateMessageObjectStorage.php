<?php

namespace DescolarSocket\Utils;

class PrivateMessageObjectStorage extends \SplObjectStorage
{

    #[\Override] public function getHash(object $object): string
    {
        return md5($object->__toString());
    }

}