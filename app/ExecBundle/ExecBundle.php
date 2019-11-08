<?php


declare(strict_types=1);


namespace ExecBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;


/**
 * Sculpin Bundle to implement a twig extension that executes a command,
 * send data to it via stdin and displays output from stdout.
 */
class ExecBundle extends Bundle
{
	// empty
}
