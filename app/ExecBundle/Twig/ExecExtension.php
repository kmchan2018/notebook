<?php


declare(strict_types=1);


namespace ExecBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;


/**
 * Twig extension that provides an extra twig function `exec` for executing
 * command and returning its result for embeddeding.
 */
class ExecExtension extends AbstractExtension
{
	public function getFilters(): array
	{
		return [
			new TwigFilter('exec', [ __CLASS__, 'execute' ]),
		];
	}

	/**
	 * Execute the command and send the input to it via stdin. Return any output
	 * from the stdout.
	 */
	public static function execute(string $input, string $command, string $fallback = ''): string
	{
		$descriptors = [];
		$pipes = [];

		$descriptors[0] = [ 'pipe', 'r' ];
		$descriptors[1] = [ 'pipe', 'w' ];
		$descriptors[2] = [ 'pipe', 'w' ];

		if (($process = @proc_open($command, $descriptors, $pipes)) === false) {
			return $fallback;
		}

		$stdin = $pipes[0];
		$stdout = $pipes[1];
		$stderr = $pipes[2];
		$output = '';
		$error = '';

		if (@fwrite($stdin, $input) === false) {
			@fclose($stdin);
			@fclose($stdout);
			@proc_close($process);
			return $fallback;
		}

		@fflush($stdin);
		@fclose($stdin);

		while (@feof($stdout) === false) {
			$output .= @fread($stdout, 16384);
		}

		while (@feof($stderr) === false) {
			$error .= @fread($stderr, 16384);
		}

		@fclose($stdout);
		@fclose($stderr);

		if (@proc_close($process) === 0) {
			return $output;
		} else {
			return $error;
		}
	}
} 
