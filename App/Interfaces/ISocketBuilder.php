<?php

namespace DescolarSocket\Interfaces;

interface ISocketBuilder
{

    /**
     * Create the websocket server
     * @param string $address The address to create the server on
     * @param int $port The port to create the server on
     */
    function create(string $address = "localhost", int $port = 8080): void;

    /**
     * Run the websocket server
     */
    function run(): void;

    /**
     * Add a route to the websocket server
     * @param string $route The route to add
     * @param ?string $componentName The component to add to the route
     */
    function add(string $route, ?string $componentName): void;

}