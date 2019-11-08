<?php


declare(strict_types=1);


namespace ExecBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;


/**
 * Symfony dependency injection extension to register our twig extension to
 * twig template engine.
 */
class ExecExtension extends Extension
{
	/**
	 * Load our services configuration file.
	 */
	public function load(array $config, ContainerBuilder $container): void
	{
		$loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
		$loader->load('services.yaml');
	}
}
