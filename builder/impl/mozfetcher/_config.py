software = {
    "Linux_64bit": {
       "url": "ftp://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/6.0/runtimes/xulrunner-6.0.en-US.linux-x86_64.tar.bz2",
       "md5": "fb13a15ad4626192d7044fee2b3d9157",
       "bin": {
           "path": "xulrunner/xulrunner",
           "sig": "c39ea6817a6171197358e988cdc721f2cd0488fa"
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
        "url": "http://ftp.mozilla.org/pub/mozilla.org/xulrunner/releases/21.0/runtimes/xulrunner-21.0.en-US.linux-i686.tar.bz2",
        "md5": "7367e853dbc112d0e841d67b01a4b846",
        "bin": {
            "path": "xulrunner/xulrunner",
            "sig": "37f6b529d84aa1bc950bf22a7f400e1c61227500"
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
