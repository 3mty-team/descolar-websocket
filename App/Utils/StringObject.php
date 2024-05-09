<?php

namespace DescolarSocket\Utils;

readonly class StringObject
{

    public function __construct(
        private string $string
    )
    {

    }

    public function __toString(): string
    {
        return $this->string;
    }
}