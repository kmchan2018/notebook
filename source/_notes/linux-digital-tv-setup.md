---
title: Linux Digital TV Setup
category: Linux
tags: [ 'Linux' ]
---

Hong Kong uses the DTMB transmission system for broadcasting digital TV. The
same protocol is also used in Macau and Mainland China.

# Packages

To tune and test for digital TV, the DVBv5 tool is required. For Ubuntu 18.04,
the installation command is:

	sudo apt install dvb-tools

# Scanning

Before scanning for channels, a initial scan file is required in a specific
format. A sample initial scan file looks like this:

	[CHANNEL]
		DELIVERY_SYSTEM = DTMB
		FREQUENCY = 482000000
		BANDWIDTH_HZ = 8000000
		CODE_RATE_HP = AUTO
		CODE_RATE_LP = NONE
		MODULATION = QAM/64
		TRANSMISSION_MODE = 8K
		GUARD_INTERVAL = 1/32
		HIERARCHY = NONE
		INVERSION = AUTO

To actually scan for channels with the given initial scan file, the following
command can be used:

	dvbv5-scan <initial-scan-file>

# Playback

VLC can be used to actually watch television. It can be done by opening the DTV
capture device and use the following options:

1. Proper frequency should be used. Note that it uses KHz for unit.
2. Show more options and in the full option list add program=<program>.

# References

1. https://zh.wikipedia.org/wiki/DTMB
2. https://zh.wikipedia.org/wiki/香港數碼地面電視廣播

