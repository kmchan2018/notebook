<?php

declare(strict_types=1);

use \Sculpin\Bundle\SculpinBundle\HttpKernel\AbstractKernel;
use \ExecBundle\ExecBundle;

/**
 * Custom sculpin kernel for loading extra local bundles.
 */
class SculpinKernel extends AbstractKernel
{
	protected function getAdditionalSculpinBundles(): array
	{
		return [
			ExecBundle::class,
		];
	}
}
