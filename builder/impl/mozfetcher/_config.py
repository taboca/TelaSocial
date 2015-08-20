software = {
    "Linux_64bit": {
        "url": "https://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/33.1.1/runtimes/xulrunner-33.1.1.en-US.linux-x86_64.tar.bz2",
       "md5": "3d6c2af68e7cd381e6d20af4743bcce4",
       "bin": {
           "path": "xulrunner/xulrunner",
           "sig": "e5e0dca30274309cc9b9e5af4978e21f8b3c1ca9"
       }
    },
    # for both 32 and 64 bit darwin we'll use 32 bit binaries
    ( "Darwin_64bit", "Darwin_32bit" ): {
        "url": "ftp://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/2.0/sdk/xulrunner-2.0.en-US.mac-i386.sdk.tar.bz2",
        "md5": "cf56e216a05feed16cb290110fd89802",
        "bin": {
            "path": "xulrunner-sdk/bin/xulrunner-bin",
            "sig": "ec043427ca789950bf388db3cf88c7cf"
        }
    },
    ( "Windows_32bit", "Windows_64bit" ): {
        "url": "ftp://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/2.0/runtimes/xulrunner-2.0.en-US.win32.zip",
        "md5": "38e5c5ad08927278ed6c333aef836882",
        "bin": {
            "path": "xulrunner/xulrunner.exe",
            "sig": "0910106650f397e67aa52f4c4d924f8e"
        }
    },
    "Linux_32bit": {
        "url": "http://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/40.0.2/runtimes/xulrunner-40.0.2.en-US.linux-i686.tar.bz2",
        "md5": "ebe288e3dee24bd4b66d5f57871b573f",
        "bin": {
            "path": "xulrunner/xulrunner",
            "sig": "feaf4c43bc924b47d098626192ac34a756b897d9"
        }
    }
}

def getConfig(platform):
    for key in software:
        if type(key) is str:
            if platform == key:
                return software[key]
        elif platform in key:
            return software[key]
    raise RuntimeError("unsupported platform: " + platform)
